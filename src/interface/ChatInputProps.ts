interface ChatInputProps{
    handleSendMessage: (message: string) => void;
    handleFirstRender: (value: boolean) => void;
    isSending: boolean;
}

export default ChatInputProps;