import React from 'react';
import Menu from '../components/Menu';
import Task from '../components/task/Task';

const Focus = () => {
  return (
    <div className='h-screen w-screen flex flex-col items-center justify-center bg-thebackground'>
      <Menu />
      <div
        className='w-full h-[90%] flex-grow 
      sm:w-[1440px] sm:flex'
      >
        <Task />
      </div>
    </div>
  );
};

export default Focus;
