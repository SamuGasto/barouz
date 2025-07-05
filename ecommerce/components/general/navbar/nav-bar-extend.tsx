"use client"
import React from 'react'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useState } from "react";

import Link from 'next/link';
import Image from 'next/image';
import logo from "@/images/barouz-logo.png";
import logo_texto from "@/images/barouz-letras.png";

const links = [
    { href: "/", label: "Inicio" },
    { href: "/menu", label: "Menu" },
    { href: "/promociones", label: "Promociones" },
    { href: "/mis-pedidos", label: "Mis Pedidos" },
    { href: "/locales", label: "Locales" },
];

const SideMenu = () => {
    const [open, setOpen] = useState(false);

    return (<div id="side-menu" className='flex md:hidden flex-col items-center gap-2'>
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Menu className='cursor-pointer' />
            </SheetTrigger>
            <SheetContent side='left' className='transition-all'>
                <SheetHeader>
                    <SheetTitle className='hidden'>Menu</SheetTitle>
                    <Link href="/" className="flex flex-row items-center gap-2" onClick={() => setOpen(false)}>
                        <Image className="rounded-full" src={logo} alt="Logo" />
                        <Image src={logo_texto} alt="Logo" />
                    </Link>
                </SheetHeader>
                <div className="flex flex-col pl-5 gap-2">
                    {links.map((link) => (
                        <Link key={link.href} href={link.href} className="hover:underline cursor-pointer" onClick={() => setOpen(false)}>
                            {link.label}
                        </Link>
                    ))}
                </div>
            </SheetContent>
        </Sheet>
    </div>)
}

export default SideMenu