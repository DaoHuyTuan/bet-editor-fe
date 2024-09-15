import { GetObjectCommand } from '@aws-sdk/client-s3'
import { NodeViewProps } from '@tiptap/core'
import { useState, ChangeEvent, useRef, useCallback, useEffect } from 'react'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { s3Client } from '../../../../utils/s3'
import { API_URL } from '../../../../utils/variable'
import Cookies from 'js-cookie'
import { AWS_S3_BUCKET } from '../../../../utils/constants'
interface Props {
  elProps: NodeViewProps
}

export const EditorImage = (props: Props) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const uploadImage = useCallback(
    async (file: File, preSignUrl: string) => {
      try {
        console.log('files', file)
        const response = await fetch(preSignUrl, {
          method: 'PUT',
          body: file,
          mode: 'cors'
        })
        if (response.ok) {
          console.log('File uploaded successfully')

          // Extract the bucket and key from the presigned PUT URL
          const url = new URL(preSignUrl)
          const bucket = url.hostname.split('.')[0]
          const key = decodeURIComponent(url.pathname.substr(1))

          // Generate a presigned GET URL
          const command = new GetObjectCommand({
            Bucket: bucket,
            Key: key
          })

          const signedUrl = await getSignedUrl(s3Client, command, {
            expiresIn: 3600 // URL expires in 1 hour
          })
          console.log('Signed URL:', signedUrl)
          setSelectedImage(signedUrl)
          props.elProps.updateAttributes({
            url: key
          })
        }
      } catch (error) {
        console.error('Error uploading image', error)
      }
    },
    [props.elProps]
  )

  const getImageUrl = useCallback(async (file: File) => {
    try {
      const token = Cookies.get('token')
      const res = await fetch(`${API_URL}/media/upload`, {
        method: 'POST',
        body: JSON.stringify({
          name: file.name
        }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      })
      if (res.ok) {
        const data = await res.json()
        await uploadImage(file, data.url)
      }
    } catch (error) {
      console.error('Error getting signed URL', error)
    }
  }, [])

  const loadFile = async (event: ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation()
    const files = event.target.files
    if (files && files[0] && files[0].type.substr(0, 5) === 'image') {
      await getImageUrl(files[0])
    } else {
      setSelectedImage(null)
      alert('Please select an image file')
    }
  }

  const getImageFromKey = useCallback(
    async (key: string) => {
      if (key) {
        const command = new GetObjectCommand({
          Bucket: AWS_S3_BUCKET,
          Key: key
        })
        console.log('AWS_S3_BUCKET', AWS_S3_BUCKET)
        const url = await getSignedUrl(s3Client, command, {
          expiresIn: 3600
        })
        setSelectedImage(url)
      }
    },
    [props.elProps.node.attrs.url]
  )

  useEffect(() => {
    if (props.elProps.node.attrs.url) {
      getImageFromKey(props.elProps.node.attrs.url)
    } else {
      return
    }
  }, [props.elProps.node.attrs.url])

  const onFocus = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      console.log('event', event)
      // event.preventDefault()
      event.stopPropagation()
      fileInputRef.current?.click()
    },
    [fileInputRef]
  )
  console.log('props', props)
  return (
    <div className="flex w-full flex-col items-center space-y-4 p-4 rounded-lg">
      <div
        className="flex w-full h-full border-2 border-dashed min-h-[300px] justify-center items-center cursor-pointer"
        onClick={onFocus}>
        <>
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            onChange={loadFile}
            className="w-[0] h-[0]"
          />
        </>
        {selectedImage ? (
          <img
            src={selectedImage}
            alt="Uploaded preview"
            onClick={onFocus}
            className="max-w-full max-h-full object-contain"
          />
        ) : (
          <p className="text-gray-400">No image uploaded</p>
        )}
      </div>
    </div>
  )
}
