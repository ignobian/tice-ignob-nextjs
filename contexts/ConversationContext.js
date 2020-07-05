import { createContext } from "react";
import { useEffect } from "react";
import { getConversation } from '../actions/conversation';
import { getCookie } from '../actions/auth';
import { useState } from "react";
import { WS_API } from "../config";
import { useRef } from "react";

export const ConversationContext = createContext();

export const ConversationContextProvider = ({ children, id }) => {
  const [convoUser, setConvoUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const messagesRef = useRef(messages);

  const token = getCookie('token');

  useEffect(() => {
    messagesRef.current = messages;

    if (messages.length > 0) {
      // set last message ref
      document.querySelector('#last-message').scrollIntoView();
      
    }
  }, [messages]);

  useEffect(() => {
    if (id) {
      getConversation(id, token).then(data => {
        setConvoUser(data.conversationUser);
        setMessages(data.messages);
      });

      // if all of our initial messages are loaded, we can connect websocket
      const actioncable = require('actioncable');

      const cable = actioncable.createConsumer(`${WS_API}/cable`);
  
      cable.subscriptions.create({
        channel: 'ConversationChannel',
        id,
        token: getCookie('token')
      }, {
        connected: () => console.log('connected'),
        rejected: () => console.log('rejected'),
        received: data => handleReceived(JSON.parse(data))
      });
    }
  }, [id]);

  const handleReceived = data => {
    // if it is a new message, append to current messages
    if (data.message) {
      setMessages(messagesRef.current.concat(data.message));
    }
  }

  return (
    <ConversationContext.Provider value={{
      id,
      convoUser,
      messages
    }}>
      {children}
    </ConversationContext.Provider>
  )
}