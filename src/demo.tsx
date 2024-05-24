import React, { useEffect, useState,useRef,useLayoutEffect } from 'react';
import { Avatar, List, message } from 'antd';
import VirtualList,{ type ListRef } from 'rc-virtual-list';
import {Message,generateMessage} from './dialog';



const ContainerHeight = 800;

interface AppProps {
  msgs: Message[];
}

const generateMessages = (count: number,startID:number): Message[] => {
  const messages: Message[] = [];
  for (let i = 0; i < count; i++) {
      messages.push(generateMessage(startID+i));
  }
  return messages;
};

const App: React.FC<AppProps> = ({ msgs }) => {
  const [data, setData] = useState<Message[]>([]);
  const listRef = React.useRef<ListRef>(null);

  useEffect(() => {
    setData(msgs);
  }, [msgs]);


  useEffect(() => {
    console.log("6",msgs.length);
    
    // 当数据更新后将滚动条调整到最下面
    if (listRef.current) {
      listRef.current.scrollTo({
        index: msgs.length,
        align: 'top',
      });
    }
  }, []);

  const appendData = () => {
    // 模拟生成新数据
    const newData = generateMessages(10, data.length+1);
    console.log("new data", newData);
    // 将新数据添加到原数据的前面
    setData([...newData, ...data]);

  };

  const onScroll = (e: React.UIEvent<HTMLElement, UIEvent>) => {
    const scrollTop = e.currentTarget.scrollTop;
  
    if (scrollTop <= 0) {
      console.log("e.currentTarget.scrollHeight", e.currentTarget.scrollHeight);
      if (e.currentTarget.scrollHeight > 10000) {
        e.currentTarget.scrollTo(0, scrollTop + 3000);
      } else if (e.currentTarget.scrollHeight > 5000) {
        e.currentTarget.scrollTo(0, scrollTop + 1000);
      } else {
        e.currentTarget.scrollTo(0, 400);
      }
      appendData();
    }
  };

  return (
    <List         bordered	
    >
      <VirtualList
        data={data}
        height={ContainerHeight}
        itemHeight={47}
        itemKey="msg_id"
        onScroll={onScroll}
        ref={listRef}
      >
        {(item: Message) => (
          <List.Item className={`mb-5 ${item.this_user ? 'flex-row-reverse' : ''}`}>
            <div className="flex-wrap">
              <div className="mr-10">

                <h3>{item.sender_info.name}</h3>
                <Avatar src={item.sender_info.avatar} />
              </div>
              <div>{item.send_at}</div>
            </div>
            <div className="bg-sky-300 w-28">{item.content}</div>
          </List.Item>
        )}
      </VirtualList>
    </List>
  );
};

export default App;