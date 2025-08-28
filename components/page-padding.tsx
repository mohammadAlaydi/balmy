import React from 'react'

export default function PagePadding({children}: {children: React.ReactNode}) {
  return (
    <div className='px-5 md:px-10 lg:px-20 py-10 w-full flex flex-col gap-10'>
        {children}
    </div>
  )
}