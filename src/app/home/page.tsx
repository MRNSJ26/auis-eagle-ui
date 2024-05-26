"use client";

import Chat from "@/components/Chat";
import ChatInput from "@/components/ChatInput";
import NavBar from "@/components/NavBar";
import User from "@/interface/UserProps";
import { getCurrentUser } from "aws-amplify/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Amplify } from "aws-amplify";
import AWSExports from "../../aws-exports";

export default function HomePage() {
  Amplify.configure(AWSExports);

  const router = useRouter();

  const currentAuthenticatedUser = async () => {
    try {
      const { userId } = await getCurrentUser();
      console.log("user id", userId);
      if (!userId) {
        router.push("/");
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    currentAuthenticatedUser();
  });
  const [isSending, setIsSending] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>();
  const [pdfClicked, setPdfClicked] = useState(false);
  const handleSendMessage = (message: string) => {
    setMessage(message);
  };
  const [user, setUser] = useState<User>();
  const [firstRender, setFirstRender] = useState(true);
  const handleFirstRender = (value: boolean) => {
    setFirstRender(value);
  }
  const handleSendingMessage = (value: boolean) => {
    setIsSending(value);
  }
  return (
    <div className="flex flex-col items-center min-h-screen">
      <NavBar user={user} setUser={setUser} setPdfClickL={setPdfClicked}/>
      <Chat message={message!} user={user} handleSendMessage={handleSendMessage} handleFirstRender={handleFirstRender} firstRender={firstRender} handleSendingMessage={handleSendingMessage} pdfClicked={pdfClicked} setPdfClick={setPdfClicked}/>
      <ChatInput handleSendMessage={handleSendMessage} handleFirstRender={handleFirstRender} isSending={isSending}/>
    </div>
  );
}
