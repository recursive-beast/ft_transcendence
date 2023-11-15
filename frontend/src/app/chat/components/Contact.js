'use client';


const ChatHeader = (props) => {
  return (
    <div>
      <div className="flex items-center space-x-2">
        <img
          src="https://picsum.photos/200"
          className="w-10 h-10 rounded-full border"
        />
        <div>
          <div className="text-[12px] text-[#B7AB98]">
            {props.name}
          </div>
          <div className="text-[10px]  text-[#625D53]">
            {props.lastMessage}
          </div>
        </div>
        <div className="text-[10px] font-extralight  flex flex-col items-center justify-center">
          <div className="text-[#625D53]">17:45</div>
          <div className="w-5 h-5  rounded-full border-[0.5px] border-[#B7AB98] flex items-center justify-center">
            <div className="text-[#625D53]">10</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
