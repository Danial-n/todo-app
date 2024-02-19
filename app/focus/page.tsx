import React from 'react';
import Menu from '../components/Menu';
import Task from '../components/task/Task';

const focus = () => {
  return (
    <div className='bg-orange-400 h-screen flex flex-col md:items-center justify-center'>
      <Menu />
      <div className='general-layout h-full flex-grow md:flex '>
        <Task />
      </div>
    </div>
  );
};

export default focus;
