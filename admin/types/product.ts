import { Database } from "@/types/supabase";

// Tipo producto alineado a la tabla 'producto' de Supabase
export type Product = Database["public"]["Tables"]["producto"]["Row"];

// Enum de categorías según Supabase
export type CategoriaProducto = Database["public"]["Enums"]["CategoriaProducto"];
