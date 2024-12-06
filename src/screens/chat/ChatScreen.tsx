import React, { useState, useCallback, useEffect } from 'react';
import { GiftedChat, IMessage } from 'react-native-gifted-chat'; // Import IMessage type from GiftedChat
import uuid from 'react-native-uuid';
import OpenAI from 'openai';
import { OPEN_API_KEY } from '@env';
import Markdown from 'react-native-markdown-display';
import { TextStyle } from 'react-native';

// OpenAI setup
const openai = new OpenAI({ apiKey: OPEN_API_KEY });

const error = console.error;
console.error = (...args) => {
  if (/defaultProps/.test(args[0])) return;
  error(...args);
}; // Ignore warning of Gifted Chat

// Types for messages
interface User {
  _id: number;
  name: string;
  avatar: string;
}

interface CustomMessageTextProps {
  currentMessage: IMessage;
}

export function ChatScreen() {
  const [messages, setMessages] = useState<IMessage[]>([]); // State for messages
  const [isTyping, setIsTyping] = useState<boolean>(false); // State for typing indicator

  // Async function for sending the user message to OpenAI
  const test = async (userMessage: string) => {
    try {
      setIsTyping(true);
      const completion = await openai.chat.completions.create({
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          { role: 'user', content: userMessage },
        ],
        model: 'gpt-4o-mini',
      });

      const aiMessage = completion.choices[0].message.content || ''; // Fallback to empty string if aiMessage is null
      const newMessage: IMessage = {
        _id: uuid.v4() as string, // Ensure uuid.v4() returns a string
        text: aiMessage, // Ensure aiMessage is always a string
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'AI Assistant',
          avatar: 'https://www.shutterstock.com/image-vector/chat-bot-icon-virtual-smart-600nw-2478937553.jpg',
        },
      };

      setMessages((previousMessages) => GiftedChat.append(previousMessages, [newMessage]));
    } catch (error) {
      console.error(error);
    } finally {
      setIsTyping(false);
    }
  };

  // Handling sending of messages
  const onSend = useCallback((messages: IMessage[] = []) => {
    setMessages((previousMessages) => GiftedChat.append(previousMessages, messages));
    const userMessage = messages[0].text;
    test(userMessage);
  }, []);

  // Custom message rendering component
  const CustomMessageText: React.FC<CustomMessageTextProps> = ({ currentMessage }) => {
    const textColor = currentMessage.user._id === 1 ? 'white' : 'black';
  
    const messageTextStyle: TextStyle = {
      marginHorizontal: 10,
      fontSize: 16,
      color: textColor,
      lineHeight: 20, // This should be a valid number here
      marginTop: 5,
      marginBottom: 5,
      marginLeft: 10,
      marginRight: 10,
    };
  
    return (
      <Markdown style={{ body: messageTextStyle }}>
        {currentMessage.text}
      </Markdown>
    );
  };

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: 1,
      }}
      renderMessageText={CustomMessageText}
      isTyping={isTyping}
    />
  );
}

export default ChatScreen;