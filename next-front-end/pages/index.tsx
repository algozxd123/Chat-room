import type { NextPage } from "next";
import { useRouter } from "next/router";
import ChatMessage from "../components/ChatMessage";

const Home: NextPage = () => {
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem("user");
    router.push("/login");
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
        <ChatMessage username={"glubdub"} date={"21-09-2001 11:89"} message={"Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus consequuntur dolorum nam, deleniti cumque et aut sit architecto voluptates libero officiis natus, earum iure quam est nulla, similique nostrum ad!"} />
        <ChatMessage username={"glubdub"} date={"21-09-2001 11:89"} message={"Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus consequuntur dolorum nam, deleniti cumque et aut sit architecto voluptates libero officiis natus, earum iure quam est nulla, similique nostrum ad!"} />
        <ChatMessage username={"glubdub"} date={"21-09-2001 11:89"} message={"Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus consequuntur dolorum nam, deleniti cumque et aut sit architecto voluptates libero officiis natus, earum iure quam est nulla, similique nostrum ad!"} />
        <ChatMessage username={"glubdub"} date={"21-09-2001 11:89"} message={"Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus consequuntur dolorum nam, deleniti cumque et aut sit architecto voluptates libero officiis natus, earum iure quam est nulla, similique nostrum ad!"} />
        <ChatMessage username={"glubdub"} date={"21-09-2001 11:89"} message={"Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus consequuntur dolorum nam, deleniti cumque et aut sit architecto voluptates libero officiis natus, earum iure quam est nulla, similique nostrum ad!"} />
        </div>
        <div className="border border-primary border-b-0 border-x-0 pt-2 flex h-auto">
          <input type="text" placeholder="Type your message..." className=" border-2 border-solid rounded-xl border-primary w-full px-4"/>
          <button className="bg-primary hover:bg-[#8a6de8] text-white px-4 py-1 ml-2">Send</button>
        </div>
      </div>
    </div>
    </>
  );
};

export default Home;
