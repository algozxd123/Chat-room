import { useEffect, useRef } from "react";
import { MessageType } from "../types/api";

type Message = {
  text: string,
  createdAt: string,
  name: string
}

const ChatMessage = ({ text, createdAt, name,}: Message) => {
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    if(messagesEndRef.current !== null){
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  });

  return (
    <div ref={messagesEndRef}>
      <p className="text-primary text-lg">{name}</p>
      <p>{text}</p>
      <div className="flex justify-end"><p className="text-sm mt-2 text-gray-700">{new Date(createdAt).toDateString()}</p></div>
      <hr className="my-2"/>
    </div>
  );
}

export default ChatMessage;