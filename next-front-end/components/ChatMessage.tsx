import { MessageType } from "../types/chat";

const ChatMessage = ({username, message, date}: MessageType) => {
  return (
    <div>
      <p className="text-primary text-lg">{username}</p>
      <p>{message}</p>
      <div className="flex justify-end"><p className="text-sm mt-2 text-gray-700">{date}</p></div>
      <hr className="my-2"/>
    </div>
  );
}

export default ChatMessage;