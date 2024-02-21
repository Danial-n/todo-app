import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Edit } from 'lucide-react';
import React, { useState } from 'react';
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
    updatedTasks[index] = { ...updatedTasks[index], description: newTask };
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

        {/* ADD TASK BTN */}
        <button onClick={addTask} className='blue-btn'>
          more tasks
        </button>
      </div>
    );
  };

  return (
    <div className='w-full space-y-3'>
      <div className=''>
        <h2 className='flex items-center justify-center'>Edit</h2>
        {formTitle()}
        {formDetail()}
      </div>
      <div className='w-full flex items-center justify-center'>
        {/* ADD FORM TO LIST BTN */}
        <DialogClose onClick={editList} className='yellow-btn w-16'>
          Save
        </DialogClose>
      </div>
    </div>
  );
});

export default EditList;
