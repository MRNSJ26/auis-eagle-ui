export default function formatTextToHTML(input: string) {
    let formattedText = input.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');
    formattedText = formattedText.replace(/\d+\.\s+/g, '<br>$&');  
    return formattedText;
}