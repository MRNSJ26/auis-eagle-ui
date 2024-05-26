import { StaticImageData } from "next/image";

interface ChatBoxProps{
    src: string | StaticImageData;
    message: string;
    role: string;
}

export default ChatBoxProps;