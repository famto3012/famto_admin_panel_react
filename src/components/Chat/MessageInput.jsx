// import React, { useState } from "react";
// import AttachFileIcon from "@mui/icons-material/AttachFile";
// import SendIcon from "@mui/icons-material/Send";

// const MessageInput = ({ onSend, replyInfo}) => {
//   const [message, setMessage] = useState("");
//   const [image, setImage] = useState(null);

//   const handleMessageInput = (e) => {
//     setMessage(e.target.value);
//   };

//   const onSelectFile = (e) => {
//     if (e.target.files && e.target.files.length > 0) {
//       setImage(e.target.files[0]);
//     }
//   };

//   const sendMessage = () => {
//     // Determine the message type based on presence of `message` and `image`
//     if (message.trim() || image) {
//       let messageType = "";

//       // Set type based on the presence of message and/or image
//       if (message.trim() && image) {
//         messageType = "photo";
//       } else if (image) {
//         messageType = "photo";
//       } else {
//         messageType = "text";
//       }

//       // Pass the data to the parent component
//       onSend({ type: messageType, message: message.trim(), image });

//       // Reset input fields after sending
//       setMessage("");
//       setImage(null);
//     }
//   };

//   return (
//     <>
//       <div className="relative pl-5">
//         <input
//           type="text"
//           name="text"
//           placeholder="Type Something"
//           className="bg-blue-50 h-[45px] w-[82%] px-5 pr-10 rounded-full text-md focus:outline-none"
//           value={message.message}
//           onChange={handleMessageInput}
//         />
//         <input
//           type="file"
//           name="sendImage"
//           id="sendImage"
//           className="hidden"
//           accept="image/*"
//           onChange={onSelectFile}
//         />
//         <label
//           htmlFor="sendImage"
//           className="cursor-pointer absolute right-[95px] top-0 mt-2 mr-2 ml-2 text-black"
//         >
//           <AttachFileIcon />
//         </label>
//         <button
//           className="absolute right-[10px] top-0 mr-2 rounded-full w-[75px] h-[45px] text-white bg-teal-600"
//           onClick={sendMessage}
//         >
//           <SendIcon />
//         </button>
//       </div>
//     </>
//   );
// };

// export default MessageInput;

import React, { useState } from "react";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SendIcon from "@mui/icons-material/Send";
import { MessageBox } from "react-chat-elements";
import "react-chat-elements/dist/main.css";

const MessageInput = ({ onSend, replyInfo, clearReplyInfo }) => {
  const [message, setMessage] = useState("");
  const [image, setImage] = useState(null);

  const handleMessageInput = (e) => {
    setMessage(e.target.value);
  };

  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  const sendMessage = () => {
    if (message.trim() || image) {
      const messageType = image ? "photo" : "text";

      onSend({ type: messageType, message: message.trim(), image });

      setMessage("");
      setImage(null);
    }
  };

  return (
    <>
      <div className="relative pl-5 pb-3">
        {replyInfo && (
          <div className="w-full max-w-[90%] bg-transparent p-2 rounded-lg">
            <div className="relative">
              <MessageBox
                position={replyInfo.position}
                title={replyInfo.title}
                type={replyInfo.type}
                text={replyInfo.text}
                date={replyInfo.date}
                data={replyInfo.data}
              />
              <button
                onClick={clearReplyInfo} // Clear reply info when closed
                className="absolute top-2 right-2 text-white px-2 py-1 font-bold rounded-full bg-teal-500"
              >
                &#10005;
              </button>
            </div>
          </div>
        )}

        <input
          type="text"
          name="text"
          placeholder="Type Something"
          className="bg-blue-50 h-[45px] w-[82%] px-5 pr-10 rounded-full text-md focus:outline-none"
          value={message}
          onChange={handleMessageInput}
        />

        <input
          type="file"
          name="sendImage"
          id="sendImage"
          className="hidden"
          accept="image/*"
          onChange={onSelectFile}
        />

        <label
          htmlFor="sendImage"
          className="cursor-pointer absolute right-[95px] bottom-[22px] mt-2 mr-2 ml-2 text-black"
        >
          <AttachFileIcon />
        </label>

        <button
          className="absolute right-[10px] bottom-[10px] mr-2 rounded-full w-[75px] h-[45px] text-white bg-teal-600"
          onClick={sendMessage}
        >
          <SendIcon />
        </button>
      </div>
    </>
  );
};

export default MessageInput;
