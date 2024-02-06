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
    detail: string[];
  }
  interface TaskItem {
    taskId: number;
    taskDetail: string[];
  }

  const [userInput, setUserInput] = useState({ title: '', detail: [] });
  const [list, setList] = useState<ListItem[]>([]);

  const [taskInput, setTaskInput] = useState({ taskDetail: [''] });
  const [task, setTask] = useState<TaskItem[]>([]);

  // Set a user Title n Detail value
  const updateItem = (field: string, value: string) => {
    setUserInput((prevUserInput) => ({
      ...prevUserInput,
      [field]: value,
    }));
  };

  // Add ToDo item
  const addItem = () => {
    if (userInput.title !== '') {
      const userItem = {
        // Add a random id
        id: Math.random(),

        // Add a user value to list
        title: userInput.title,
        detail: taskInput.taskDetail,
      };

      // Update list
      setList([...list, userItem]);

      // Reset state
      setUserInput({ title: '', detail: [] });
    }
  };

  // Delete Todo item
  const deleteItem = (key: number) => {
    const updatedList = list.filter((item) => item.id !== key);
    setList(updatedList);
  };

  const updateTask = (value: string, index: number) => {
    setTaskInput((prevTaskInput) => {
      const updatedTaskDetail = [...prevTaskInput.taskDetail];
      updatedTaskDetail[index] = value;
      return { ...prevTaskInput, taskDetails: updatedTaskDetail };
    });
  };

  // Add ToDo task
  const addTask = () => {
    const userTask = {
      // Add a random id
      taskId: Math.random(),

      // Add a user value to list
      taskDetail: taskInput.taskDetail,
    };

    // Update list
    setTask([...task, userTask]);

    // Reset state
    setTaskInput({ taskDetail: [''] });
  };

  // Delete Task
  const deleteTask = (key: number) => {
    const updatedTask = task.filter((task) => task.taskId !== key);
    setTask(updatedTask);
  };

  return (
    <div className='w-full h-full p-5'>
      <div className='w-full h-full bg-white flex flex-col justify-center rounded-md p-3'>
        <div className='h-10 flex justify-between'>
          <div>ToDo:</div>
        </div>
        <Dialog>
          <DialogTrigger
            onClick={() => {
              if (task.length === 0) {
                addTask();
              }
            }}
            className='fixed bottom-8 right-8 bg-pink-300 size-14 rounded-md'
          >
            +
          </DialogTrigger>
          <DialogContent>
            <div className='w-full space-y-3'>
              <h2 className='flex items-center justify-center'>ToDo</h2>
              <div className='flex  space-x-3 items-center'>
                <p>Title:</p>
                <input
                  type='text'
                  value={userInput.title}
                  onChange={(item) => updateItem('title', item.target.value)}
                  placeholder='Add title here'
                  className='border-2 p-1'
                />
              </div>
              <div className='flex flex-col space-y-3'>
                <div className='flex justify-between items-center'>
                  <p>Task(s):</p>
                </div>

                {/* TASK LIST */}
                {task.map((task, index) => (
                  <div
                    key={task.taskId}
                    className='flex justify-between items-center'
                  >
                    <input
                      value={userInput.detail[index]}
                      onChange={(item) => updateTask(item.target.value, index)}
                      placeholder='Add details here'
                      className='border-2 p-1'
                    />
                    <button
                      onClick={() => deleteTask(task.taskId)}
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
              <DialogClose onClick={addItem} className='p-1 w-16 border '>
                Add
              </DialogClose>
            </div>
          </DialogContent>
        </Dialog>

        {/* TASK LIST */}
        <div className='h-full space-y-3'>
          {list.length > 0 ? (
            list.map((item) => (
              <div
                key={item.id}
                className='flex justify-between px-3 py-1 rounded-md border-2'
              >
                {/* CONTENT */}
                <div className='w-full  border-2'>
                  <div>{item.title}</div>
                  <div>{item.detail}</div>
                </div>
                {/* BTNS */}
                <div className='flex space-x-3 items-center'>
                  <button className='bg-green-500 text-white p-1 rounded-sm size-8'>
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
