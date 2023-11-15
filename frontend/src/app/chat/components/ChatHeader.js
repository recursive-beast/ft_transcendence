'use client';

import clsx from 'clsx';
import FriendStatus from './FriendStatus';

const ChatHeader = (props) => {
  return (
    <div className="flex sm:items-center justify-between py-3 border-b-2 border-[#B7AB98]">
      <div className="relative flex items-center space-x-4">
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
            alt=""
            className={clsx(
              'w-10 sm:w-16 h-10 sm:h-16 rounded-full border-2 ',
              props.status == 1 && 'border-[#24E5A5]',
              props.status == 0 && 'border-[#9ca3af]',
              props.status == 2 && 'border-[#EB5A3A]'
            )}
          />
        </div>
        <div className="flex flex-col leading-tight">
          <div className="text-2xl mt-1 flex items-center">
            <span className="text-white mr-3 font-sans">{props.name}</span>
          </div>
          <FriendStatus status={props.status} />
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
