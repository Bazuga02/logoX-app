import { Image, PencilRuler, Shield } from "lucide-react";
import React, { useState } from "react";

const SideNav = ({ selectedIndex }) => {
  const menuList = [
    {
      id: 1,
      name: "Icon",
      icon: PencilRuler,
    },
    {
      id: 2,
      name: "Background",
      icon: Image,
    },
    {
      id: 3,
      name: "Upgrade",
      icon: Shield,
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className=" border shadow-sm h-screen  ">
      <div>
        {menuList.map((menu, index) => {
          return (
            <h2
              onClick={() => {
                setActiveIndex(index);
                selectedIndex(index);
              }}
              className={` p-3 flex items-center gap-2 text-lg px-7 text-gray-500 my-2 cursor-pointer hover:bg-slate-200 hover:text-black  transition-all duration-300 ${
                activeIndex == index &&
                " bg-neutral-900 text-white hover:bg-neutral-800 hover:text-white"
              } `}
              key={index}
            >
              <menu.icon />
              {menu.name}
            </h2>
          );
        })}
      </div>
    </div>
  );
};

export default SideNav;
