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
  interface ToDoItem {
    title: string;
    tasks: string[];
  }

  const [userTitleInput, setUserTitleInput] = useState<string>('');
  const [userTaskInput, setUserTaskInput] = useState<string[]>([]);
  const [list, setList] = useState<ToDoItem[]>([]);

  // Add ToDo item
  const addItem = () => {
    if (userTitleInput !== '') {
      const newTask: ToDoItem = {
        title: userTitleInput,
        tasks: userTaskInput,
      };
      console.log(newTask);

      setList([...list, newTask]);

      // Clear the input after adding the item
      setUserTitleInput('');
      setUserTaskInput([]);
      console.log('list', list);
    }
  };

  const addTask = () => {
    setUserTaskInput([...userTaskInput, '']);
  };

  const updateTask = (index: number, value: string) => {
    const updatedTasks = [...userTaskInput];
    updatedTasks[index] = value;
    setUserTaskInput(updatedTasks);
  };

  const deleteItem = (index: number) => {
    setUserTaskInput(userTaskInput.filter((_, i) => i !== index));
  };

  const deleteList = (index: number) => {
    setList(list.filter((_, i) => i !== index));
  };

  return (
    <div className='w-full h-full p-5'>
      <div className='w-full h-full bg-white flex flex-col justify-center rounded-md p-3'>
        <div className='h-10 flex justify-between'>
          <div>ToDo:</div>
        </div>
        {/* ADD LIST */}
        <Dialog>
          {/* ADD LIST BTN */}
          <DialogTrigger
            onClick={() => {
              if (userTaskInput.length === 0) {
                addTask();
              }
            }}
            className='fixed bottom-8 right-8 bg-pink-300 size-14 rounded-md'
          >
            +
          </DialogTrigger>
          {/* ADD LIST FORM */}
          <DialogContent>
            <div className='w-full space-y-3'>
              <h2 className='flex items-center justify-center'>ToDo</h2>
              {/* FORM TITLE */}
              <div className='flex  space-x-3 items-center'>
                <p>Title:</p>
                <input
                  type='text'
                  value={userTitleInput}
                  onChange={(e) => setUserTitleInput(e.target.value)}
                  placeholder='Add title here'
                  className='border-2 p-1'
                />
              </div>
              {/* FORM DETAIL */}
              <div className='flex flex-col space-y-3'>
                <div className='flex justify-between items-center'>
                  <p>Task(s):</p>
                </div>

                {/* TASK LIST */}
                {userTaskInput.map((task, index) => (
                  <div
                    key={index}
                    className='flex justify-between items-center'
                  >
                    {/* TASK DETAIL */}
                    <input
                      value={task}
                      onChange={(e) => updateTask(index, e.target.value)}
                      placeholder='Add details here'
                      className='border-2 p-1 w-10/12'
                    />
                    {/* DELETE TASK */}
                    <button
                      onClick={() => deleteItem(index)}
                      className='p-1 size-8 rounded-md bg-red-500'
                    >
                      -
                    </button>
                  </div>
                ))}

                {/* ADD TASK BTN */}
                <button
                  onClick={addTask}
                  className='p-1 rounded-md bg-lime-500'
                >
                  more task
                </button>
              </div>
            </div>
            <div className='w-full flex items-center justify-center'>
              {/* ADD FORM TO LIST BTN */}
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
                className='flex justify-center items-center p-3 rounded-md bg-neutral-300'
              >
                <Dialog>
                  <DialogTrigger className='w-full text-left'>
                    <h3>{item.title}</h3>
                    <div>
                      {item.tasks.length > 0 ? (
                        <div key={index} className='flex flex-col'>
                          {item.tasks[0]} {/* IF HAVE TASK */}
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
                  <Dialog>
                    <DialogTrigger className='bg-green-500 text-white p-1 rounded-sm size-8'>
                      <Edit />
                    </DialogTrigger>
                    <DialogContent>
                      <div className='w-full space-y-3'>
                        <h2 className='flex items-center justify-center'>
                          Edit
                        </h2>
                        {/* FORM TITLE */}
                        <div className='flex  space-x-3 items-center'>
                          <p>Title:</p>
                          <input
                            type='text'
                            value={item.title}
                            // onChange={(e) => setUserTitleInput(e.target.value)}
                            placeholder='Add title here'
                            className='border-2 p-1'
                          />
                        </div>
                        {/* FORM DETAIL */}
                        <div className='flex flex-col space-y-3'>
                          <div className='flex justify-between items-center'>
                            <p>Task(s):</p>
                          </div>

                          {/* TASK LIST */}
                          {item.tasks.map((task, index) => (
                            <div
                              key={index}
                              className='flex justify-between items-center'
                            >
                              {/* TASK DETAIL */}
                              <input
                                value={task}
                                // onChange={(e) =>
                                //   updateTask(index, e.target.value)
                                // }
                                placeholder='Add details here'
                                className='border-2 p-1'
                              />
                              {/* DELETE TASK */}
                              <button
                                onClick={() => deleteItem(index)}
                                className='p-1 size-8 rounded-md bg-neutral-500'
                              >
                                -
                              </button>
                            </div>
                          ))}

                          {/* ADD TASK BTN */}
                          <button
                            onClick={addTask}
                            className='p-1 rounded-md bg-neutral-500'
                          >
                            more task
                          </button>
                        </div>
                      </div>
                      <div className='w-full flex items-center justify-center'>
                        {/* ADD FORM TO LIST BTN */}
                        <DialogClose
                          onClick={addItem}
                          className='p-1 w-16 border '
                        >
                          Add
                        </DialogClose>
                      </div>
                    </DialogContent>
                  </Dialog>
                  {/* REMOVE LIST */}
                  <button
                    onClick={() => deleteList(index)}
                    className='bg-red-500 text-white p-1 rounded-sm size-8'
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
};

export default Task;
