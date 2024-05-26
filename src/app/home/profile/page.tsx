'use client'

import Profile from "@/components/Profile";
import { useRouter } from "next/router";

export default function ProfilePage(){
    // const router = useRouter();
    // const handleExitClick = () => {
    //     router.push('/home');
    // }
    return(
        <>
            <Profile/>
        </>
    )
}