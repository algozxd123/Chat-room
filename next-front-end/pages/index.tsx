import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import ChatMessage from "../components/ChatMessage";
import { getMessages } from "../lib/api";
import { isArrayMessage, isData, isMessage, MessageType } from "../types/api";
import { io, Socket } from 'socket.io-client';

let socket: Socket;

const Home: NextPage = (props: any) => {
  
  const router = useRouter();

  const [messages, setMessages] = useState([{
    id: '',
    User: {
      name: ''
    },
    createdAt: '',
    text: ''
  }]);
  
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem('user') || '').token;

    getMessages(userId).then(res => {
      if(isData(res) && isArrayMessage(res)){
        setMessages(res);
        return;
      }
      console.error(res.error);
    }).catch(err => {
      console.error(err);
    });

    socket = io('ws://localhost:3001', {
      query: {
        token: `Bearer ${userId}`
      }
    });

    socket.on('message_sent', data => {
      if(isMessage(data)){
        setMessages(messages => [...messages, data]);
        return;
      }
      console.error(data.err);
    });
  }, []);
  
  const logout = () => {
    localStorage.removeItem("user");
    router.push("/login");
  };

  const send = () => {
    if(newMessage === '') return;
    socket.emit('send_message',{ text: newMessage });
    setNewMessage('');
  };

  return (
    <>
    <div className="flex justify-end">
      <button onClick={logout} className="text-primary text-xl py-2 px-2 absolute hover:text-primary-light mt-2 mr-2">Logout</button>
    </div>
    <div className="h-screen flex flex-col justify-center items-center">
      <div className="px-4 py-2 w-11/12 lg:w-1/2 h-96 max-h-96 border-solid border-4 rounded-xl border-primary bg-white">
        <div className="border border-primary border-t-0 border-x-0">
          <p className="text-primary text-2xl text-center">Chat-room</p>
        </div>
        <div className="px-3 flex flex-col overflow-y-scroll max-h-[17rem] h-[17rem] my-2 scroll-smooth scrollbar-thin scrollbar-thumb-primary scrollbar-track-slate-300 hover:scrollbar-thumb-primary-light">
          {messages.map((message: MessageType) => {
            return <ChatMessage key={message.id} name={message.User.name} text={message.text} createdAt={message.createdAt} />;
          })}
          </div>
        <div className="border border-primary border-b-0 border-x-0 pt-2 flex h-auto">
          <input value={newMessage} onChange={e => {setNewMessage(e.currentTarget.value)}} type="text" placeholder="Type your message..." className=" border-2 border-solid rounded-xl border-primary w-full px-4"/>
          <button onClick={send} className="bg-primary hover:bg-[#8a6de8] text-white px-4 py-1 ml-2">Send</button>
        </div>
      </div>
    </div>
    </>
  );
};

export default Home;
