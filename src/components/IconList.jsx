import React, { useState } from "react";
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

const IconList = ({ selectedIcon }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const storageValue = JSON.parse(localStorage.getItem("value"));
  const [icon, setIcon] = useState(storageValue ? storageValue?.icon : "Smile");

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

  return (
    <div>
      <div>
        <label>Icon</label>
        <div
          onClick={() => setOpenDialog(true)}
          className=" p-3 cursor-pointer bg-gray-200 rounded-md w-[50px] h-[50px] flex items-center justify-center my-2 "
        >
          <Icon name={icon} color={"#000"} size={20} />
        </div>
      </div>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className=" font-bold ">
              Pick Your Faviorite Icon!!
            </DialogTitle>
            <DialogDescription>
              <Tabs defaultValue="icon" className="w-[400px]">
                <TabsList>
                  <TabsTrigger value="icon">Icons</TabsTrigger>
                  <TabsTrigger value="color-icon">Color Icons</TabsTrigger>
                </TabsList>
                <TabsContent value="icon">
                  Make changes to your account here.
                </TabsContent>
                <TabsContent value="color-icon">
                  Change your password here.
                </TabsContent>
              </Tabs>

              <div className=" grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 overflow-auto h-[400px] p-6 ">
                {iconList.map((icon, index) => {
                  return (
                    <div
                      className=" border p-3 flex rounded-sm justify-center cursor-pointer items-center"
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
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default IconList;
