'use client'

import ChatInputProps from '@/interface/ChatInputProps';
import { SetStateAction, useEffect, useState } from 'react';
import { isElement } from 'react-dom/test-utils';
import { LuSendHorizonal } from 'react-icons/lu';

const ChatInput: React.FC<ChatInputProps> = ({handleSendMessage, handleFirstRender, isSending}) =>{
  const [inputValue, setInputValue] = useState<string>('');

  const handleChange = (event: { target: { value: SetStateAction<string>; }; }) => {
    setInputValue(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      // If Enter is pressed without Shift, send the message
      sendMessage();
    } else if (event.key === 'Enter' && event.shiftKey) {
      // If Shift + Enter is pressed, insert a newline
      event.preventDefault(); // Prevent default behavior (submitting the form)
      setInputValue(prevValue => prevValue + '\n'); // Insert newline character
    }
  };  

  const handleClick = () => {
    sendMessage();
  };

  const sendMessage = () => {
    handleSendMessage(inputValue);
    setInputValue("");
    handleFirstRender(false);
  };

  return (
    <div className="flex border border-gray-300 rounded-xl w-11/12 my-5 fixed bottom-0 bg-white">
      <textarea
        className={`w-full h-24 p-4 resize-none rounded-xl ${isSending ? 'bg-white' : 'bg-white'}`}
        placeholder="Ask The Eagle . . ."
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        disabled={isSending}
      ></textarea>
      <button
        onClick={handleClick}
        className="bg-white m-4 border rounded-xl p-2 flex justify-center items-center transition ease-in duration-200 hover:text-white hover:bg-black"
        disabled={isSending}
      >
        <LuSendHorizonal className="w-9 h-8" />
      </button>
    </div>
  );
}

export default ChatInput;
