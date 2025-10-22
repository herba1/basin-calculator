'use client'

import { useNav } from "@/context/NavContext"
import Image from "next/image";
import Link from "next/link";
import cn from "../utils/cn";

const navLeftLinks = [
    {name:'problem',url:'#problem',subLinks:[]},
    {name:'solution',url:'/', subLinks:[]},
    {name:'extra',url:'/', subLinks:[]},

]

export default function NavigationMenu({className=""}){
    const nav = useNav();
    console.log(nav)

    return (<nav className={`${className} nav__container py-3 px-3`}>
        <ul className="nav__list nav__left">
            <Image src="/cwi_logo.svg" width={100} height={100} alt="none" className="w-19"></Image>
        </ul>
        <ul className="nav__list nav__right">
        </ul>
    </nav>)

}

function NavLink({url="/",name="name", className=""}:{url:string, name:string, className?:string}){

    return <Link className={cn('',className)} href={url}>{name}</Link>

}