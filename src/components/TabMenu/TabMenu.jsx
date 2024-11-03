import React from 'react'
import Link from 'next/link'
import Icon from '@/assets/icon/icon'

export default function TabMenu({url, iconName, text, className}) {
  return (
    <Link href={url} className='w-full'>
        <div className="flex flex-row text-lg">
            <Icon name={iconName} className={`w-6 h-6 mr-3 ${className}`}></Icon>
            <div>{text}</div>
        </div>
    </Link>
  )
}
