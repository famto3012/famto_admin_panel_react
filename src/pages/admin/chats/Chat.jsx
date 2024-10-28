import Conversation from "../../../components/Chat/Conversation";
import MessageContainer from "../../../components/Chat/MessageContainer";
import GlobalSearch from "../../../components/GlobalSearch";
import Sidebar from "../../../components/Sidebar";

const Chat = () => {
  return (
    <>
      <Sidebar />
      <div className="w-full min-h-screen pl-[300px] bg-gray-100 flex flex-col">
        <nav className="p-5">
          <GlobalSearch />
        </nav>
        <h1 className="font-bold text-[20px] pl-[15px] pb-3">Chats</h1>
        <div className="flex">
        <div className="w-1/3 h-[550px] ml-[15px] rounded-lg ">
          <Conversation />
        </div>
        <div className="w-2/3 h-[550px] ml-4 me-5 rounded-lg border-[1px] border-gray-300">
          <MessageContainer />
        </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
