'use client';

import React from 'react';
import { Icon } from '@iconify/react';

const Sidebar: React.FC = () => {
  return (
    <div className="px-6 flex-none space-y-6 bg-gray-800 flex flex-col justify-center items-center">
      <Icon icon="solar:home-2-broken" width="36" />
      <Icon icon="solar:gamepad-broken" width="36" />
      <Icon icon="solar:ranking-broken" width="36" />
      <Icon icon="fluent:chat-28-regular" width="36" />
    </div>
  );
};

export default Sidebar;
