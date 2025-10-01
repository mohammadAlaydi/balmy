import React from 'react'

export default function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className='p-2 sm:p-5 lg:px-[120px] lg:py-[100px] xl:px-[150px] xl:py-[100px]'>
      {children}
    </div>
  )
}