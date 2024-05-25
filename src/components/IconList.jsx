import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Smile, icons } from "lucide-react";
import { iconList } from "@/constants/icons";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import axios from "axios";

const BASE_URL = "https://logoexpress.tubeguruji.com";

const IconList = ({ selectedIcon }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [pngIconList, setPngIconList] = useState([]);
  const storageValue = JSON.parse(localStorage.getItem("value"));
  const [icon, setIcon] = useState(storageValue ? storageValue?.icon : "Smile");

  useEffect(() => {
    getPngIcons();
  }, []);

  const Icon = ({ name, color, size }) => {
    if (!name) {
      return null; // or any fallback component/icon
    }
    const LucidIcon = icons[name];
    if (!LucidIcon) {
      return null; // or any fallback component/icon
    }
    return <LucidIcon color={color} size={size} />;
  };

  const getPngIcons = () => {
    axios.get(BASE_URL + "/getIcons.php").then((resp) => {
      // console.log(resp.data);
      setPngIconList(resp.data);
    });
  };

  return (
    <div>
      <div>
        <label>Icon</label>
        <div
          onClick={() => setOpenDialog(true)}
          className=" p-3 cursor-pointer bg-gray-200 rounded-md w-[50px] h-[50px] flex items-center justify-center my-2 "
        >
          {icon?.includes(".png") ? (
            <img src={BASE_URL + "/png/" + icon} />
          ) : (
            <Icon name={icon} color={"#000"} size={20} />
          )}
        </div>
      </div>
      <Dialog open={openDialog} onOpenChange={setOpenDialog} >
        <DialogContent className="bg-neutral-900 text-white" >
          <DialogHeader>
            <DialogTitle className=" font-bold ">
              Pick Your Faviorite Icon!!
            </DialogTitle>
            <DialogDescription>
              <Tabs defaultValue="color-icon" className="w-[400px]">
                <TabsList>
                  <TabsTrigger value="color-icon">Color Icons</TabsTrigger>
                  <TabsTrigger value="icon">Icons</TabsTrigger>
                </TabsList>
                <TabsContent value="color-icon">
                  <div className=" grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 overflow-auto h-[400px] p-6 ">
                    {pngIconList.map((icon, index) => {
                      return (
                        <div
                          key={index}
                          className=" border p-3 flex rounded-sm justify-center cursor-pointer items-center"
                          onClick={() => {
                            selectedIcon(icon);
                            setOpenDialog(false);
                            setIcon(icon);
                          }}
                        >
                          <img src={BASE_URL + "/png/" + icon} />
                        </div>
                      );
                    })}
                  </div>
                </TabsContent>
                <TabsContent value="icon">
                  <div className=" grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 overflow-auto h-[400px] p-6 ">
                    {iconList.map((icon, index) => {
                      return (
                        <div
                          key={index}
                          className=" border p-3 flex rounded-sm justify-center cursor-pointer bg-white items-center"
                          onClick={() => {
                            selectedIcon(icon);
                            setOpenDialog(false);
                            setIcon(icon);
                          }}
                        >
                          <Icon name={icon} color={"#000"} size={20} />
                        </div>
                      );
                    })}
                  </div>
                </TabsContent>
              </Tabs>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default IconList;
