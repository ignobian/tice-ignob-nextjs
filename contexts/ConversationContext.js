import { createContext } from "react";
import { useEffect } from "react";
import { getConversation } from '../actions/getConversation';

export const ConversationContext = createContext();

export const ConversationContextProvider = ({ children, id }) => {
  useEffect(() => {
    if (id) {
      getConversation(id, token).then(data => {
        console.log(data);
      });
    }
  }, [id]);
  return (
    <ConversationContext.Provider value={{
      id
    }}>
      {children}
    </ConversationContext.Provider>
  )
}