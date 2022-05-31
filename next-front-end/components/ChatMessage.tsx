import { useEffect, useRef } from "react";
import { MessageType } from "../types/api";

const ChatMessage = (message: MessageType) => {
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    if(messagesEndRef.current !== null){
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  });

  return (
    <div ref={messagesEndRef}>
      <p className="text-primary text-lg">{message.User.name}</p>
      <p>{message.text}</p>
      <div className="flex justify-end"><p className="text-sm mt-2 text-gray-700">{message.createdAt}</p></div>
      <hr className="my-2"/>
    </div>
  );
}

export default ChatMessage;