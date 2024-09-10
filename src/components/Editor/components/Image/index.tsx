import { NodeViewProps } from '@tiptap/core'
import { useState, ChangeEvent, useRef } from 'react'

interface Props {
  elProps: NodeViewProps
}

export const EditorImage = (props: Props) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation()
    const files = event.target.files
    if (files && files[0] && files[0].type.substr(0, 5) === 'image') {
      const fileReader = new FileReader()
      fileReader.onload = e => {
        const imageDataUrl = e.target?.result as string
        setSelectedImage(imageDataUrl)
        props.elProps.updateAttributes({
          count: props.elProps.node.attrs.count + 1
        })
        // Assuming there's a function to send the image data to a web worker for storage
        storeImageInWebWorker(imageDataUrl)
      }
      fileReader.readAsDataURL(files[0])
    } else {
      setSelectedImage(null)
      alert('Please select an image file')
    }
  }

  const onFocus = (event: React.MouseEvent<HTMLDivElement>) => {
    console.log('event', event)
    // event.preventDefault()
    event.stopPropagation()
    fileInputRef.current?.click()
  }

  return (
    <div className="flex w-full flex-col items-center space-y-4 p-4 rounded-lg">
      <div
        className="flex w-full h-full border-2 border-dashed min-h-[300px] justify-center items-center cursor-pointer"
        onClick={onFocus}>
        {!selectedImage ? (
          <>
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleImageUpload}
              className="w-[0] h-[0]"
            />
            <p className="text-gray-400">No image uploaded</p>
          </>
        ) : (
          <img
            src={selectedImage}
            alt="Uploaded preview"
            onClick={onFocus}
            className="max-w-full max-h-full object-contain"
          />
        )}
      </div>
    </div>
  )
}
