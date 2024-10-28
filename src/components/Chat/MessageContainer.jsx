// import { Avatar, AvatarBadge, Flex } from "@chakra-ui/react";
// import Messages from "./Messages";
// import MessageInput from "./MessageInput";
// import { useState } from "react";

// const MessageContainer = () => {
//   const [messages, setMessages] = useState([
//     {
//       id: 1,
//       position: "left",
//       title: "Burhan",
//       type: "text",
//       text: "Hi there !",
//       date: new Date(),
//       replyButton: true,
//       onReplyClick: {}
//     },
//     {
//       id: 2,
//       position: "right",
//       title: "Emre",
//       type: "meetingLink",
//       text: "Click to join the meeting",
//       date: new Date(),
//       avatar:
//         "https://firebasestorage.googleapis.com/v0/b/famto-aa73e.appspot.com/o/admin_panel_assets%2FGroup%20427320384.svg?alt=media&token=0be47a53-43f3-4887-9822-3baad0edd31e",
//     },
//     {
//       id: 3,
//       position: "left",
//       title: "Esra",
//       type: "text",
//       text: "Nice to meet you too !",
//       date: new Date(),
//       reply: {
//         title: "Emre",
//         titleColor: "#8717ae",
//         message: "Nice to meet you",
//       },
//     },
//     // Add more messages as needed
//   ]);

//   const handleSendMessage = (newMessage) => {
//     setMessages((prevMessages) => {
//       // Determine message type based on the presence of `message` and/or `image`
//       const messageType = newMessage.image ? "photo" : "text";

//       // Structure `data` based on whether an image and/or message is present
//       const messageData = newMessage.image
//         ? {
//             uri: URL.createObjectURL(newMessage.image), // Image URL or File reference
//             status: {
//               click: false,
//               loading: 0,
//             },
//             alt: newMessage.message,
//           }
//         : null;

//       // Prepare the message object
//       const messageObject = {
//         id: prevMessages.length + 1,
//         position: "right",
//         title: "You",
//         type: messageType,
//         text: newMessage.message || "", // If both image and message are present, this will contain the text message
//         date: new Date(),
//         replyButton: true,
//         ...(newMessage.image && { data: messageData }), // Add `data` only if image is present
//       };

//       // Add the new message object to the messages state
//       return [...prevMessages, messageObject];
//     });
//   };

//   return (
//     <>
//       <div className="h-[73px] bg-white rounded-lg pt-3 pl-4 flex">
//         <Avatar
//           src={
//             "https://firebasestorage.googleapis.com/v0/b/famto-aa73e.appspot.com/o/admin_panel_assets%2FGroup%20427320384.svg?alt=media&token=0be47a53-43f3-4887-9822-3baad0edd31e"
//           }
//           size={"md"}
//         >
//           {/* {isOnline ? */}
//           <AvatarBadge boxSize="1em" bg="green.500" />
//           {/* : ""} */}
//         </Avatar>
//         <div className="pl-4">
//           <h1 className="text-[18px] font-semibold">User Name</h1>
//           <p className="text-[14px] text-gray-500">Online</p>
//         </div>
//       </div>
//       <span className="block w-full h-[1px] bg-gray-200"></span>
//       <div className="h-[410px] bg-white overflow-y-auto pt-5 pb-5">
//         <Messages messages={messages} />
//       </div>
//       <div className="bg-white rounded-lg pt-2 pb-[10px]">
//         <MessageInput onSend={handleSendMessage} />
//       </div>
//       {/* <span className="block w-full h-[1px] bg-gray-200"></span> */}
//     </>
//   );
// };

// export default MessageContainer;

import { Avatar, AvatarBadge } from "@chakra-ui/react";
import Messages from "./Messages";
import MessageInput from "./MessageInput";
import { useState } from "react";

const MessageContainer = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      position: "left",
      title: "Burhan",
      type: "text",
      text: "Hi there!",
      date: new Date(),
      replyButton: true,
    },
    {
      id: 2,
      position: "right",
      title: "Emre",
      type: "text",
      text: "Click to join the meeting",
      date: new Date(),
    },
    {
      id: 3,
      position: "left",
      title: "Esra",
      type: "text",
      text: "Nice to meet you too!",
      date: new Date(),
      reply: {
        title: "Emre",
        titleColor: "#8717ae",
        message: "Nice to meet you",
      },
    },
  ]);

  // State to store the reply information
  const [replyInfo, setReplyInfo] = useState(null);

  // Function to handle reply button click
  const handleReplyClick = (message) => {
    console.log("replyMessage", message);
    setReplyInfo({
      title: message.title,
      text: message.text,
      type: message.type,
      date: message.date,
      data: message.data,
    });
  };

  // Function to send a new message
  const handleSendMessage = (newMessage) => {
    setMessages((prevMessages) => {
      const messageObject = {
        id: prevMessages.length + 1,
        position: "right",
        title: "You",
        type: newMessage.image ? "photo" : "text",
        text: newMessage.message || "",
        date: new Date(),
        replyButton: true,
        ...(newMessage.image && {
          data: {
            uri: URL.createObjectURL(newMessage.image),
            alt: newMessage.message,
            height: "150px",
            width: "300px",
          },
        }),
        ...(replyInfo && {
          reply: {
            title: replyInfo.title,
            titleColor: "#8717ae",
            message: replyInfo.text,
          },
        }),
      };

      // Reset reply information after sending the message
      setReplyInfo(null);

      return [...prevMessages, messageObject];
    });
  };

  const clearReplyInfo = () => setReplyInfo(null);

  return (
    <>
      <div className="h-[73px] bg-white rounded-lg pt-3 pl-4 flex">
        <Avatar
          src="https://firebasestorage.googleapis.com/v0/b/famto-aa73e.appspot.com/o/admin_panel_assets%2FGroup%20427320384.svg?alt=media&token=0be47a53-43f3-4887-9822-3baad0edd31e"
          size={"md"}
        >
          <AvatarBadge boxSize="1em" bg="green.500" />
        </Avatar>
        <div className="pl-4">
          <h1 className="text-[18px] font-semibold">User Name</h1>
          <p className="text-[14px] text-gray-500">Online</p>
        </div>
      </div>
      <span className="block w-full h-[1px] bg-gray-200"></span>
      <div
        className={`${
          replyInfo?.data ? "h-[180px]" : replyInfo ? "h-[310px]" : "h-[410px]"
        } bg-white overflow-y-auto pt-5 pb-5`}
      >
        <Messages messages={messages} onReplyClick={handleReplyClick} />
      </div>
      <div className="bg-white rounded-lg pt-[7px]">
        <MessageInput
          onSend={handleSendMessage}
          replyInfo={replyInfo}
          clearReplyInfo={clearReplyInfo}
        />
      </div>
    </>
  );
};

export default MessageContainer;
