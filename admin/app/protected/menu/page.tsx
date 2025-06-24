"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { IceCream, Search, CakeSlice, Cookie, Candy, Coffee, Snowflake, PackagePlus } from "lucide-react"
import { MenuCategorySection } from "@/components/menu/menu-category-section"
import { Database } from "@/types/supabase"
import CrearProductoDialog from "@/components/menu/dialog-producto"
import { useDeleteProduct, useProducts } from "@/hooks/useMenuManagement"

const CATEGORY_ID_TO_LITERAL: Record<string, Database["public"]["Tables"]["producto"]["Row"]["categoria"]> = {
  waffles: "Waffles",
  helados: "Helados",
  churros: "Churros",
  cookies: "Waffle Cookies",
  postres: "Postres",
  bebestibles: "Bebidas",
  otros: "Otros"
};

export default function MenuPage() {
  const [activeCategoryId, setActiveCategoryId] = useState("waffles");
  const [searchTerm, setSearchTerm] = useState("")
  const [actualProduct, setActualProduct] = useState<Database["public"]["Tables"]["producto"]["Row"] | undefined>(undefined)
  const [showDialog, setShowDialog] = useState(false)
  const { data: products, isLoading: productsLoading } = useProducts();
  const { mutateAsync: deleteProduct, isPending: isDeletingProduct } = useDeleteProduct()

  // Función para cerrar el diálogo
  const closeDialog = () => {
    setShowDialog(false)
    setActualProduct(undefined)
  }

  // Categorías de productos
  const categories = [
    { id: "waffles", name: "Waffles", icon: <CakeSlice className="h-4 w-4" /> },
    { id: "helados", name: "Helados Artesanales", icon: <IceCream className="h-4 w-4" /> },
    { id: "churros", name: "Churros", icon: <Candy className="h-4 w-4" /> },
    { id: "bebestibles", name: "Bebestibles", icon: <Coffee className="h-4 w-4" /> },
    { id: "cookies", name: "Waffle Cookies", icon: <Cookie className="h-4 w-4" /> },
    { id: "postres", name: "Postres", icon: <Snowflake className="h-4 w-4" /> },
  ]

  return (
    <div className="flex min-h-screen flex-col gap-3 px-2 sm:px-4 lg:px-8">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
        <h2 className="text-3xl font-bold tracking-tight">Gestión de Menú</h2>
        <Button
          onClick={() => { setActualProduct(undefined); setShowDialog(true) }}

        >
          <PackagePlus className="mr-2 h-4 w-4" />
          Nuevo Producto
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4" />
          <Input
            type="search"
            placeholder="Buscar productos..."
            className="pl-8 w-full sm:w-[300px]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <Tabs value={activeCategoryId} onValueChange={setActiveCategoryId} className="flex flex-col gap-4 w-full">
        <TabsList className="flex h-fit flex-wrap gap-2 scrollbar-thin scrollbar-thumb-muted rounded-md">

          {categories.map((category) => (
            <TabsTrigger
              key={category.id}
              value={category.id}
              className="flex items-center gap-1.5"
            >
              {category.icon}
              {category.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map((category) => (
          <TabsContent key={category.id} value={category.id} className="space-y-4">
            <MenuCategorySection
              category={category}
              items={products ? products.filter((product) => product.categoria === CATEGORY_ID_TO_LITERAL[category.id]) : []}
              searchTerm={searchTerm}
              onEdit={(product) => {
                setActualProduct(product)
                setShowDialog(true)
              }}
              onDelete={deleteProduct}
            />
          </TabsContent>
        ))}
      </Tabs>

      {/* Diálogo para editar o crear producto */}
      <CrearProductoDialog
        open={showDialog}
        producto={actualProduct}
        onClose={closeDialog}
      />

    </div>
  )
}
