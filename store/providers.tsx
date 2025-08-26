import React from "react";
import ReduxProvider from "@/components/providers/redux-provider";

export default function Providers({children} : {children : React.ReactNode}) {
  return (
    <ReduxProvider>
      {children}
    </ReduxProvider>
  )
}
