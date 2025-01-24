import axios from "axios";

export const sendTg = async (
    msg:string,
): Promise<void> => {
    if (!process.env.TELEGRAM_BOT_TOKEN || !process.env.TELEGRAM_CHAT_ID) {
        console.error('Telegram bot token or chat ID is not set');
        return;
    }
    try {
        const url = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`;
        await axios.post(url, {
            chat_id: process.env.TELEGRAM_CHAT_ID,
            text: msg,
            parse_mode: 'HTML'
        });
        console.log('Telegram message sent successfully');
    } catch (error) {
        console.error('Failed to send Telegram message:', error);
    }
}


