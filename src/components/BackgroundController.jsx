import React, { useContext, useEffect, useState } from "react";
import { Slider } from "./ui/slider";
import ColorPickerController from "./ColorPickerController";
import { UpdateStorageContext } from "@/context/UpdateStorageContext";

const BackgroundController = () => {
  const storageValue = JSON.parse(localStorage.getItem("value") || "{}");

  const [rounded, setRounded] = useState(
    storageValue ? storageValue?.bgRounded : 0
  );
  const [padding, setPadding] = useState(
    storageValue ? storageValue?.bgPadding : 40
  );
  const [color, setColor] = useState(
    storageValue ? storageValue?.bgColor : "#000"
  );

  const { updateStorage, setUpdateStorage } = useContext(UpdateStorageContext);

  useEffect(() => {
    const updatedValue = {
      ...storageValue,
      bgRounded: rounded,
      bgPadding: padding,
      bgColor: color,
    };

    setUpdateStorage(updatedValue);
    localStorage.setItem("value", JSON.stringify(updatedValue));
  });

  return (
    <div className=" bg-neutral-900 text-white p-8 rounded-lg y">
      <div className="py-2 ">
        <label className="p-2 flex justify-between items-center ">
          Rounded <span>{rounded} °</span>
        </label>
        <Slider
          defaultValue={[0]}
          max={250}
          step={1}
          onValueChange={(e) => setRounded(e[0])}
        />
      </div>

      <div className="py-2">
        <label className="p-2 flex justify-between items-center ">
          Padding <span>{padding} px</span>
        </label>
        <Slider
          defaultValue={[40]}
          max={100}
          step={1}
          onValueChange={(e) => setPadding(e[0])}
        />
      </div>

      <div className="py-2">
        <label className="p-2 flex justify-between items-center">
          Icon Color
        </label>
        <ColorPickerController
          hideController={false}
          selectedColor={(color) => setColor(color)}
        />
      </div>
    </div>
  );
};

export default BackgroundController;
