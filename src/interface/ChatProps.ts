import User from '@/interface/UserProps';

interface ChatProps {
    message: string | null;
    user: User | undefined;
    handleSendMessage: (message: string) => void;
    firstRender: boolean;
    handleFirstRender: (value: boolean) => void;
    handleSendingMessage: (value: boolean) => void;
    pdfClicked: boolean;
    setPdfClick: React.Dispatch<React.SetStateAction<boolean>>;
}

export default ChatProps;