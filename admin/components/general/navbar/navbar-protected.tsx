"use client"
import Image from 'next/image'
import React from 'react'
import { ThemeSwitcher } from '@/components/general/theme-switcher'
import Link from 'next/link'
import logo from '@/images/barouz-logo.png'
import logo_texto from '@/images/barouz-letras.png'
import { LogOut, Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { signOutAction } from '@/app/actions'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'

const links = [
    { href: "/protected/pedidos", label: "Pedidos" },
    { href: "/protected/menu", label: "Menu" },
    { href: "/protected/extras", label: "Extras" },
    { href: "/protected/promociones", label: "Promociones" },
    { href: "/protected/locales", label: "Locales" },
]

function NavbarProtected() {
    const [open, setOpen] = React.useState(false)

    const SideMenu = ({ open, onOpenChange }: { open: boolean, onOpenChange: (open: boolean) => void }) => {
        return (<div id="side-menu" className='flex md:hidden flex-col items-center gap-2'>
            <Sheet open={open} onOpenChange={onOpenChange}>
                <SheetTrigger asChild>
                    <Menu className='cursor-pointer' />
                </SheetTrigger>
                <SheetContent side='left' className='transition-all'>
                    <SheetHeader>
                        <SheetTitle className='hidden'>Menu</SheetTitle>
                        <Link href="/protected/pedidos" className="flex flex-row items-center gap-2" onClick={() => onOpenChange(false)}>
                            <Image className="rounded-full" src={logo} alt="Logo" />
                            <Image src={logo_texto} alt="Logo" />
                        </Link>
                    </SheetHeader>
                    <div className="flex flex-col pl-5 gap-2">
                        {links.map((link) => (
                            <Link key={link.href} href={link.href} className="hover:underline cursor-pointer" onClick={() => onOpenChange(false)}>
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </SheetContent>
            </Sheet>
        </div>)
    }
    const NormalMenu = () => {
        return (<div id="navigation" className='hidden md:flex flex-row items-center gap-2'>
            <Link href="/protected/pedidos" className="flex flex-row items-center gap-2">
                <Image className="rounded-full" src={logo} alt="Logo" />
                <Image src={logo_texto} alt="Logo" />
            </Link>
            {links.map((link) => (
                <Link key={link.href} href={link.href} className="hover:underline cursor-pointer">
                    {link.label}
                </Link>
            ))}
        </div>)
    }

    return (
        <nav className="flex w-full h-16 border flex-row items-center justify-between p-3 px-5">
            <SideMenu open={open} onOpenChange={setOpen} />
            <NormalMenu />
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