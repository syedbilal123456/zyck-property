"use client"
import { KindeProvider } from '@kinde-oss/kinde-auth-nextjs'
import React from 'react'

 function Providers({children}:{
    children:React.ReactNode
}) {
  return (
  <KindeProvider
          domain="https://zyckrealestate.kinde.com" // Replace with your Kinde domain
          clientId="0b529d71a0d849b49679faf2fe6e4458" // Replace with your client ID
        >
          {children}
        </KindeProvider>
  )
}

export {Providers}
