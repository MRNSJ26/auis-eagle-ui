import { create } from 'zustand';

const useChatStore = create((set) => ({
  chat: [],
  addNewMessage: (newMessage: any) =>
    set((state: { chat: any; }) => ({ chat: [...state.chat, newMessage] })),
  setChat: (chat: any) => set({ chat: chat }),
}));

export default useChatStore;
