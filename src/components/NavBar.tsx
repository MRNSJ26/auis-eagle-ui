'use client'

import NavBarProps from "@/interface/NavBarProps";
import { fetchUserAttributes, signOut } from "aws-amplify/auth";
import { useState, useEffect } from "react";
import { Amplify } from "aws-amplify";
import awsExports from '../aws-exports';
import Image, { StaticImageData } from 'next/image';
import { IoPersonSharp } from "react-icons/io5";
import { MdOutlinePictureAsPdf } from "react-icons/md";
import { IoMdLogOut } from "react-icons/io";

Amplify.configure(awsExports);

const NavBar: React.FC<NavBarProps> = ({ user, setUser, setPdfClickL}) => {
    const [img, setImg] = useState<string | undefined | StaticImageData>("");
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const user = fetchUserAttributes().then(data => {
                setUser({email: data.email, name: data.name, picture: data.picture});
            })
        }
        setImg(user?.picture);
    }, []);

    const handleLogoutClick = () => {
        // signOut();
        // window.location.href = "/";
    }

    return (
        <div className="flex items-center justify-between text-xl px-5 py-3 w-full rounded-lg fixed top-0 z-1 bg-white z-10">
            <div className="flex items-center justify-start gap-3 w-1/2">
                <div className="rounded-full transition ease-in duration-200 hover:bg-black hover:text-white">
                    {user ? (<Image src={user?.picture!} alt={""} width={50} height={50} className="rounded-full"/>) : (<IoPersonSharp width={50} height={50}/>)}
                </div>
                <h1>Hello, {user !== null ? user?.name!.split(" ")[0] : "Guest"}</h1>
            </div>
            <div className="flex items-center justify-end w-1/2">
                <div className="flex gap-4">
                    <button onClick={handleLogoutClick} className="border border-gray-200 rounded-lg p-2 transition ease-in duration-200 hidden hover:bg-black hover:text-white">
                        <IoMdLogOut className="size-8"/>
                    </button>
                    <button onClick={() => { setPdfClickL (prev => !prev); }} className="border border-gray-200 rounded-lg p-2 transition ease-in duration-200 hover:bg-black hover:text-white">
                        <MdOutlinePictureAsPdf className="size-8"/>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default NavBar;
