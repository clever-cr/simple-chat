import io from "socket.io-client";
import { useEffect, useState } from "react";
const socket = io.connect("http://localhost:3001");

const Input = () => {
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const sendMessage = () => {
    console.log("heyy");
    socket.emit("send_message", { message });
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageReceived(data.message);
    });
  }, [socket]);
  return (
    <>
      <div className="p-12">
        <input
          onChange={handleChange}
          placeholder="message... "
          className="outline-none bg-white border-gray-300 border p-2"
        />
        <button
          onClick={sendMessage}
          className="bg-black text-white p-2 rounded-sm "
        >
          Send message
        </button>
        <h1>message:</h1>
        {messageReceived}
      </div>
    </>
  );
};
export default Input;
