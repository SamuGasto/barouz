export const categoriasMenu = [
  { id: "waffles", name: "Waffles" },
  { id: "helados", name: "Helados" },
  { id: "churros", name: "Churros" },
  { id: "bebestibles", name: "Bebestibles" },
  { id: "cookies", name: "Cookies" },
  { id: "postres", name: "Postres" },
];

export type MenuItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  description?: string;
  available?: boolean;
};

export type MenuCategory = {
  id: string;
  name: string;
  items: MenuItem[];
};
