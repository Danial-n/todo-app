import React from 'react';
import Menu from '../components/Menu';
import Task from '../components/task/Task';

const focus = () => {
  return (
    <div className='h-screen flex flex-col items-center justify-center bg-thebackground'>
      <Menu />
      <div className='general-layout h-[90%] flex-grow sm:flex'>
        <Task />
      </div>
    </div>
  );
};

export default focus;
