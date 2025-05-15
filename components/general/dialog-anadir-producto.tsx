import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Producto } from "@/data/tipos";
import { CirclePlus } from "lucide-react";

interface PropType {
  producto: Producto;
}

function DialogAnadirProducto(props: PropType) {
  const { producto } = props;
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-brand-primary text-brand-primary-foreground hover:bg-brand-primary/90 flex w-full items-center justify-center gap-2">
          <CirclePlus />
          Agregar al carrito
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <p>tomate</p>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default DialogAnadirProducto;
