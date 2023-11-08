'use client';

import React from 'react';
import Sidebar from './components/Sidebar';
import ChatHeader from './components/ChatHeader';
import ChatBody from './components/ChatBody';
import Contact from './components/Contact';
import GroupMembers from './components/GroupMembers';
import { Icon } from '@iconify/react';

const chats = [
  { name: 'syakoubinato', lastMessage: 'test 123 test' },
  { name: 'Bader', lastMessage: 'test 123 test' },
  { name: 'Bader', lastMessage: 'test 123 test' },
  { name: 'Bader', lastMessage: 'test 123 test' },
  { name: 'Bader', lastMessage: 'test 123 test' },
  { name: 'Bader', lastMessage: 'test 123 test' },
  { name: 'Bader', lastMessage: 'test 123 test' },
  { name: 'Bader', lastMessage: 'test 123 test' },
  { name: 'Bader', lastMessage: 'test 123 test' },
  { name: 'Bader', lastMessage: 'test 123 test' },
  { name: 'Bader', lastMessage: 'test 123 test' },
  { name: 'Bader', lastMessage: 'test 123 test' },
  { name: 'Bader', lastMessage: 'test 123 test' },
  { name: 'Bader', lastMessage: 'test 123 test' },
];

const Home: React.FC = () => {
  return (
    <main className="flex h-screen w-screen text-white ">
      <Sidebar />
      <div className="flex flex-col w-fit">
        <div className="h-1/2 flex flex-col bg-[#0D0D0D] p-8">
          <div className="flex space-y-4">
            <div className="text-[#625D53] text-xl">Direct Messages</div>
            <div className="text-[#625D53]">
              <Icon icon="ph:caret-up-down-bold" width="22" />
            </div>
          </div>
          <div className="space-y-2 max-h-full overflow-y-scroll no-scrollbar">
            {chats.map((chat) => (
              <Contact {...chat} />
            ))}
          </div>
        </div>
        <div className="bg-[#0D0D0D] h-1/2 ">
          <div className="flex pl-8 item-center justify-center">
            <div className="text-xl text-[#625D53]">Group Messages</div>
            <div className="text-[#625D53]">
              <Icon icon="bi:plus" width="22" />
            </div>
          </div>

          <div className="p-4">
            <div className="flex ">
              <div className="flex items-center space-x-2">
                <img
                  src="https://picsum.photos/200"
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <div className="text-[12px] text-[#B7AB98]">
                    ping pong group
                  </div>
                  <div className="text-[10px]  text-[#625D53]">3 min ago</div>
                </div>
              </div>
              <div className="w-[30%] flex items-center justify-center">
                <GroupMembers />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 bg-[#0D0D0D] p-8">
        <ChatHeader name={'Abdeljalil Ait Omar'} status={0} />
        <ChatBody />
      </div>
      <div className="flex-col flex">
        <div className="flex-1 bg-red-900 p-8">search bar</div>
      </div>
    </main>
  );
};

export default Home;