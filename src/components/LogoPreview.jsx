import { UpdateStorageContext } from "@/context/UpdateStorageContext";
import html2canvas from "html2canvas";
import { icons } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
const BASE_URL = "https://logoexpress.tubeguruji.com";

const LogoPreview = ({ downloadIcon }) => {
  const [storageValue, setStorageValue] = useState();
  const { updateStorage, setUpdateStorage } = useContext(UpdateStorageContext);

  useEffect(() => {
    const storageData = JSON.parse(localStorage.getItem("value"));
    setStorageValue(storageData);
  }, [updateStorage]);

  useEffect(() => {
    if (downloadIcon) {
      downloadPngLogo();
    }
  }, [downloadIcon]);

  const downloadPngLogo = () => {
    const downloadLogoDiv = document.getElementById("downloadLogoDiv");
    html2canvas(downloadLogoDiv, {
      backgroundColor: null,
    }).then((canvas) => {
      const pngImage = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.href = pngImage;
      downloadLink.download = "Logo_X_abhi.png";
      downloadLink.click();
    });
  };

  const Icon = ({ name, color, size, rotate }) => {
    if (!name) {
      return null; // or any fallback component/icon
    }
    const LucidIcon = icons[name];
    if (!LucidIcon) {
      return null; // or any fallback component/icon
    }
    return (
      <LucidIcon
        color={color}
        size={size}
        style={{
          transform: `rotate(${rotate}deg)`,
          transformOrigin: "center center",
        }}
      />
    );
  };

  return (
    <div className="flex items-center justify-center h-screen ">
      <div
        className="h-[550px] w-[550px] bg-neutral-900 rounded-lg outline-dotted outline-gray-300 "
        style={{ padding: storageValue?.bgPadding }}
      >
        <div
          id="downloadLogoDiv"
          className="h-full w-full flex items-center justify-center"
          style={{
            borderRadius: storageValue?.bgRounded,
            background: storageValue?.bgColor,
          }}
        >
          {storageValue?.icon?.includes(".png") ? (
            <img
              src={"/png/" + storageValue?.icon}
              style={{
                height: storageValue?.iconSize,
                width: storageValue?.iconSize,
                transform: `rotate(${storageValue?.iconRotate}deg)`,
              }}
            />
          ) : (
            <Icon
              name={storageValue?.icon}
              color={storageValue?.iconColor}
              size={storageValue?.iconSize}
              rotate={storageValue?.iconRotate}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default LogoPreview;
