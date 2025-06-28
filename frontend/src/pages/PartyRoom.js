import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./PartyRoom.css";

// PUBLIC_INTERFACE
function PartyRoom() {
  const { code } = useParams();
  const [messages, setMessages] = useState([
    { sender: "ModBot", text: "Welcome to the Watch Party 🎬" },
  ]);
  const [msgInput, setMsgInput] = useState("");

  const sendMsg = (e) => {
    e.preventDefault();
    if (msgInput.trim()) {
      setMessages(msgs => [...msgs, { sender: "You", text: msgInput }]);
      setMsgInput("");
    }
  };

  return (
    <div className="partyroom-root">
      <div className="partyroom-main">
        <div className="partyroom-player">
          <div className="player-mock">
            <span>Player: Movie/TV Stream Here</span>
          </div>
        </div>
        <div className="partyroom-chat">
          <div className="partyroom-codebar">
            <span>Party Code: <b>{code}</b></span>
            <button className="btn btn-mini"
              onClick={() => navigator.clipboard.writeText(code)}>Copy</button>
            <Link to="/browse" className="btn btn-mini" style={{marginLeft:'1em'}}>→ Browse</Link>
          </div>
          <div className="partyroom-chatbox">
            {messages.map((m, i) => (
              <div className="partyroom-msg" key={i}>
                <span className="partyroom-msg-sender">{m.sender}:</span>
                <span className="partyroom-msg-text">{m.text}</span>
              </div>
            ))}
          </div>
          <form className="partyroom-chatinput" onSubmit={sendMsg}>
            <input
              value={msgInput}
              onChange={e => setMsgInput(e.target.value)}
              type="text"
              placeholder="Type message..."
              maxLength={222}
            />
            <button className="btn btn-mini" type="submit">Send</button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default PartyRoom;
