'use client';

import { Check, X } from 'lucide-react';
import React, { useState } from 'react';

const Test = () => {
  const [isButtonChecked, setIsButtonChecked] = useState(false);
  const [btnresult, setbtnResult] = useState<string>('');

  const handleClick = (cond: any) => {
    setIsButtonChecked((prev) => !prev);
    if (isButtonChecked == true) {
      setbtnResult('true'); //
    } else {
      setbtnResult('false');
    }
  };
  return (
    <div className='bg-black h-screen w-screen'>
      {/* <h1 className='text-white'>TESTING Test</h1>
      <button
        className={`button ${isButtonChecked ? 'red-btn' : 'green-btn'}`}
        onClick={handleClick}
      >
        {isButtonChecked ? <X values='false' /> : <Check values='true' />}
      </button>
      <h1 className='text-white'>{btnresult}</h1> */}
    </div>
  );
};

export default Test;
