'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Home() {
  const [currentColor, setCurrentColor] = useState('red-btn');

  const changeColour = () => {
    const colors = ['blue-btn', 'green-btn', 'yellow-btn', 'red-btn'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setCurrentColor(randomColor);
  };
  return (
    <div className='w-screen h-screen flex justify-center pt-24 md:pt-0 bg-thebackground'>
      <div
        className='
      w-full h-3/4 flex flex-col items-center justify-center  space-y-10
      md:w-1/2 md:h-full md:justify-start'
      >
        <div className='w-96 h-96 text-center text-5xl flex flex-col justify-center items-center space-x-14 space-y-1'>
          <p>THINGS</p>
          <p className={`select-none ${currentColor}`} onClick={changeColour}>
            TO-DO
          </p>
        </div>
        <div
          className='
        flex flex-col w-1/2 items-center space-y-5
        md:flex-row md:justify-center md:space-x-5 md:space-y-0 md:w-1/3'
        >
          <div className='flex md:flex-col justify-between'>
            <Link href='/focus'>
              <button className='blue-btn w-40 h-14'>Enter</button>{' '}
              {/* focus */}
            </Link>
          </div>
          {/* <div className='flex md:flex-col justify-between'>
            <Link href='/planner'>
              <button className='red-btn w-40 h-14'>Planner</button>
            </Link>
          </div> */}
        </div>
      </div>
    </div>
  );
}
