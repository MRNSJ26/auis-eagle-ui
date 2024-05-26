"use client";
import axios from "axios";
import persona from "./persona.json";

export async function useCreateChat(email: string) {
  const chat_exists = await useChat(email);
  console.log(chat_exists);
  if (!chat_exists) {
    const options = {
      method: "POST",
      url: `https://app.customgpt.ai/api/v1/projects/${process.env.NEXT_PUBLIC_PROJECT_ID}/conversations`,
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        authorization: "Bearer " + process.env.NEXT_PUBLIC_CHAT_API_KEY,
      },
      data: { name: email },
    };
    const response = await axios.request(options);

    console.log(response.data);
    localStorage.setItem("session_id", response.data.data.session_id);
  }
}

export async function useChat(email: string) {
  const options = {
    method: "GET",
    url: `https://app.customgpt.ai/api/v1/projects/${process.env.NEXT_PUBLIC_PROJECT_ID}/conversations`,
    params: { name: email }, // Add conversation_name query parameter
    headers: {
      accept: "application/json",
      authorization: "Bearer " + process.env.NEXT_PUBLIC_CHAT_API_KEY,
    },
  };

  const response = await axios.request(options);

  console.log(response.data.data.data[0]);
  localStorage.setItem("session_id", response.data.data.data[0].session_id);
  return response.data.data.data[0];
}

export async function useSendChat(message: string | null) {
  // const chat = useChatStore((state: any) => state.chat);
  // const setChat = useChatStore((state: any) => state.setChat)
  // const addMessage = useChatStore((state: any) => state.addNewMessage)
  const options = {
    method: "POST",
    url: `https://app.customgpt.ai/api/v1/projects/${
      process.env.NEXT_PUBLIC_PROJECT_ID
    }/conversations/${localStorage.getItem(
      "session_id"
    )}/messages?stream=false&lang=en'`,
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      authorization: "Bearer " + process.env.NEXT_PUBLIC_CHAT_API_KEY,
    },
    data: {
      response_source: "openai_content",
      prompt: message,
      custom_persona: persona.persona,
      chatbot_model: "gpt-4",
    },
  };
  console.log(persona.persona);
  const response = await axios.request(options);

  return response.data.data.openai_response;
}

export async function useChatMessages() {
  const options = {
    method: "GET",
    url: `https://app.customgpt.ai/api/v1/projects/${
      process.env.NEXT_PUBLIC_PROJECT_ID
    }/conversations/${localStorage.getItem(
      "session_id"
    )}/messages?page=1&order=desc`,
    headers: {
      accept: "application/json",
      authorization: "Bearer " + process.env.NEXT_PUBLIC_CHAT_API_KEY,
    },
  };

  const response = await axios.request(options);

  console.log(response.data.data.messages.data);

  return response.data.data.messages.data;
}
