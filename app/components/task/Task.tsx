'use client';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Edit, Trash } from 'lucide-react';
import React, { useState } from 'react';
import AddList from './AddList';
import EditList from './EditList';
import taskStore from './taskStore';
import { observer } from 'mobx-react';

const Task = observer(() => {
  const list = taskStore.list;

  const deleteList = (index: number) => {
    list.filter((_, i) => i !== index);
  };

  // const editList = (index: number) => {
  //   const editedTitle = userTitleInput
  //   const editedTask = userTaskInput
  //   const updatedTasks = [...userTaskInput];
  //   updatedTasks[index]. = editedTask
  // }

  //   const editItem = (index: number) => {
  //     const editedTask = prompt('Edit the todo:');
  //     if (editedTask !== null && editedTask.trim() !== '') {
  //         const updatedTasks = [...list];
  //         updatedTasks[index].tasks[index].values = editedTask;
  //         setList(updatedTasks);
  //     }
  // };

  return (
    <div className='w-full h-full p-5'>
      <div className='w-full h-full bg-white flex flex-col justify-center rounded-md p-3'>
        <div className='h-10 flex justify-between'>
          <div>ToDo:</div>
        </div>
        {/* ADD LIST */}
        <AddList />

        {/* TASK LIST */}
        <div className='h-full space-y-3'>
          {list.length > 0 ? (
            list.map((item, index) => (
              <div
                key={index}
                className='flex justify-center items-center p-3 rounded-md bg-neutral-300'
              >
                {/* list detail */}
                <Dialog>
                  <DialogTrigger className='w-full text-left'>
                    <h3>{item.title}</h3>
                    <div>
                      {item.tasks.length > 0 ? (
                        <div key={index} className='flex flex-col'>
                          {item.tasks[0]}
                        </div>
                      ) : (
                        'no task' // IF NO TASK
                      )}
                    </div>
                  </DialogTrigger>
                  <DialogContent>
                    <h2>{item.title}</h2>
                    {item.tasks[0].length > 0 ? ( // need fix
                      // LIST OF TASK W/ CHECKBOX
                      item.tasks.map((task, index) => (
                        <div key={index} className='flex justify-between'>
                          <p>{task}</p>
                          {/* when tick, crossout text */}
                          <input type='checkbox' name={`task`} />
                        </div>
                      ))
                    ) : (
                      <p>no task</p> // IF NO TASK
                    )}
                    <DialogClose>close</DialogClose>
                  </DialogContent>
                </Dialog>
                {/* EDIT AND DELETE BTNS */}
                <div className='flex space-x-3 items-center'>
                  {/* EDIT LIST */}
                  <EditList />
                  {/* REMOVE LIST */}
                  <button
                    onClick={() => deleteList(index)}
                    className='bg-red-500 text-white rounded-sm size-8'
                  >
                    <Trash />
                  </button>
                </div>
              </div>
            ))
          ) : (
            // IF NO TASK LIST
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
