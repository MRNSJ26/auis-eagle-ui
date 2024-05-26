import ChatBoxProps from "@/interface/ChatBoxProps";
import formatTextToHTML from "@/utils/format";
import Image from "next/image";
import { useEffect, useState } from "react";
import copy from "copy-text-to-clipboard";
import { FaRegClipboard } from "react-icons/fa";
import { MdOutlineRecordVoiceOver } from "react-icons/md";

const ChatBox: React.FC<ChatBoxProps> = ({ message, src, role }) => {
  const [color, setColor] = useState<string>("rgb(254 242 242)");
  const [isSpeechClicked, setIsSpeechClicked] = useState(true);
  useEffect(() => {
    if (role === "system") {
      setColor("rgb(207 250 254)");
    }
  }, [role, isSpeechClicked]);

  const formattedMessage = formatTextToHTML(message);

  const handleSpeech = () => {
    let msg = new SpeechSynthesisUtterance();
    msg.text = formattedMessage;
    if (isSpeechClicked) {
      window.speechSynthesis.speak(msg);
    } else {
      window.speechSynthesis.cancel();
    }
  };

  return (
    <div className="flex w-full">
      {role === "system" ? (
        <div
          className="border px-4 py-4 rounded-xl flex gap-2 items-start mt-6 w-fit"
          style={{ backgroundColor: color }}
        >
          <Image
            src={src}
            alt={""}
            width={30}
            height={30}
            className="rounded-2xl"
          />
          {formattedMessage === "loading" ? (
            <div className="dot-elastic mx-4 mt-2"></div>
          ) : (
            <div className="flex gap-3 justify-center items-start">
              <p dangerouslySetInnerHTML={{ __html: formattedMessage }} />{" "}
              <button
                onClick={() => {
                  copy(formattedMessage);
                }}
              >
                <FaRegClipboard />
              </button>{" "}
              <button onClick={() => {
                setIsSpeechClicked(prev => !prev);
                handleSpeech();
              }}>
                <MdOutlineRecordVoiceOver />
              </button>
            </div>
          )}
        </div>
      ) : (
        <div
          className="border px-4 py-4 rounded-xl flex gap-2 items-start mt-6 w-fit ml-auto"
          style={{ backgroundColor: color }}
        >
          <p dangerouslySetInnerHTML={{ __html: formattedMessage }} />
          <Image
            src={src}
            alt={""}
            width={30}
            height={30}
            className="rounded-2xl"
          />
        </div>
      )}
    </div>
  );
};

export default ChatBox;
