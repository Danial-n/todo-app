import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Edit } from 'lucide-react';
import React from 'react';

const EditList = () => {
  return (
    <Dialog>
      <DialogTrigger className='bg-green-500 text-white  rounded-sm size-8'>
        <Edit />
      </DialogTrigger>
      <DialogContent>
        <div className='w-full space-y-3'>
          <h2 className='flex items-center justify-center'>Edit</h2>
          {/* FORM TITLE */}
          <div className='flex  space-x-3 items-center'>
            <p>Title:</p>
            <input
              type='text'
              // value={userTitleInput}
              // onChange={(e) => setUserTitleInput(e.target.value)}
              placeholder='Add title here'
            />
          </div>
          {/* FORM DETAIL */}
          <div className='flex flex-col space-y-3'>
            <div className='flex justify-between items-center'>
              <p>Task(s):</p>
            </div>

            {/* TASK LIST */}

            {/* ADD TASK BTN */}
            <button
              // onClick={addTask}
              className=' rounded-md bg-neutral-500'
            >
              more task
            </button>
          </div>
        </div>
        <div className='w-full flex items-center justify-center'>
          {/* ADD FORM TO LIST BTN */}
          <DialogClose
            // onClick={() => editList(index)}
            className=' w-16 border '
          >
            Add
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};
// {item.tasks.map((task, index) => (
//                             <div
//                               key={index}
//                               className='flex justify-between items-center'
//                             >
//                               {/* TASK DETAIL */}
//                               <input
//                                 value={userTaskInput}
//                                 onChange={(e) =>
//                                   // updateTask(index, e.target.value)
//                                 }
//                                 placeholder='Add details here'
//                               />
//                               {/* DELETE TASK */}
//                               <button
//                                 // onClick={() => deleteItem(index)}
//                                 className=' size-8 rounded-md bg-neutral-500'
//                               >
//                                 -
//                               </button>
//                             </div>
//                           ))}
export default EditList;
