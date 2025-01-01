import React from 'react'

export interface StatusTextProps {
  status: 'Completed' | 'In progress' | 'Failed';
}

const StatusText: React.FC<StatusTextProps> = ({ status }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'text-green-400';
      case 'In progress':
        return 'text-yellow-400';
      case 'Failed':
        return 'text-red-400';
      default:
        return 'text-blue-400';
    }
  };

  return (
    <p>Status: <span className={getStatusColor(status)}>{status}</span></p>
  )
}

export default StatusText