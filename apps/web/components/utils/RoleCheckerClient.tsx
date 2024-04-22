'use client'
import { useSession } from 'next-auth/react'
import React, { FC } from 'react'

const RoleCheckerClient: FC<{ children: React.ReactNode }> = ({children}) => {
    const {data:session} = useSession();
  return (
    <>
        {session?.user.role === 'teacher' && children}
    </>
  )
}

export default RoleCheckerClient