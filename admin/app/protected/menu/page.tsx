"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { IceCream, Search, CakeSlice, Cookie, Candy, Coffee, Snowflake, PackagePlus } from "lucide-react"
import { MenuCategorySection } from "@/components/menu/menu-category-section"
import { ProductFormDialog } from "@/components/menu/product-form-dialog"
import { toast } from "sonner";
import obtenerMenu from "@/utils/querys/menu/obtener-menu"
import crearProducto from "@/utils/querys/menu/crear-producto"
import editarProducto from "@/utils/querys/menu/editar-producto"
import eliminarProducto from "@/utils/querys/menu/eliminar-producto"
import { Database } from "@/types/supabase"

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
  const [editingProduct, setEditingProduct] = useState<Database["public"]["Tables"]["producto"]["Row"] | null>(null)
  const [isNewProduct, setIsNewProduct] = useState(false)
  const [showDialog, setShowDialog] = useState(false)
  const [products, setProducts] = useState<Database["public"]["Tables"]["producto"]["Row"][] | null>(null)

  useEffect(() => {
    const getData = async () => {
      const menu = await obtenerMenu()
      setProducts(menu)
      console.log(menu);

    }
    getData()
  }, [])

  // Función para abrir el diálogo de edición
  const openEditDialog = (product: Database["public"]["Tables"]["producto"]["Row"]) => {
    setEditingProduct(product)
    setIsNewProduct(false)
    setShowDialog(true)
  }

  // Función para abrir el diálogo de nuevo producto
  const openNewProductDialog = () => {
    setEditingProduct(null)
    setIsNewProduct(true)
    setShowDialog(true)
  }

  // Función para cerrar el diálogo
  const closeDialog = () => {
    setShowDialog(false)
    setEditingProduct(null)
    setIsNewProduct(false)
  }

  // Función para guardar cambios
  const handleSaveProduct = async (productData: Database["public"]["Tables"]["producto"]["Update"]) => {
    let result: Database["public"]["Tables"]["producto"]["Row"][] = [];
    // La categoría SIEMPRE viene del formulario
    const categoriaSeleccionada = productData.categoria;
    if (isNewProduct) {
      // Crear producto con la categoría elegida por el usuario
      toast.loading("Guardando producto...");
      result = await crearProducto({
        nombre: productData.nombre || "",
        precio: productData.precio || 0,
        categoria: categoriaSeleccionada ? categoriaSeleccionada : "Waffles",
        imagen: productData.imagen || "",
        descripcion: productData.descripcion || "",
        disponible: productData.disponible ?? true,
      }) || [];
      toast.dismiss();
      if (result && Array.isArray(result) && result[0]) {
        setProducts((prev) => {
          const updated = prev ? [...prev, result[0]] : [result[0]];
          return updated;
        });
        toast.success("Producto creado", {
          description: `${productData.nombre} ha sido añadido exitosamente`,
          duration: 3000,
        });
      } else {
        toast.error("Error al crear producto", { duration: 3000 });
      }
    } else if (editingProduct && editingProduct.id) {
      toast.loading("Guardando cambios...");
      result = await editarProducto(editingProduct.id, {
        ...productData,
        categoria: categoriaSeleccionada
      }) || [];
      toast.dismiss();
      if (result && Array.isArray(result) && result[0]) {
        setProducts((prev) => {
          const updated = prev ? prev.map((p) => p.id === editingProduct.id ? { ...p, ...productData, categoria: categoriaSeleccionada || editingProduct.categoria } : p) : prev;
          return updated;
        });
        toast.success("Producto actualizado", {
          description: `${productData.nombre} ha sido actualizado exitosamente`,
          duration: 3000,
        });
      } else {
        toast.error("Error al actualizar producto", { duration: 3000 });
      }
    }
    closeDialog();
  }

  // Función para eliminar producto
  const deleteProduct = async (productId: string) => {
    const result: Database["public"]["Tables"]["producto"]["Row"][] | null = await eliminarProducto(productId);
    if (result) {
      setProducts((prev) => {
        const updated = prev ? prev.filter((p) => p.id !== productId) : prev;
        console.log("Productos tras eliminar:", updated);
        return updated;
      });
      toast("Producto eliminado", {
        description: "El producto ha sido eliminado del menú",
        duration: 3000,
      });
    }
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
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <h2 className="text-3xl font-bold tracking-tight">Gestión de Menú</h2>
        <Button
          onClick={openNewProductDialog}

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

      <Tabs value={activeCategoryId} onValueChange={setActiveCategoryId} className="space-y-4 w-full">
        <TabsList className="flex flex-nowrap overflow-x-auto scrollbar-thin scrollbar-thumb-muted rounded-md">

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
              onEdit={openEditDialog}
              onDelete={deleteProduct}
            />
          </TabsContent>
        ))}
      </Tabs>

      {/* Diálogo para editar o crear producto */}
      <ProductFormDialog
        open={showDialog}
        product={editingProduct}
        isNew={isNewProduct}
        onClose={closeDialog}
        onSave={handleSaveProduct}
      />
    </div>
  )
}
