import { createContext } from "react";
import { useEffect } from "react";
import { getConversation } from '../actions/conversation';
import { getCookie } from '../actions/auth';
import { useState } from "react";
import { API } from "../config";

export const ConversationContext = createContext();

export const ConversationContextProvider = ({ children, id }) => {
  const [convoUser, setConvoUser] = useState(null);
  const [messages, setMessages] = useState([]);

  const token = getCookie('token');

  useEffect(() => {
    if (id) {
      getConversation(id, token).then(data => {
        setConvoUser(data.conversationUser);
        setMessages(data.messages);
      });
    }
  }, [id]);

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