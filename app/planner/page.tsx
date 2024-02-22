import React from 'react';
import Image from 'next/image';
import Task from '../components/task/Task';
import Calendar from '../components/Calendar';
import Mile from '../components/Mile';
import Menu from '../components/Menu';

const Planner = () => {
  return (
    <div className='w-screen h-screen'>
      <Menu />
      <div className='w-full h-full bg-cyan-400 flex justify-center'>
        <div className='md:w-[1440px] bg-orange-700'>
          <div className='flex h-3/5'>
            <div className='w-1/3 h-full bg-yellow-400'>
              <div className='w-full h-full flex-grow'>
                <Task />
              </div>
            </div>
            <div className='w-2/3 bg-green-400'>
              <Calendar />
            </div>
          </div>
          <div className='w-full h-1/4 bg-purple-500'>
            <Mile />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Planner;
