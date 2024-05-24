
import { faker } from '@faker-js/faker';
import App from './demo'; // Adjust the path as needed

export interface SenderInfo {
    avatar: string;
    name: string;
    user_id: string;
}

export interface Message {
    content: string;
    dialog_id: number;
    msg_id: number;
    msg_type: number;
    sender_id: string;
    sender_info: SenderInfo;
    this_user: boolean;
    send_at: string,
}

export const Dialog = () => {

    const generateMessages = (count: number,startID:number): Message[] => {
        const messages: Message[] = [];
        for (let i = 0; i < count; i++) {
            messages.push(generateMessage(startID+i));
        }
        return messages;
    };
    
    const msgList = generateMessages(10,1);
    console.log(msgList);
    
    

  return (
    <App msgs={msgList}/>
  );
};

export const generateMessage = (id: number): Message => {
    return {
        this_user: faker.datatype.number({ min: 0, max: 1 })===1?true:false,
        content: faker.lorem.sentence(),
        dialog_id: faker.datatype.number({ min: 1, max: 10 }),
        msg_id: id,
        msg_type: faker.datatype.number({ min: 0, max: 1 }),
        sender_id: faker.string.uuid(),
        send_at: formatDateTime(new Date(faker.date.past())),
        sender_info: {
            avatar: faker.image.avatar(),
            name: faker.internet.userName(),
            user_id: faker.string.uuid()
        }
    };
};

function formatDateTime(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);
    const seconds = ('0' + date.getSeconds()).slice(-2);
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }
  