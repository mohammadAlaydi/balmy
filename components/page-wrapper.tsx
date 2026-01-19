import React from 'react'

export default function PageWrapper({ children , yPadding , xPadding }: { children: React.ReactNode , yPadding?: string , xPadding?: string }) {
  return (
    <div className={`p-2 sm:p-5 ${yPadding ? yPadding : 'lg:py-[100px] xl:py-[100px]'} ${xPadding ? xPadding : 'lg:px-[100px] xl:px-[150px]'}`}>
      {children}
    </div>
  )
}