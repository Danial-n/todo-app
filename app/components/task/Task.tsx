'use client';

import React, { useState } from 'react';
import AddList from './AddList';
import { observer } from 'mobx-react';
import taskStore from './taskStore';
import TaskCard from './TaskCard';
import Image from 'next/image';

const Task = observer(() => {
  const list = taskStore.list;

  return (
    <div className='w-full h-full p-5 flex justify-center'>
      <div className='w-full h-full bg-transparent flex flex-col justify-center rounded-md p-3'>
        <div className='h-10 flex justify-between'>
          <div>ToDo:</div>
        </div>

        <AddList />

        <div className='h-full space-y-5 overflow-auto'>
          {list.length > 0 ? (
            <TaskCard />
          ) : (
            <div className='flex flex-col justify-center items-center grayscale opacity-30 space-y-5 pt-16 text-center'>
              <Image
                src='/assets/remove_12653143.png'
                alt='no task'
                width={75}
                height={75}
              />
              <p>No Task</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

export default Task;
