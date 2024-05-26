import { StaticImageData } from "next/image";

interface User{
    email: string | undefined;
    name: string | undefined;
    picture: string | undefined | StaticImageData;
}

export default User;