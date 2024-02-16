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
  const storeList = taskStore.list;
  const selectedIndex = taskStore.selectedIndex;
  const [title, setTitle] = useState<string>(storeList[selectedIndex].title);
  const [task, setTask] = useState<string[]>(storeList[selectedIndex].tasks);

  const editTitle = (newTitle: string) => {
    setTitle(newTitle);
    console.log(title);
  };

  const editTask = (newTask: string, index: number) => {
    const updatedTasks = [...task];
    updatedTasks[index] = newTask;
    setTask(updatedTasks);
    console.log(task);
  };

  const editList = () => {
    storeList[selectedIndex].title = title;
    storeList[selectedIndex].tasks = task;
    taskStore.setList(storeList);
  };

  const formTitle = () => {
    return (
      <div className='flex  space-x-3 items-center'>
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
      <div className='flex flex-col space-y-3'>
        <div className='flex justify-between items-center'>
          <p>Task(s):</p>
        </div>
        {/* TASK LIST */}
        {storeList[selectedIndex].tasks.map((taskIndex: any) => (
          <div key={taskIndex} className='flex justify-between items-center'>
            {/* TASK INPUT */}
            <input
              value={task}
              onChange={(e) => editTask(e.target.value, taskIndex)}
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
        <button className=' rounded-md bg-neutral-500'>more tasks</button>
      </div>
    );
  };

  return (
    <Dialog>
      <DialogTrigger className='bg-green-500 text-white  rounded-sm size-8'>
        <Edit />
      </DialogTrigger>
      <DialogContent>
        <div className='w-full space-y-3'>
          <h2 className='flex items-center justify-center'>Edit</h2>
          {formTitle()}
          {formDetail()}
        </div>
        <div className='w-full flex items-center justify-center'>
          {/* ADD FORM TO LIST BTN */}
          <DialogClose onClick={editList} className='w-16 border'>
            Edit
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
});

export default EditList;
