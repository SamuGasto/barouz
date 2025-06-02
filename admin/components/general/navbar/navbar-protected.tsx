"use client"
import Image from 'next/image'
import React from 'react'
import { ThemeSwitcher } from '@/components/general/theme-switcher'
import Link from 'next/link'
import logo from '@/images/barouz-logo.png'
import logo_texto from '@/images/barouz-letras.png'
import { LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { signOutAction } from '@/app/actions'

const links = [
    { href: "/protected/pedidos", label: "Pedidos" },
    { href: "/protected/menu", label: "Menu" },
    { href: "/protected/promociones", label: "Promociones" },
    { href: "/protected/locales", label: "Locales" },
]

function NavbarProtected() {
    return (
        <nav className="flex w-full h-16 border flex-row items-center justify-between p-3 px-5">
            <div id="navigation" className='flex flex-row items-center gap-2'>
                <Link href="/protected/pedidos" className="flex flex-row items-center gap-2">
                    <Image className="rounded-full" src={logo} alt="Logo" />
                    <Image src={logo_texto} alt="Logo" />
                </Link>
                {links.map((link) => (
                    <Link key={link.href} href={link.href} className="hover:underline">
                        {link.label}
                    </Link>
                ))}
            </div>
            <div id="actions" className='flex flex-row items-center gap-2'>
                <Button variant="ghost" onClick={() => signOutAction()}>
                    <LogOut />
                    <p>Salir</p>
                </Button>
                <ThemeSwitcher />
            </div>
        </nav>
    )
}

export default NavbarProtected