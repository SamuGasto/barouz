import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import logo from '@/images/barouz-logo.png'
import logo_texto from '@/images/barouz-letras.png'
import { ThemeSwitcher } from '@/components/general/theme-switcher'


function NavbarPublic() {
    return (
        <nav className="flex w-full h-16 border flex-row items-center justify-between p-3 px-5">
            <div id="navigation" className='flex flex-row items-center gap-2'>
            <Link href="/" className="flex flex-row items-center gap-2">
                        <Image className="rounded-full" src={logo} alt="Logo"/>
                        <Image src={logo_texto} alt="Logo"/>
                    </Link>
            </div>
            <div id="actions" className='flex flex-row items-center gap-2'>
                <Link href="/sign-in">Sign In</Link>
                <Link href="/sign-up">Sign Up</Link>
                <ThemeSwitcher />
            </div>
        </nav>
    )
}

export default NavbarPublic