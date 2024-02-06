import React from 'react';
import Menu from '../components/Menu';
import Task from '../components/Task';

const focus = () => {
  return (
    <div className='h-screen flex flex-col'>
      <Menu />
      <div className='bg-orange-400 flex-grow'>
        <Task />
      </div>
    </div>
  );
};

export default focus;
