'use client';

import { DialogClose } from '@/components/ui/dialog';
import React, { useEffect, useState } from 'react';
import taskStore, { TaskItem } from './taskStore';
import { observer } from 'mobx-react';

const EditList = observer(() => {
  const storeList = taskStore.list;
  const selectedIndex = taskStore.selectedIndex;
  const [title, setTitle] = useState<string>(storeList[selectedIndex].title);
  const [task, setTask] = useState<TaskItem[]>(storeList[selectedIndex].tasks);

  const editTitle = (newTitle: string) => {
    setTitle(newTitle);
    console.log(title);
  };

  const editTask = (newTask: string, index: number) => {
    const updatedTasks = [...task];
    if (newTask.trim() !== '') {
      updatedTasks[index] = { ...updatedTasks[index], description: newTask };
    } else {
      updatedTasks.splice(index, 1);
    }
    setTask(updatedTasks);
    console.log(task);
  };

  const addTask = () => {
    setTask([...task, { description: '' }]);
  };

  const deleteItem = (index: number) => {
    setTask(task.filter((_, i) => i !== index));
  };

  const editList = () => {
    storeList[selectedIndex].title = title;
    storeList[selectedIndex].tasks = task;
    taskStore.setList(storeList);
  };

  useEffect(() => {
    const scrollContainer = document.getElementById('taskListContainer'); // add an ID to the task list container

    if (scrollContainer) {
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    }
  }, [task]);

  const formTitle = () => {
    return (
      <div className='w-full flex flex-row space-x-3 justify-start items-center'>
        <p>Title:</p>
        <input
          type='text'
          value={title}
          onChange={(e) => editTitle(e.target.value)}
          placeholder='Add title here'
        />
      </div>
    );
  };

  const formDetail = () => {
    return (
      <div className='w-full flex flex-col space-y-3'>
        <div className='w-full flex justify-between items-center'>
          <p>Task(s):</p>
        </div>
        {/* TASK LIST */}
        <div
          id='taskListContainer'
          className='w-full max-h-44 p-1 overflow-scroll no-scrollbar space-y-5'
        >
          {task.map((tasks, taskIndex: number) => (
            <div key={taskIndex} className='flex justify-between items-center'>
              {/* TASK INPUT */}
              <input
                value={tasks.description}
                onChange={(e) => editTask(e.target.value, taskIndex)}
                placeholder='Add details here'
                className='border-2  w-10/12'
              />
              {/* DELETE TASK */}
              <button
                onClick={() => {
                  if (task.length != 1) {
                    deleteItem(taskIndex);
                  }
                }}
                className='red-btn size-8'
              >
                -
              </button>
            </div>
          ))}
        </div>

        {/* ADD TASK BTN */}
        <button onClick={addTask} className='blue-btn'>
          more tasks
        </button>
      </div>
    );
  };

  return (
    <div className='w-full h-full flex flex-col justify-center items-center space-y-3 p-3'>
      <h2 className='w-full flex items-center justify-center'>Edit</h2>
      {formTitle()}
      {formDetail()}
      {/* <div className='w-full '> */}
      {/* ADD FORM TO LIST BTN */}
      <DialogClose
        onClick={editList}
        className='yellow-btn w-16 flex items-center justify-center'
      >
        Save
      </DialogClose>
      {/* </div> */}
    </div>
  );
});

export default EditList;
