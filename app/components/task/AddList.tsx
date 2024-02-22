import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog';
import { observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import taskStore from './taskStore';

const AddList = observer(() => {
  interface TaskItem {
    description: string;
    condition?: boolean;
  }
  interface ToDoItem {
    title: string;
    tasks: Array<TaskItem>;
  }

  const [userTitleInput, setUserTitleInput] = useState<string>('');
  const [userTaskInput, setUserTaskInput] = useState<string[]>([]);
  const storeList = taskStore.list;

  // Add all item to the list
  const addItem = () => {
    if (userTitleInput !== '') {
      const newTask: ToDoItem = {
        title: userTitleInput,
        tasks: userTaskInput.map((task) => ({ description: task })),
      };
      console.log(newTask);

      taskStore.setList([...storeList, newTask]);

      // Clear the input after adding the item
      setUserTitleInput('');
      setUserTaskInput([]);
      console.log('list', storeList);
    }
  };

  // add more task (within the list)
  const addTask = () => {
    // If not editing, add a new task
    setUserTaskInput([...userTaskInput, '']);
  };

  //compile the task to array
  const updateTask = (index: number, value: string) => {
    const updatedTasks = [...userTaskInput];
    updatedTasks[index] = value;
    setUserTaskInput(updatedTasks);
  };

  const deleteItem = (index: number) => {
    setUserTaskInput(userTaskInput.filter((_, i) => i !== index));
  };

  useEffect(() => {
    const scrollContainer = document.getElementById('taskListContainer'); // add an ID to the task list container

    if (scrollContainer) {
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    }
  }, [userTaskInput]);

  const formTitle = () => {
    return (
      <div className='flex  space-x-3 items-center'>
        <p>Title:</p>
        <input
          type='text'
          value={userTitleInput}
          onChange={(e) => setUserTitleInput(e.target.value)}
          placeholder='Add title here'
        />
      </div>
    );
  };

  const formDetail = () => {
    return (
      <div className='flex flex-col space-y-3'>
        <div className='flex justify-between items-center'>
          <p>Task(s):</p>
        </div>
        <div
          id='taskListContainer'
          className='w-full max-h-44 p-1 overflow-scroll no-scrollbar space-y-5'
        >
          {/* TASK LIST */}
          {userTaskInput.map((task, index) => (
            <div key={index} className='flex justify-between items-center'>
              {/* TASK DETAIL */}
              <input
                value={task}
                onChange={(e) => updateTask(index, e.target.value)}
                placeholder='Add details here'
                className='border-2  w-10/12'
              />
              {/* DELETE TASK */}
              <button
                onClick={() => {
                  if (userTaskInput.length != 1) {
                    deleteItem(index);
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
          more task
        </button>
      </div>
    );
  };

  return (
    <Dialog>
      {/* ADD LIST BTN */}
      <DialogTrigger
        onClick={() => {
          if (userTaskInput.length === 0) {
            addTask();
          }
        }}
        className='flex justify-center items-center add-btn size-14 rounded-md text-white'
      >
        +
      </DialogTrigger>
      {/* ADD LIST FORM */}
      <DialogContent className='flex flex-col justify-center items-center'>
        <div className='w-full space-y-3'>
          <h2 className='flex items-center justify-center'>ToDo</h2>
          {formTitle()}
          {formDetail()}
        </div>
        <div className='w-full flex items-center justify-center'>
          {/* ADD FORM TO LIST BTN */}
          <DialogClose onClick={addItem} className='green-btn w-16'>
            Add
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
});

export default AddList;
