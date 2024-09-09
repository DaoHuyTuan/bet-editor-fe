// upload-worker.js
const CACHE_NAME = 'media-upload-cache'

self.addEventListener('message', async event => {
  const { type, payload } = event.data

  switch (type) {
    case 'UPLOAD':
      await handleUpload(payload)
      break
    case 'LOAD':
      await handleLoad()
      break
    case 'REMOVE':
      await handleRemove(payload)
      break
    default:
      console.error('Unknown message type:', type)
  }
})

async function handleUpload(file) {
  try {
    const cache = await caches.open(CACHE_NAME)
    const blob = await file.arrayBuffer()
    const response = new Response(blob)
    const uniqueUrl = `/${Date.now()}-${file.name}`
    await cache.put(uniqueUrl, response)

    self.postMessage({
      type: 'UPLOAD_SUCCESS',
      payload: {
        uid: uniqueUrl,
        name: file.name,
        size: file.size,
        type: file.type,
        status: 'cached',
        progress: 100
      }
    })
  } catch (error) {
    self.postMessage({ type: 'UPLOAD_ERROR', payload: error.message })
  }
}

async function handleLoad() {
  try {
    const cache = await caches.open(CACHE_NAME)
    const keys = await cache.keys()
    const mediaList = await Promise.all(
      keys.map(async key => {
        const response = await cache.match(key)
        const blob = await response.blob()
        return {
          uid: key.url,
          name: key.url.split('/').pop(),
          size: blob.size,
          type: blob.type,
          status: 'cached',
          progress: 100
        }
      })
    )
    self.postMessage({ type: 'LOAD_SUCCESS', payload: mediaList })
  } catch (error) {
    self.postMessage({ type: 'LOAD_ERROR', payload: error.message })
  }
}

async function handleRemove(uid) {
  try {
    const cache = await caches.open(CACHE_NAME)
    await cache.delete(uid)
    self.postMessage({ type: 'REMOVE_SUCCESS', payload: uid })
  } catch (error) {
    self.postMessage({ type: 'REMOVE_ERROR', payload: error.message })
  }
}
