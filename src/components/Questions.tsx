interface QuestionsProps{
    quesiton: string;
    handleSendMessage: (message: string) => void;
    handleFirstRender: (value: boolean) => void;
}

const Questions: React.FC<QuestionsProps> = ({quesiton, handleFirstRender, handleSendMessage}) => {
    const handleClick = () => {
        handleSendMessage(quesiton);
        handleFirstRender(false);
    }
    return (
        <div className="border border-gray-200 flex justify-center items-center rounded-lg p-4 w-full bg-gray-50 hover:bg-white">
            <button onClick={handleClick} className="w-full">
                <h1 className="italic">{quesiton}</h1>
            </button>
        </div>
    )
}

export default Questions;