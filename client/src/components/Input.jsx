import io from "socket.io-client";
import { useEffect, useState } from "react";
const socket = io.connect("http://localhost:3001");

const Input = () => {
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");
  const [room, setRoom] = useState("");

  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room);
    }
  };

  const handleRoom = (e) => {
    setRoom(e.target.value);
  };

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const sendMessage = () => {
    socket.emit("send_message", { message, room });
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageReceived(data.message);
    });
  }, [socket]);
  return (
    <>
      <div className="p-12 flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <input
            className="outline-none bg-white border-gray-300 border p-2"
            placeholder="Room Number..."
            onChange={handleRoom}
          />
          <button
            className="bg-black text-white p-2 rounded-sm "
            onClick={joinRoom}
          >
            Join Room
          </button>
        </div>
        <div className="flex items-center gap-2">
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
        </div>

        <h1>message: {messageReceived}</h1>
      </div>
    </>
  );
};
export default Input;
