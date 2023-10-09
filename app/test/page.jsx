"use client";
import { useEffect } from "react";
import { io } from "socket.io-client";

function Page() {
   const socket = io("http://localhost:4000");

   useEffect(() => {
      socket.on("connect", () => {
         // This code will run when the component mounts in the browser.
         const messageList = document.querySelector(".messageBox");
         messageList.innerHTML += `<span>connected with ${socket.id}</span><br>`;
      });

      socket.on("receive-message", (message) => {
         console.log(message);
         const messageList = document.querySelector(".messageBox");
         messageList.innerHTML += `<span>${message.photos}</span><br>`;
      });
   }, []);
   return (
      <div>
         <h1>socket.io-client</h1>
         <div className="messageBox">this is message box</div>
      </div>
   );
}

export default Page;
