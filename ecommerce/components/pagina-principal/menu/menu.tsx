import React from "react";
import menu from "@/data/examples/menu";
import TarjetaMenu from "./tarjeta-menu";

const Menu = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-8 p-8">
      <div className="flex flex-col items-center justify-center gap-2">
        <h2 className="text-5xl font-thin">Menú</h2>
      </div>
      <div className="grid w-full grid-cols-1 items-center justify-center gap-4 px-2 md:w-2/3 md:grid-cols-2 md:px-0">
        {menu.map((item, index) => (
          <TarjetaMenu
            key={item.nombre}
            nombre={item.nombre}
            imagen={item.imagen}
            color={index + 1}
          />
        ))}
      </div>
    </div>
  );
};

export default Menu;
