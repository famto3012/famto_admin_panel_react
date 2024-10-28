// import React from "react";
// import { MessageBox, MessageList } from "react-chat-elements";
// import "react-chat-elements/dist/main.css";

// const Messages = () => {
//   return (
//     <>
//       <MessageBox
//         position="left"
//         title="Burhan"
//         type="text"
//         text="Hi there !"
//         date={new Date()}
//         replyButton={true}
//       />

//       <MessageBox
//         position="right"
//         title="Emre"
//         type="meetingLink"
//         text="Click to join the meeting"
//         date={new Date()}
//       />
//       <MessageBox
//         reply={{
//           title: "Emre",
//           titleColor: "#8717ae",
//           message: "Nice to meet you",
//         }}
//         position={"left"}
//         type={"text"}
//         title="Esra"
//         text={"Nice to meet you too !"}
//         date={new Date()}
//       />
//       <MessageBox
//         reply={{
//           photoURL: "https://facebook.github.io/react/img/logo.svg",
//           title: "elit magna",
//           titleColor: "#8717ae",
//           message: "Aliqua amet incididunt id nostrud",
//         }}
//         onReplyMessageClick={() => console.log("reply clicked!")}
//         position={"left"}
//         type={"text"}
//         text={
//           "Tempor duis do voluptate enim duis velit veniam aute ullamco dolore duis irure."
//         }
//       />
//       <MessageBox
//         position="right"
//         title="Emre"
//         type="meetingLink"
//         text="Click to join the meeting"
//         date={new Date()}
//         status={"read"}
//       />
//       <MessageBox
//         position="right"
//         title="Emre"
//         type="text"
//         text="Click to join the meeting"
//         date={new Date()}
//         status={"read"}
//       />
//     </>
//   );
// };

// export default Messages;

import React from "react";
import { MessageBox } from "react-chat-elements";
import "react-chat-elements/dist/main.css";

const Messages = ({ messages, onReplyClick }) => {
  return (
    <>
      {messages.map((msg) => (
        <MessageBox
          key={msg.id}
          position={msg.position}
          title={msg.title}
          type={msg.type}
          text={msg.text}
          date={msg.date}
          replyButton={msg.replyButton}
          reply={msg.reply}
          status={msg.status}
          data={msg.data}
          onReplyClick={() =>
            onReplyClick({
              title: msg.title,
              text: msg.text,
              date: msg.date,
              type: msg.type,
              data: msg.data,
            })
          }
        />
      ))}
    </>
  );
};

export default Messages;
