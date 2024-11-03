import React, { useEffect } from 'react';
import tippy  from 'tippy.js';
import 'tippy.js/dist/tippy.css';

export default function ToolTips({onClick, icon, tooltipText }) {
    useEffect(() => {
        tippy('.tooltip', {
            content(reference) {
            return reference.getAttribute('data-tooltip');
            },
        });
        }, [icon]);
  return (
    <div
      onClick={onClick}
      className='cursor-pointer tooltip'
      data-tooltip={tooltipText}
    >
      {icon}
    </div>
  )
}
