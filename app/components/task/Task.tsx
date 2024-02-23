'use client';

import React, { useEffect, useState } from 'react';
import AddList from './AddList';
import { observer } from 'mobx-react';
import taskStore, { listItem } from './taskStore';
import TaskCard from './TaskCard';
import Image from 'next/image';

const Task = observer(() => {
  const [list, setList] = useState<listItem[]>([]);

  useEffect(() => {
    if (taskStore.list.length > 0) {
      setList(taskStore.list);
    }
  }, [taskStore.list]);

  return (
    <div className='w-full h-full p-5 flex justify-center'>
      <div className='w-screen h-full bg-transparent flex flex-col justify-center items-center rounded-md p-3 space-y-3'>
        <div className='w-full'>
          <p className='text-left'>ToDo:</p>
        </div>
        <div className='h-full w-full space-y-5 overflow-auto no-scrollbar rounded-lg'>
          {list.length > 0 ? (
            <TaskCard />
          ) : (
            <div className='flex flex-col flex-wrap justify-center items-center grayscale opacity-30 space-y-5 pt-16 text-center'>
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
        <AddList />
      </div>
    </div>
  );
});

export default Task;
