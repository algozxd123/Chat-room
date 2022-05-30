import { MessageType } from "../types/chat";

const ChatMessage = ({username, text, date}: MessageType) => {
  return (
    <div>
      <p className="text-primary text-lg">{username}</p>
      <p>{text}</p>
      <div className="flex justify-end"><p className="text-sm mt-2 text-gray-700">{date}</p></div>
      <hr className="my-2"/>
    </div>
  );
}

export default ChatMessage;