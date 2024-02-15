import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog';
import { observer } from 'mobx-react';
import React, { useState } from 'react';
import taskStore from './taskStore';

const AddList = observer(() => {
  interface ToDoItem {
    title: string;
    tasks: string[];
  }

  const [userTitleInput, setUserTitleInput] = useState<string>('');
  const [userTaskInput, setUserTaskInput] = useState<string[]>([]);
  const [list, setList] = useState<ToDoItem[]>([]);

  const storeList = taskStore.list;
  const editingIndex = taskStore.editingIndex;

  // Add ToDo item list
  const addItem = () => {
    if (userTitleInput !== '') {
      const newTask: ToDoItem = {
        title: userTitleInput,
        tasks: userTaskInput,
      };
      console.log(newTask);

      taskStore.setList([...storeList, newTask]);

      // Clear the input after adding the item
      setUserTitleInput('');
      setUserTaskInput([]);
      console.log('list', list);
    }
  };

  const addTask = () => {
    if (editingIndex !== null) {
      // If editing, update the existing task
      const updatedList = [...storeList];
      updatedList[editingIndex] = {
        title: userTitleInput,
        tasks: userTaskInput,
      };
      setList(updatedList);

      taskStore.setEditingIndex(null);
    } else {
      // If not editing, add a new task
      setUserTaskInput([...userTaskInput, '']);
    }
  };

  const updateTask = (index: number, value: string) => {
    const updatedTasks = [...userTaskInput];
    updatedTasks[index] = value;
    setUserTaskInput(updatedTasks);
  };

  const deleteItem = (index: number) => {
    setUserTaskInput(userTaskInput.filter((_, i) => i !== index));
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
            />
          </div>
          {/* FORM DETAIL */}
          <div className='flex flex-col space-y-3'>
            <div className='flex justify-between items-center'>
              <p>Task(s):</p>
            </div>

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
                  onClick={() => deleteItem(index)}
                  className=' size-8 rounded-md bg-red-500'
                >
                  -
                </button>
              </div>
            ))}

            {/* ADD TASK BTN */}
            <button onClick={addTask} className=' rounded-md bg-lime-500'>
              more task
            </button>
          </div>
        </div>
        <div className='w-full flex items-center justify-center'>
          {/* ADD FORM TO LIST BTN */}
          <DialogClose onClick={addItem} className=' w-16 border '>
            Add
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
});

export default AddList;
