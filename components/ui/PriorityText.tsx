import React from 'react'

interface PriorityTextProps {
    priority: 'High' | 'Medium' | 'Low';
}

const PriorityText: React.FC<PriorityTextProps> = ({ priority }) => {
    const getColor = (priority: 'High' | 'Medium' | 'Low') => {
        switch (priority) {
            case 'High':
                return 'text-red-400';
            case 'Medium':
                return 'text-yellow-400';
            case 'Low':
                return 'text-green-400';
            default:
                return 'text-blue-400';
        }
    };

    return (
        <p>Priority: <span className={getColor(priority)}>{priority}</span></p>
    )
}

export default PriorityText