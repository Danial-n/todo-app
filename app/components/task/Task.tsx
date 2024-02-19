'use client';

import React, { useState } from 'react';
import AddList from './AddList';
import { observer } from 'mobx-react';
import taskStore from './taskStore';
import TaskCard from './TaskCard';

const Task = observer(() => {
  const list = taskStore.list;

  return (
    <div className='w-full h-full p-5 flex justify-center'>
      <div className='w-full h-full bg-white flex flex-col justify-center rounded-md p-3'>
        <div className='h-10 flex justify-between'>
          <div>ToDo:</div>
        </div>

        <AddList />

        <div className='h-full space-y-3 overflow-auto'>
          {list.length > 0 ? (
            <TaskCard />
          ) : (
            <div className='flex justify-center items-center'>
              <p>No task</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

export default Task;
