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
      className='flex justify-center items-center p-3 rounded-md bg-neutral-300'
    >
      {/* list detail */}
      <Dialog>
        <DialogTrigger className='w-full text-left'>
          <div className='flex space-x-5'>
            <h3>{item.title}</h3>
            <p>
              {checkedTaskCounts[listIndex]}/{item.tasks.length}
            </p>
          </div>

          <div>
            {item.tasks.length >= 0 && item.tasks[0].description !== '' ? (
              <div className='flex flex-col'>{item.tasks[0].description}</div>
            ) : (
              <div>no task</div> // IF NO TASK
            )}
          </div>
        </DialogTrigger>
        <DialogContent>
          <h2>{item.title}</h2>
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
            className='bg-green-500 text-white  rounded-sm size-8'
          >
            <Edit />
          </DialogTrigger>
          <DialogContent>
            <EditList />
          </DialogContent>
        </Dialog>
        {/* REMOVE LIST */}
        <Dialog>
          <DialogTrigger className='bg-red-500 text-white rounded-sm size-8'>
            <Trash />
          </DialogTrigger>
          <DialogContent className='flex flex-col justify-center items-center'>
            Remove List?
            <div className='flex space-x-5'>
              <DialogClose
                onClick={() => deleteList(listIndex)}
                className='alertbtn'
              >
                Yes
              </DialogClose>
              <DialogClose>No</DialogClose>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  ));
});

export default TaskCard;
