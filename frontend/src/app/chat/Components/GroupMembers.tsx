'use client';

import React from 'react';
import { Icon } from '@iconify/react';
import clsx from 'clsx';

interface FriendStatusProps {
  status: number;
}

const FriendStatus: React.FC<FriendStatusProps> = (props) => {
  if (props.status == 1)
    return <span className="text-lg text-[#B7AB98] font-sans">Online</span>;
  else if (props.status == 2)
    return <span className="text-lg text-[#B7AB98] font-sans">Playing</span>;
  else return <span className="text-lg text-[#B7AB98] font-sans">offline</span>;
};

export default FriendStatus;
