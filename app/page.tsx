import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className='w-screen h-screen flex justify-center pt-24 md:pt-0 bg-bezel'>
      <div
        className='
      w-full h-1/2 flex flex-col items-center justify-center 
      md:w-1/2 md:h-full md:justify-start'
      >
        {/* <Image
          src='/assets/10848390_2152.jpeg'
          alt='logo'
          width={500}
          height={500}
        /> */}
        <p className='w-96 h-96 text-center flex justify-center items-center'>
          LOGO HERE
        </p>
        <div
          className='
        flex flex-col w-1/2 items-center space-y-5
        md:flex-row md:justify-center md:space-x-5 md:space-y-0 md:w-1/3'
        >
          <div className='flex md:flex-col justify-between'>
            <Link href='/focus'>
              <button className='blue-btn w-40 h-14'>Focus</button>
            </Link>
          </div>
          <div className='flex md:flex-col justify-between'>
            <Link href='/planner'>
              <button className='red-btn w-40 h-14'>Planner</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
