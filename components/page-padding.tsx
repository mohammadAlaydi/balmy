import React from 'react'

export default function PagePadding({children, containerClassName}: {children: React.ReactNode, containerClassName?: string}) {
  return (
    <div className={`px-5 md:px-10 lg:px-20 py-10 flex flex-col gap-10 ${containerClassName}`}>
        {children}
    </div>
  )
}