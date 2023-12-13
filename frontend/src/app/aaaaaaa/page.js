import React from 'react';
import './YourComponent.css'; // Import your CSS file with the styling

const YourComponent = () => {
  return (
    <div className="hidden h-12 w-full items-center justify-center border-b border-tx01 bg-bg02 font-light uppercase tracking-[10px] xs:tracking-[14px] lg:flex ">
      <div className="hidden h-12 w-full items-center justify-center border-b border-tx01 bg-bg02 text-xl font-light uppercase tracking-[10px] xs:tracking-[14px] lg:flex ">
        {/* Content for the top div */}
      </div>
      <div className="bottom-div">
        {/* Content for the bottom div */}
      </div>
    </div>
  );
};

export default YourComponent;
