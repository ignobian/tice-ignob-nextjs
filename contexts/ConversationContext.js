import { createContext } from "react";
import { useEffect } from "react";
import { getConversation, getMessages } from '../actions/conversation';
import { getCookie } from '../actions/auth';
import { useState } from "react";
import { WS_API } from "../config";
import { useRef } from "react";

export const ConversationContext = createContext();

export const ConversationContextProvider = ({ children, id }) => {
  const [convoUser, setConvoUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const oldLoaded = useRef(false);
  const [loading, setLoading] = useState(false);
  const messagesRef = useRef(messages);
  const [typing, setTyping] = useState([]);
  const typingRef = useRef(typing);

  const token = getCookie('token');

  useEffect(() => {
    messagesRef.current = messages;

    console.log(oldLoaded.current);

    if (!oldLoaded.current && messages.length > 0) {
      document.querySelector('#last-message').scrollIntoView(); 
    }

    oldLoaded.current = false;

    console.log(oldLoaded.current);
  }, [messages]);

  useEffect(() => {
    typingRef.current = typing;
  }, [typing])

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

  const timeout = useRef(null);

  const handleReceived = data => {
    // if it is a new message, append to current messages
    if (data.typing) {
      if (!typingRef.current.includes(data.typing)) {
        setTyping(typingRef.current.concat(data.typing));
      }

      // clear timeout
      clearTimeout(timeout.current);
      // set timeout
      timeout.current = setTimeout(() => setTyping([]), 500);
    }

    if (data.message) {
      setMessages(messagesRef.current.concat(data.message));
    }
  }

  const fetchMessages = async () => {
    setLoading(true);
    const skip = messagesRef.current.length;

    const data = await getMessages(id, skip, token);

    oldLoaded.current = true;

    setMessages(data.concat(messagesRef.current));
    
    setLoading(false);
  }

  return (
    <ConversationContext.Provider value={{
      id,
      convoUser,
      typing,
      messages,
      loading,
      fetchMessages
    }}>
      {children}
    </ConversationContext.Provider>
  )
}