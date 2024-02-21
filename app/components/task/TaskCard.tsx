import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Edit, Trash } from 'lucide-react';
import EditList from './EditList';
import taskStore from './taskStore';
import { observer } from 'mobx-react';

const TaskCard = observer(() => {
  const list = taskStore.list;

  const [checkedTaskCounts, setCheckedTaskCounts] = useState<number[]>([]);

  useEffect(() => {
    const initialCounts = list.map(
      (item) => item.tasks.filter((task) => task.condition).length
    );
    setCheckedTaskCounts(initialCounts);
  }, [list]);

  const deleteList = (index: number) => {
    const newList = list.filter((_, i) => i !== index);
    taskStore.setList(newList);
  };

  const handleIndex = (index: number) => {
    taskStore.setSelectedIndex(index);
  };

  const dustedTask = (listIndex: number, taskIndex: number, checkbox: any) => {
    const updatedList = [...list];
    const updatedTaskItem = {
      ...updatedList[listIndex].tasks[taskIndex],
      condition: checkbox,
    };
    updatedList[listIndex].tasks[taskIndex] = updatedTaskItem; // update changes
    taskStore.setList(updatedList); // update condition to localstorage

    setCheckedTaskCounts((prevCounts) => {
      const newCounts = [...prevCounts];
      const count = updatedList[listIndex].tasks.filter(
        (task) => task.condition
      ).length;
      newCounts[listIndex] = count;
      return newCounts;
    });
  };

  return list.map((item, listIndex) => (
    <div
      key={listIndex}
      className='flex justify-center items-center p-3 rounded-md thebezelplus space-x-5 h-24'
    >
      {/* list detail */}
      <Dialog>
        <DialogTrigger className='w-11/12 text-left bg-screen rounded-sm pl-3 flex justify-between'>
          <div>
            <div className='flex space-x-5'>
              <h3>{item.title}</h3>
            </div>
            <div>
              {item.tasks.length >= 0 && item.tasks[0].description !== '' ? (
                <div className='flex flex-col'>{item.tasks[0].description}</div>
              ) : (
                <div>no task</div> // IF NO TASK
              )}
            </div>
          </div>
          <div className='flex justify-center items-center pr-3 font-bold text-2xl'>
            {item.tasks[0].description !== '' ? (
              <p>
                {checkedTaskCounts[listIndex] > item.tasks.length
                  ? checkedTaskCounts[listIndex] - 1
                  : checkedTaskCounts[listIndex]}
                /{item.tasks.length}
              </p>
            ) : (
              ''
            )}
          </div>
        </DialogTrigger>
        <DialogContent>
          <h2 className='text-center'>{item.title}</h2>
          {item.tasks.length >= 0 && item.tasks[0].description !== '' ? (
            // LIST OF TASK W/ CHECKBOX
            item.tasks.map((task, taskIndex) => (
              <div key={taskIndex} className='flex justify-between'>
                <p className={task.condition ? 'line-through opacity-30' : ''}>
                  {task.description}
                </p>
                <input
                  type='checkbox'
                  name={`list - ${listIndex} / task - ${taskIndex}`}
                  checked={task.condition}
                  onChange={(e) =>
                    dustedTask(listIndex, taskIndex, e.target.checked)
                  }
                />
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
          <DialogTrigger
            onClick={() => handleIndex(listIndex)}
            className='yellow-btn'
          >
            <Edit />
          </DialogTrigger>
          <DialogContent>
            <EditList />
          </DialogContent>
        </Dialog>
        {/* REMOVE LIST */}
        <Dialog>
          <DialogTrigger className='red-btn'>
            <Trash />
          </DialogTrigger>
          <DialogContent className='flex flex-col justify-center items-center'>
            Remove List?
            <div className='flex space-x-5'>
              <DialogClose
                onClick={() => deleteList(listIndex)}
                className='neutral-btn w-12'
              >
                Yes
              </DialogClose>
              <DialogClose className='red-btn w-12'>No</DialogClose>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  ));
});

export default TaskCard;
