import { useState } from "react";
import BackgroundController from "./components/BackgroundController";
import Header from "./components/Header";
import IconController from "./components/IconController";
import SideNav from "./components/SideNav";
import { Button } from "./components/ui/button";
import LogoPreview from "./components/LogoPreview";
import { UpdateStorageContext } from "./context/UpdateStorageContext";

function App() {
  const [selectedIndex, SetSelectedIndex] = useState(0);
  const [updateStorage, setUpdateStorage] = useState({});
  const [downloadIcon, setDownloadIcon] = useState();

  return (
    <UpdateStorageContext.Provider value={{ updateStorage, setUpdateStorage }}>
      <div>
        <Header DownloadIcon={setDownloadIcon} />
        <div className="flex">
          <div className="w-64 fixed">
            <SideNav selectedIndex={(val) => SetSelectedIndex(val)} />
          </div>
          <div className="ml-64 flex-1 grid grid-cols-1 md:grid-cols-6 overflow-hidden ">
            <div className="md:col-span-2 border shadow-sm p-5 h-screen overflow-auto">
              {selectedIndex === 0 ? (
                <IconController />
              ) : (
                <BackgroundController />
              )}
            </div>
            <div className="md:col-span-3 ">
              <LogoPreview downloadIcon={downloadIcon} />
            </div>
            <div className="md:col-span-1 bg-orange-300">Ads banner</div>
          </div>
        </div>
      </div>
    </UpdateStorageContext.Provider>
  );
}

export default App;
