'use client';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Edit, Trash } from 'lucide-react';
import React, { useState } from 'react';

const Task = () => {
  interface ListItem {
    id: number;
    title: string;
    detail: string;
  }

  const [userInput, setUserInput] = useState({ title: '', detail: '' });
  const [list, setList] = useState<ListItem[]>([]);

  // Set a user Title n Detail value
  const updateTask = (field: string, value: string) => {
    setUserInput((prevUserInput) => ({
      ...prevUserInput,
      [field]: value,
    }));
  };

  // Add item
  const addItem = () => {
    if (userInput.title && userInput.detail !== '') {
      const userItem = {
        // Add a random id
        id: Math.random(),

        // Add a user value to list
        title: userInput.title,
        detail: userInput.detail,
      };

      // Update list
      setList([...list, userItem]);

      // Reset state
      setUserInput({ title: '', detail: '' });
    }
  };

  // Delete Task
  const deleteItem = (key: number) => {
    const updatedList = list.filter((item) => item.id !== key);
    setList(updatedList);
  };

  return (
    <div className='w-full h-full p-5'>
      <div className='w-full h-full bg-white flex flex-col justify-center rounded-md p-3'>
        <div className='h-10 flex justify-between'>
          <div>ToDo:</div>
        </div>

        <Dialog>
          <DialogTrigger className='fixed bottom-8 right-8 bg-pink-300 size-14 rounded-md'>
            +
          </DialogTrigger>
          <DialogContent>
            <div className='w-full space-y-3'>
              <div className='flex  space-x-3 items-center'>
                <p>Title:</p>
                <input
                  type='text'
                  value={userInput.title}
                  onChange={(item) => updateTask('title', item.target.value)}
                  placeholder='Add task here'
                  className='border-2 p-1'
                />
              </div>
              <div className='flex flex-col space-y-3'>
                <p>Detail:</p>
                <input
                  value={userInput.detail}
                  onChange={(item) => updateTask('detail', item.target.value)}
                  placeholder='Add details here'
                  className='border-2 p-1'
                />
              </div>
            </div>
            <div className='w-full flex items-center justify-center'>
              <DialogClose onClick={addItem} className='p-1 w-16 border '>
                Add
              </DialogClose>
            </div>
          </DialogContent>
        </Dialog>

        {/* TASK LIST */}
        <div className='h-full space-y-3'>
          {list.length > 0 ? (
            list.map((item, index) => (
              <div
                key={index}
                className='flex justify-between px-3 py-1 rounded-md border-2'
              >
                {/* CONTENT */}
                {/* TODO - onclick open smtg ? POPOUT : DROPDOWN */}
                <div className='w-full  border-2'>
                  <div>{item.title}</div>
                  <div>{item.detail}</div>
                </div>
                {/* BTNS */}
                <div className='flex space-x-3 items-center'>
                  <button className='bg-green-800 text-white p-1 rounded-sm size-8'>
                    <Edit />
                  </button>
                  <button
                    onClick={() => deleteItem(item.id)}
                    className='bg-red-500 text-white p-1 rounded-sm size-8'
                  >
                    <Trash />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className='flex justify-center items-center'>
              <p>No task</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Task;
