import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Edit } from 'lucide-react';
import React, { useState } from 'react';
import taskStore from './taskStore';
import { observer } from 'mobx-react';

const EditList = observer(() => {
  const list = taskStore.list;
  const selectedIndex = taskStore.selectedIndex;

  const editList = (index: number, title: string) => {
    list[index].title = title;
    // const updatedTasks = [...taskStore.userTaskInput];
    // updatedTasks[index] = task;
    taskStore.setUserTitleInput(list[index].title);
    taskStore.setUserTaskInput([...list[index].tasks]);
  };

  // const addTask = () => {
  //   taskStore.setUserTaskInput([...taskStore.userTaskInput, '']);
  // };

  // const updateTask = (index: number, value: string) => {
  //   const updatedTasks = [...userTaskInput];
  //   updatedTasks[index] = value;
  //   setUserTaskInput(updatedTasks);
  // }

  // const addTask = () => {
  //   if (editingIndex !== null) {
  //     // If editing, update the existing task
  //     const updatedList = [...storeList];
  //     updatedList[editingIndex] = {
  //       title: userTitleInput,
  //       tasks: userTaskInput,
  //     };
  //     setList(updatedList);

  //     taskStore.setEditingIndex(null);
  //   } else {
  //     // If not editing, add a new task
  //     setUserTaskInput([...userTaskInput, '']);
  //   }
  // };

  // const updateTask = (index: number, value: string) => {
  //   const updatedTasks = [...userTaskInput];
  //   updatedTasks[index] = value;
  //   setUserTaskInput(updatedTasks);
  // };

  return (
    <Dialog>
      <DialogTrigger className='bg-green-500 text-white  rounded-sm size-8'>
        <Edit />
      </DialogTrigger>
      <DialogContent>
        <div className='w-full space-y-3'>
          <h2 className='flex items-center justify-center'>Edit</h2>
          {/* FORM TITLE */}
          <div className='flex  space-x-3 items-center'>
            <p>Title:</p>
            <input
              key={selectedIndex}
              type='text'
              value={list[selectedIndex].title}
              onChange={(e) => editList(selectedIndex, e.target.value)}
              placeholder='Add title here'
            />
          </div>
          {/* FORM DETAIL */}
          <div className='flex flex-col space-y-3'>
            <div className='flex justify-between items-center'>
              <p>Task(s):</p>
            </div>

            {/* TASK LIST */}
            {list[selectedIndex].tasks.map((item: string, taskIndex: any) => (
              <div
                key={taskIndex}
                className='flex justify-between items-center'
              >
                {/* TASK INPUT */}
                <input
                  value={item}
                  // onChange={handleTitle}
                  placeholder='Add details here'
                />
                {/* DELETE TASK */}
                <button
                  // onClick={() => deleteItem(index)}
                  className=' size-8 rounded-md bg-neutral-500'
                >
                  -
                </button>
              </div>
            ))}

            {/* ADD TASK BTN */}
            <button
              // onClick={addTask}
              className=' rounded-md bg-neutral-500'
            >
              more task
            </button>
          </div>
        </div>
        <div className='w-full flex items-center justify-center'>
          {/* ADD FORM TO LIST BTN */}
          <DialogClose
            // onClick={() => editList(index)}
            className=' w-16 border '
          >
            Edit
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
});

export default EditList;
