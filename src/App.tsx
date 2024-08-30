import { useAccount, useConnect, useDisconnect } from "wagmi";
import { Header } from "./containers/Header";
import { Editor } from "./components/Editor";

function App() {
  const account = useAccount();

  const { disconnect } = useDisconnect();

  return (
    <>
      <div className="flex w-full justify-center">
        <div className="flex w-[1200px]">
          <Header />
          <Editor />
        </div>
      </div>
    </>
  );
}

export default App;
