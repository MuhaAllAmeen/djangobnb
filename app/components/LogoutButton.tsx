'use client';

import { useRouter } from "next/navigation";
import MenuLink from "./navbar/MenuLink";
import { resetAuthCookies } from "../lib/actions";

const LogoutButton: React.FC = ()=>{
    const router = useRouter()
    const submitLogout = async()=>{
        await resetAuthCookies()
        router.push('/')
    }
    return (
        <MenuLink label="Log Out" onClick={submitLogout} />
    )
}

export default LogoutButton