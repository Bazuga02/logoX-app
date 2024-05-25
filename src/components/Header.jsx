import React from "react";
import logo1 from "../logos/logo1.png";
import { Button } from "./ui/button";
import { Download } from "lucide-react";

function Header({ DownloadIcon }) {
  return (
    <div className="p-2 shadow-sm border flex justify-between items-center   bg-neutral-900  ">
      <div className=" flex items-center     ">
        <img src={logo1} className=" h-20 " alt="" />
        <h1 className=" text-2xl  font-extrabold  text-white   ">L0G0-X</h1>
      </div>
      <Button
        className=" flex gap-2 items-center bg-white text-black hover:bg-slate-400 "
        onClick={() => DownloadIcon(Date.now())}
      >
        {" "}
        <Download className=" h-4 w-4 text-black " /> DOWNLOAD
      </Button>
    </div>
  );
}

export default Header;
