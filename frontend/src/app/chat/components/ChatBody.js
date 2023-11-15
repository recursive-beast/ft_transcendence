'use client';

import MessageBox from './MessageBox';

const ChatBody = () => {
  return (
    <div
      id="messages"
      className="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
    >
      <MessageBox message={"Hey, how's your day going?"} mine={false} />
      <MessageBox
        message={
          "It's a marketing campaign for a new product launch. We're aiming to create a buzz in the market"
        }
        mine={false}
      />
      <MessageBox
        message={
          'Not too bad, thanks for asking. Just finished a productive meeting. How about you?'
        }
        mine={true}
      />
    </div>
  );
};

export default ChatBody;
