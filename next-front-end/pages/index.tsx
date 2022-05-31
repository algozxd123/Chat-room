import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Alert from "../components/Alert";
import ChatMessage from "../components/ChatMessage";
import { getMessages, sendMessage } from "../lib/api";
import { isArrayMessage, isData, isMessage, MessageType } from "../types/api";

const Home: NextPage = (props: any) => {
  
  const [user, setUser] = useState({
    username: '',
    email: '',
    token: '',
    expiration: ''
  });
  const [messages, setMessages] = useState([{
    User: {
      name: ''
    },
    createdAt: '',
    text: ''
  }]);
  const [newMessage, setNewMessage] = useState('');
  const [alert, setAlert] = useState({
    type: 'danger',
    message: 'Please try again later.',
    display: false
  });
  
  useEffect(() => {
    getMessages(props.user.token).then(res => {
      if(isData(res) && isArrayMessage(res)){
        setMessages(res);
        return;
      }
      setAlert({
        type: 'danger',
        message: res.error,
        display: true
      });
    }).catch(err => {
      setAlert({
        type: 'danger',
        message: err,
        display: true
      });
    });
  }, [props]);

  const router = useRouter();

  const logout = () => {
    localStorage.removeItem("user");
    router.push("/login");
  };

  const send = () => {
    if(newMessage === '') return;
    sendMessage(props.user.token, newMessage).then(res => {
      if(isData(res) && isMessage(res)){
        setMessages([...messages, res]);
        return;
      }
      setAlert({
        type: 'danger',
        message: res.error,
        display: true
      });
    }).catch(err => {
      setAlert({
        type: 'danger',
        message: err,
        display: true
      });
    });
    setNewMessage('');
  };

  return (
    <>
    <div className="flex justify-end">
      <button onClick={logout} className="text-primary text-xl py-2 px-2 absolute hover:text-primary-light mt-2 mr-2">Logout</button>
    </div>
    <div className="h-screen flex flex-col justify-center items-center">
      <Alert type={alert.type} message={alert.message} display={alert.display}/>
      <div className="px-4 py-2 w-11/12 lg:w-1/2 h-96 max-h-96 border-solid border-4 rounded-xl border-primary bg-white">
        <div className="border border-primary border-t-0 border-x-0">
          <p className="text-primary text-2xl text-center">Chat-room</p>
        </div>
        <div className="px-3 flex flex-col overflow-y-scroll max-h-[17rem] h-[17rem] my-2 scroll-smooth scrollbar-thin scrollbar-thumb-primary scrollbar-track-slate-300 hover:scrollbar-thumb-primary-light">
        {messages.map((message: MessageType) => {
          return <ChatMessage key={message.createdAt} User={message.User} text={message.text} createdAt={message.createdAt} />;
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
