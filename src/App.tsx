import { Editor } from './components/Editor'
import { Header } from './containers/Header'

function App() {
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
