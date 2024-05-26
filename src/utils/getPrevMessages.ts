import Message from "@/interface/Message";

interface PrevMessagesProps{
    openai_response: string;
    user_query: string;
}

function convertToMessagesArray(prevMessages: PrevMessagesProps[]): Message[] {
    const messages: Message[] = [];

    prevMessages.forEach(prevMessage => {
        messages.push({ message: prevMessage.openai_response, role: "system"});
        messages.push({ message: prevMessage.user_query, role: "student"});
    });
    return messages.reverse();
}

export default convertToMessagesArray;