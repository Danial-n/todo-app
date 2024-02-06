import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ListTodoIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const Menu = () => {
  return (
    <div className='w-screen h-12 bg-blue-300 flex justify-center'>
      <div className=' w-full md:w-[1440px] bg-blue-500 flex justify-between space-x-5 px-3'>
        {/* LEFT MENU */}
        <div className='flex items-center'>
          <Link href='/'>
            <ListTodoIcon />
          </Link>
        </div>
        {/* RIGHT MENU */}
        <div className='flex items-center space-x-10'>
          {/* SETTING */}
          <DropdownMenu>
            <DropdownMenuTrigger>setting</DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>Style</DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuItem>
                    <Link href='/focus'>Focus</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href='/planner'>Planner</Link>
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
              <DropdownMenuItem>others....</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          {/* PROFILE */}
          <button>profile</button>
        </div>
      </div>
    </div>
  );
};

export default Menu;
