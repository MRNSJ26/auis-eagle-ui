import React, { useState, useEffect, useRef, useMemo } from "react";
import ChatBox from "./ChatBox";
import { useChatMessages, useCreateChat, useSendChat } from "@/data/chat";
import ChatProps from "@/interface/ChatProps";
import Message from "@/interface/Message";
import convertToMessagesArray from "@/utils/getPrevMessages";
import questions from "../../public/Questions.json";
import Questions from "./Questions";
import { usePDF } from 'react-to-pdf';

const Chat: React.FC<ChatProps> = ({ message, user, handleSendMessage, firstRender, handleFirstRender, handleSendingMessage, pdfClicked, setPdfClick }) => {
  const session = useCreateChat(user?.email!);
  const [studentMessages, setStudentMessages] = useState<Message[]>([]);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const { toPDF, targetRef } = usePDF({filename: 'page.pdf'});
  // const [on, setOn] = useState(true);
  
  // useMemo(() => {
  //   // eslint-disable-next-line react-hooks/rules-of-hooks
  //   const prevChatMessages = useChatMessages().then(data => {
  //     setStudentMessages((prevMessages) => {
  //       const newMessages = convertToMessagesArray(data);
  //       const updatedMessages = [...prevMessages, ...newMessages];
  //       return updatedMessages;
  //     });
  //   });
  // }, [on])

  useEffect(() => {
    // setOn(false);
    if (message !== undefined && message !== null) {
      handleSendingMessage(true);
      setStudentMessages((prevMessages) => [
        ...prevMessages,
        { message: message, role: "student" },
      ]);
      setStudentMessages((prevMessages) => [
        ...prevMessages,
        { message: "loading", role: "system" },
      ]);
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const sendMessage = useSendChat(message).then((data) => {
        setStudentMessages((prevMessages) => {
          handleSendingMessage(false);
          const updatedMessages = prevMessages.slice(0, -1);
          return [...updatedMessages, { message: data, role: "system" }];
        });
      });
    }
  }, [message]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [studentMessages]);
  if(pdfClicked){
    toPDF();
    setPdfClick(false);
  }

  return (
    <div
      ref={chatContainerRef}
      className="flex flex-col mt-20 overflow-y-auto w-full px-4 md:px-32"
      style={{
        maxHeight: "calc(100vh - 205px)",
      }}
    >
      <div ref={targetRef} id="chat">
      {firstRender && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-center items-end mt-96">
          {questions.questions.map((question, index) => (
            <Questions key={index} quesiton={question} handleFirstRender={handleFirstRender} handleSendMessage={handleSendMessage}/>
          ))}
        </div>
      )}
      {studentMessages.map((message, index) => (
        <div key={index} className="flex flex-col items-end">
          <ChatBox
            message={message.message}
            src={
              message.role === "system" ? "/AUISEagleLogo.png" : user?.picture!
            }
            role={message.role}
          />
        </div>
      ))}
      </div>
    </div>
  );
};

export default Chat;
