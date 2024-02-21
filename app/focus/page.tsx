import React from 'react';
import Menu from '../components/Menu';
import Task from '../components/task/Task';

const focus = () => {
  return (
    <div className='h-screen flex flex-col items-center justify-center bg-bezel'>
      <Menu />
      <div className='general-layout flex-grow md:flex'>
        <Task />
      </div>
    </div>
  );
};

export default focus;
