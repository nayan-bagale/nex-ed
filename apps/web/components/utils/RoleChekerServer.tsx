import { getServerSession } from 'next-auth'
import React, { FC } from 'react'
import { authOptions } from './options'

const RoleChekerServer: FC<{ children: React.ReactNode }> = async ({ children }) => {
    const session = await getServerSession(authOptions);
    return (
        <>
            {session?.user.role === 'teacher' && children}
        </>
    )
}

export default RoleChekerServer