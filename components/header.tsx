import { ModeToggle } from '@/components/toggle';
import Link from 'next/link';
import React from 'react';

const Header = () => {
  return (
    <div className='container flex justify-between'>
      <ul className='flex gap-4'>
        <li>
          <Link href='/login'>Login</Link>
        </li>
        <li>
          <Link href='/project'>Project</Link>
        </li>
      </ul>
      <ModeToggle />
    </div>
  );
};

export default Header;
