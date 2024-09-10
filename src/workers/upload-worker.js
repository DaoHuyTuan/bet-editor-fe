// service-worker.js

const CACHE_NAME = 'image-upload-cache-v1'
const UPLOAD_QUEUE_NAME = 'image-upload-queue'

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME))
})

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(name => {
          if (name !== CACHE_NAME) {
            return caches.delete(name)
          }
        })
      )
    })
  )
})

self.addEventListener('fetch', event => {
  if (event.request.url.includes('/upload-image')) {
    event.respondWith(handleImageUpload(event.request))
  }
})

async function handleImageUpload(request) {
  const formData = await request.formData()
  const image = formData.get('image')

  if (image) {
    const cache = await caches.open(CACHE_NAME)
    const response = new Response(image, {
      headers: { 'Content-Type': image.type }
    })

    const imageName = `image_${Date.now()}.${image.type.split('/')[1]}`
    await cache.put(`/pending-uploads/${imageName}`, response)

    // Add to upload queue
    const queue = await getUploadQueue()
    queue.push(imageName)
    await saveUploadQueue(queue)

    return new Response(JSON.stringify({ status: 'cached', imageName }), {
      headers: { 'Content-Type': 'application/json' }
    })
  }

  return new Response(JSON.stringify({ error: 'No image provided' }), {
    status: 400,
    headers: { 'Content-Type': 'application/json' }
  })
}

async function getUploadQueue() {
  const cache = await caches.open(CACHE_NAME)
  const queueResponse = await cache.match(UPLOAD_QUEUE_NAME)
  return queueResponse ? await queueResponse.json() : []
}

async function saveUploadQueue(queue) {
  const cache = await caches.open(CACHE_NAME)
  await cache.put(UPLOAD_QUEUE_NAME, new Response(JSON.stringify(queue)))
}

self.addEventListener('message', event => {
  if (event.data === 'uploadToS3') {
    event.waitUntil(uploadPendingImagesToS3())
  }
})

async function uploadPendingImagesToS3() {
  const queue = await getUploadQueue()
  const cache = await caches.open(CACHE_NAME)

  for (const imageName of queue) {
    const imageResponse = await cache.match(`/pending-uploads/${imageName}`)
    if (imageResponse) {
      const imageBlob = await imageResponse.blob()

      // Here you would implement the actual S3 upload
      // This is a placeholder for demonstration purposes
      console.log(`Uploading ${imageName} to S3...`)

      // After successful upload, remove from cache and queue
      await cache.delete(`/pending-uploads/${imageName}`)
    }
  }

  // Clear the queue after processing all images
  await saveUploadQueue([])

  // Notify the main thread that uploads are complete
  self.clients.matchAll().then(clients => {
    clients.forEach(client => client.postMessage('uploadsComplete'))
  })
}
