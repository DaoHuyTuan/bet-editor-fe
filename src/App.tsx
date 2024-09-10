import { useEffect } from 'react'
import { Editor } from './components/Editor'
import { Header } from './containers/Header'

function App() {
  useEffect(() => {
    const handleMessage = event => {
      if (event.data === 'uploadsComplete') {
        setUploadStatus('All images uploaded to S3')
      }
    }

    navigator.serviceWorker.addEventListener('message', handleMessage)

    return () => {
      navigator.serviceWorker.removeEventListener('message', handleMessage)
    }
  }, [])
  return (
    <>
      <div className="w-full h-[100vh] flex flex-col">
        <Header />
        <div className="flex flex-col flex-1 p-[20px]">
          <Editor />
        </div>
      </div>
    </>
  )
}

export default App
