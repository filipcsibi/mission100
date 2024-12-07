import React, { useState, useCallback } from "react";
import { StyleSheet, View, TextStyle } from "react-native";
import { GiftedChat, IMessage, InputToolbar } from "react-native-gifted-chat";
import uuid from "react-native-uuid";
import OpenAI from "openai";
import Markdown from "react-native-markdown-display";
import { OPEN_API_KEY } from "@env";

export const openai = new OpenAI({
  apiKey: OPEN_API_KEY,
});

interface CustomMessageTextProps {
  currentMessage: IMessage;
}

export function ChatScreen() {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [isTyping, setIsTyping] = useState<boolean>(false);

  const test = async (userMessage: string) => {
    try {
      setIsTyping(true);
      const completion = await openai.chat.completions.create({
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: userMessage },
        ],
        model: "gpt-4o-mini",
      });

      const aiMessage = completion.choices[0].message.content || "";
      const newMessage: IMessage = {
        _id: uuid.v4() as string,
        text: aiMessage,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "AI Assistant",
          avatar:
            "https://www.shutterstock.com/image-vector/chat-bot-icon-virtual-smart-600nw-2478937553.jpg",
        },
      };

      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, [newMessage])
      );
    } catch (error) {
      console.error(error);
    } finally {
      setIsTyping(false);
    }
  };

  const onSend = useCallback((messages: IMessage[] = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
    const userMessage = messages[0].text;
    test(userMessage);
  }, []);

  const CustomMessageText: React.FC<CustomMessageTextProps> = ({
    currentMessage,
  }) => {
    const textColor = currentMessage.user._id === 1 ? "white" : "black";

    const messageTextStyle: TextStyle = {
      marginHorizontal: 10,
      fontSize: 16,
      color: textColor,
      lineHeight: 20,
      marginTop: 5,
      marginBottom: 5,
    };

    return (
      <Markdown style={{ body: messageTextStyle }}>
        {currentMessage.text}
      </Markdown>
    );
  };

  const renderInputToolbar = (props: any) => {
    return (
      <View style={styles.customInputToolbar}>
        <InputToolbar
          {...props}
          containerStyle={styles.inputContainer}
          primaryStyle={styles.primaryInput}
        />
      </View>
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
      renderInputToolbar={renderInputToolbar}
      isTyping={isTyping}
    />
  );
}

const styles = StyleSheet.create({
  customInputToolbar: {
    padding: 12,
    width: "100%",
  },
  inputContainer: {
    borderTopWidth: 0,
    padding: 6,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  primaryInput: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default ChatScreen;
