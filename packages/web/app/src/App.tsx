import "./App.css";

import { Button } from "@project/components";
import { httpClient, VersionInfoModel } from "@project/http-client";
import { useEffect, useState } from "react";

import logo from "./logo.svg";

function useVersion() {
  const [versionInfo, setVersionInfo] = useState<VersionInfoModel>({} as any);

  useEffect(() => {
    httpClient.version.get().then((versionInfo: VersionInfoModel) => {
      setVersionInfo(versionInfo);
    });
  }, [setVersionInfo]);

  return { versionInfo };
}

function App() {
  const [count, setCount] = useState(0);
  const { versionInfo } = useVersion();

  return (
    <div className="text-center">
      <header className="bg-gray-800 min-h-screen flex items-center justify-center app-header text-white flex-col">
        <img src={logo} className="app-logo" alt="logo" />
        <p>Hello Ts.ED + Vite + React!</p>

        <p>Version: {versionInfo.version}</p>

        <p>
          <Button onClick={() => setCount((count) => count + 1)}>count is: {count}</Button>
        </p>
        <p>
          Edit <code>App.tsx</code> and save to test HMR updates.
        </p>
        <p>
          <a className="app-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
            Learn React
          </a>
          {" | "}
          <a className="app-link" href="https://vitejs.dev/guide/features.html" target="_blank" rel="noopener noreferrer">
            Vite Docs
          </a>
        </p>
      </header>
    </div>
  );
}

export default App;
