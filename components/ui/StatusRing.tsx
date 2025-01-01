import React from 'react'
import { twMerge } from 'tailwind-merge';

export interface StatusTextProps {
    status: 'Completed' | 'In progress' | 'Failed';
}

const StatusRing:React.FC<StatusTextProps> = ({ status }) => {
   
    const getStatusColor = (status: string) => {
        switch (status) {
          case 'Completed':
            return 'border-green-400';
          case 'In progress':
            return 'border-yellow-400';
          case 'Failed':
            return 'border-red-400';
          default:
            return 'border-blue-400';
        }
      };
const statusColor = getStatusColor(status);


return (
    <div className={twMerge('w-3 h-3 rounded-full border-2', statusColor)} />
)
}

export default StatusRing