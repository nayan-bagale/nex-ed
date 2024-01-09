'use client'

import { LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';

const SignOutButton = () => {
  return (
    <div className='flex items-center' onClick={() => signOut({ callbackUrl: "/" })}>
      <LogOut className="mr-2 h-4 w-4" />
      Log out
    </div>
  );
}

export default SignOutButton