import Link from 'next/link';

export default function Home() {
  return (
    <div className='w-screen h-screen flex justify-center'>
      <div
        className='
      w-full h-1/2 flex flex-col items-center justify-center space-y-10
      md:w-1/2 md:h-full md:space-y-44'
      >
        <h1>Landing Page</h1>
        <div
          className='
        flex flex-col w-1/2
        md:flex-row md:justify-between md:w-1/3'
        >
          <div className='flex md:flex-col justify-between'>
            <h2>Focus</h2>
            <Link href='/focus'>
              <input type='checkbox' />
            </Link>
          </div>
          <div className='flex md:flex-col justify-between'>
            <h2>Planner</h2>
            <Link href='/planner'>
              <input type='checkbox' />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
