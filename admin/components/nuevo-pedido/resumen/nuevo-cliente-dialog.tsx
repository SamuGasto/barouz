"use client";
import React, { useState } from "react";
import { Button } from "../../ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "../../ui/dialog";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";

interface NuevoClienteDialogProps { }

const NuevoClienteDialog: React.FC<NuevoClienteDialogProps> = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");
  const [mostrarResumen, setMostrarResumen] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errores, setErrores] = useState<{ [k: string]: string }>({});

  // Validaciones individuales
  function validarCampos() {
    const errs: { [k: string]: string } = {};
    if (!nombre || nombre.trim().length < 3) {
      errs.nombre = 'El nombre debe tener al menos 3 caracteres';
    }
    if (!correo || !/^\S+@\S+\.\S+$/.test(correo)) {
      errs.correo = 'Ingresa un correo válido';
    }
    if (!contraseña || contraseña.length < 6) {
      errs.contraseña = 'La contraseña debe tener al menos 6 caracteres';
    }
    if (!telefono || !/^([+]?\d{2,3})?\s?\d{8,12}$/.test(telefono.replace(/\s/g, ''))) {
      errs.telefono = 'Ingresa un teléfono válido';
    }
    if (!direccion || direccion.trim().length < 5) {
      errs.direccion = 'La dirección debe tener al menos 5 caracteres';
    }
    setErrores(errs);
    return Object.keys(errs).length === 0;
  }

  // Función para preparar el objeto del nuevo cliente
  function prepararNuevoCliente() {
    // Aquí puedes adaptar los nombres según tu modelo de Supabase
    return {
      nombre: nombre.trim(),
      correo: correo.trim(),
      contraseña,
      telefono: telefono.trim(),
      direccion: direccion.trim(),
    };
  }

  const handleConfirmar = () => {
    if (!validarCampos()) {
      setError(true);
      setMostrarResumen(false);
      return;
    }
    setError(false);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setMostrarResumen(true);
      // Aquí podrías llamar a tu función de Supabase
      const cliente = prepararNuevoCliente();
      console.log('Cliente preparado para Supabase:', cliente);
    }, 1200);
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      setMostrarResumen(false);
      setNombre("");
      setCorreo("");
      setContraseña("");
      setTelefono("");
      setDireccion("");
      setError(false);
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" className="text-brand-primary">
          Nuevo Cliente
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nuevo Cliente</DialogTitle>
          <DialogDescription>
            Llena los campos para crear un nuevo cliente
          </DialogDescription>
        </DialogHeader>
        <form className="grid gap-3 mt-2">
          <div className="flex flex-col gap-1">
            <Label htmlFor="nombre">Nombre completo</Label>
            <div className="relative">
              <span className="absolute left-2 top-2.5 text-muted-foreground">
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M15.232 17.232A3.001 3.001 0 0 0 12 16c-.943 0-1.823.411-2.432 1.232M15.232 17.232A5 5 0 1 0 6 17.5M15.232 17.232A5 5 0 0 1 18 17.5M6 17.5C6 19.985 9.134 22 12 22s6-2.015 6-4.5m-6-8A3 3 0 1 1 12 7a3 3 0 0 1 0 6Z"></path></svg>
              </span>
              <Input
                id="nombre"
                placeholder="Ej: Juan Pérez"
                className={`pl-8 ${errores.nombre ? 'border-destructive' : ''}`}
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                autoFocus
              />
              {errores.nombre && <span className="text-xs text-destructive mt-0.5">{errores.nombre}</span>}
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="correo">Correo electrónico</Label>
            <div className="relative">
              <span className="absolute left-2 top-2.5 text-muted-foreground">
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M3 8l7.89 5.26a3 3 0 0 0 3.22 0L22 8m-19 8V8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"></path></svg>
              </span>
              <Input
                id="correo"
                type="email"
                placeholder="correo@ejemplo.com"
                className={`pl-8 ${errores.correo ? 'border-destructive' : ''}`}
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
              />
              {errores.correo && <span className="text-xs text-destructive mt-0.5">{errores.correo}</span>}
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="contraseña">Contraseña</Label>
            <div className="relative">
              <span className="absolute left-2 top-2.5 text-muted-foreground">
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M17 11V7a5 5 0 0 0-10 0v4m12 0v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7m12 0H5"></path></svg>
              </span>
              <Input
                id="contraseña"
                type="password"
                placeholder="Mínimo 6 caracteres"
                className={`pl-8 ${errores.contraseña ? 'border-destructive' : ''}`}
                value={contraseña}
                onChange={(e) => setContraseña(e.target.value)}
              />
              {errores.contraseña && <span className="text-xs text-destructive mt-0.5">{errores.contraseña}</span>}
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="telefono">Teléfono</Label>
            <div className="relative">
              <span className="absolute left-2 top-2.5 text-muted-foreground">
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M2 2l20 20M22 16.92V19a2 2 0 0 1-2.18 2A19.72 19.72 0 0 1 3 5.18 2 2 0 0 1 5 3h2.09a2 2 0 0 1 2 1.72c.13.81.36 1.6.68 2.34a2 2 0 0 1-.45 2.11L8.09 10.91a16 16 0 0 0 6 6l1.74-1.74a2 2 0 0 1 2.11-.45c.74.32 1.53.55 2.34.68A2 2 0 0 1 21 16.91V19Z"></path></svg>
              </span>
              <Input
                id="telefono"
                type="tel"
                placeholder="Ej: +56912345678"
                className={`pl-8 ${errores.telefono ? 'border-destructive' : ''}`}
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
              />
              {errores.telefono && <span className="text-xs text-destructive mt-0.5">{errores.telefono}</span>}
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="direccion">Dirección</Label>
            <div className="relative">
              <span className="absolute left-2 top-2.5 text-muted-foreground">
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5Z"></path></svg>
              </span>
              <Input
                id="direccion"
                placeholder="Calle, número, ciudad"
                className={`pl-8 ${errores.direccion ? 'border-destructive' : ''}`}
                value={direccion}
                onChange={(e) => setDireccion(e.target.value)}
              />
              {errores.direccion && <span className="text-xs text-destructive mt-0.5">{errores.direccion}</span>}
            </div>
          </div>
        </form>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)} disabled={loading}>Cancelar</Button>
          <Button onClick={handleConfirmar} disabled={loading}>
            {loading ? (
              <span className="flex items-center gap-2"><svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>Guardando...</span>
            ) : (
              "Confirmar"
            )}
          </Button>
        </DialogFooter>
        {mostrarResumen && (
          <div className="mt-4 border-t pt-4 bg-muted/50 rounded-lg px-4 py-3 animate-in fade-in space-y-2 border">
            <h4 className="font-semibold flex items-center gap-2 text-brand-primary">
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"></path></svg>
              Cliente listo para guardar
            </h4>
            <div><span className="font-medium">Nombre:</span> {nombre}</div>
            <div><span className="font-medium">Correo:</span> {correo}</div>
            <div><span className="font-medium">Contraseña:</span> {contraseña ? '••••••••' : ''}</div>
            <div><span className="font-medium">Teléfono:</span> {telefono}</div>
            <div><span className="font-medium">Dirección:</span> {direccion}</div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default NuevoClienteDialog;
