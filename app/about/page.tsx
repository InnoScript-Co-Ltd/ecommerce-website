import React, { Suspense } from 'react'
import Image from 'next/image'
import Profile from "../../public/hero_bg.jpeg"
import fourBg from "../../public/about-one.jpeg"
import second from "../../public/about-two.jpeg"
import One from "../../public/about-three.jpeg"
import Two from "../../public/shop_detail_four_bg.jpeg"
import detail from "../../public/shop_detail_two_bg.jpeg"
import ELLIPSE from "../../public/ellipse.png"
import LOGO from "../../public/logoblack.png"
import NextLink from "next/link"
import Loading from '../loading'

const page = () => {
  return (
    <Suspense fallback={<Loading />}>

      <div className=' w-full'>

        <div className=' w-full h-[500px] md:h-auto relative'>
          <Image
            src={Profile}
            width={0}
            height={0}
            sizes="100vw"
            className=' w-full h-full'
            alt='winy'
          />
          <div className='absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]'>
            <h1 className=' text-pink-50 font-bold text-[30px] md:text-[55px] text-center'>Desgin <br /> for humans</h1>
            <div className=' flex items-center justify-center mt-[20px]'>
              <button className=' w-[150px] md:w-[200px] h-[56px] font-semibold flex items-center justify-center text-white bg-primary'>
                Explore More
              </button>
            </div>
          </div>

        </div>

      </div>

      <div className=' p-10'>
        <h1 className=' text-xl md:text-4xl font-medium'>
          Kusa redefines make-up training and certifications with online courses to help you transform your professional make-up artist journey.
        </h1>
        <button className=' w-[150px] md:w-[200px] h-[56px] mt-[20px] font-semibold flex items-center justify-center text-white bg-primary'>
          Explore More
        </button>
        <div className=' h-[2px] w-full bg-black-50 mt-[50px]'></div>
      </div>

      {/* Start course  */}
      <div className=' w-full'>
        <h1 className=' text-3xl md:text-5xl font-semibold text-center'>Courses for all artists.</h1>
        <div className=' flex items-center justify-center'>
          <p className=' w-[300px] text-center font-semibold text-slate-700 mt-[20px]'>Introduce your lessons with an optional, short summary. It all begins with an idea.</p>
        </div>

        <div className=' grid grid-cols-2 px-[40px] mt-[80px] gap-5 md:gap-0'>
          <div className=' col-start-1 col-span-2 md:col-span-1 relative'>
            <Image
              src={fourBg}
              width={0}
              height={0}
              sizes="100vw"
              className=' w-full min-h-[600px]'
              alt='winy'
            />

            <h1 className=' text-4xl font-medium mt-5'>Red Carpet Chic</h1>
            <p className=' text-lg text-slate-700'>INSTRUCTOR: JAYA DIXON</p>
          </div>
          <div className=' col-start-1 md:col-start-2 col-span-2 md:col-span-1'>
            <div className=' w-full md:w-[80%] ml-auto'>
              <Image
                src={second}
                width={0}
                height={0}
                sizes="100vw"
                className=' w-full h-[700px]'
                alt='winy'
              />
              <h1 className=' text-4xl font-medium mt-5'>Red Carpet Chic</h1>
              <p className=' text-lg text-slate-700'>INSTRUCTOR: JAYA DIXON</p>
            </div>
          </div>
        </div>

        <div className=' w-full px-[40px] mt-[20px] md:mt-0'>
          <div className=' w-full md:w-[500px] ml-auto'>
            <Image
              src={One}
              width={0}
              height={0}
              sizes="100vw"
              className=' w-full h-[550px]'
              alt='winy'
            />
            <h1 className=' text-4xl font-medium mt-5'>Red Carpet Chic</h1>
            <p className=' text-lg text-slate-700'>INSTRUCTOR: JAYA DIXON</p>
          </div>
        </div>

        <div className=' grid grid-cols-2 p-[40px] mt-[40px] bg-yellow-200 gap-5 md:gap-0'>

          <div className=' col-span-2 md:col-span-1 col-start-1 flex items-center justify-start'>
            <div className=' w-[300px]'>
              <h1 className=' text-5xl font-semibold'>Nice to meet you. I’m Winy</h1>
              <p className=' mt-5 text-slate-700 mb-5'>It all begins with an idea. Maybe you want to launch a business. Maybe you want to turn a hobby into something more. Or maybe you have a creative project to share with the world.</p>
              <button className=' w-[150px] h-[56px] mt5 bg-slate-900 text-white flex items-center justify-center font-semibold'>Contact Me</button>
            </div>

          </div>
          <div className=' col-span-2 md:col-span-1 col-start-1 md:col-start-2'>
            <div className=' w-full md:w-[80%] ml-auto'>
              <Image
                src={Two}
                width={0}
                height={0}
                className=' w-full h-[600px]'
                alt='winy'
              />
            </div>
          </div>

        </div>

        <div className=' grid grid-cols-2 p-[40px] mt-[0px] gap-5 md:gap-0'>

          <div className=' col-span-2 md:col-span-1 col-start-1'>
            <div className=' w-full md:w-[80%] mr-auto'>
              <Image
                src={detail}
                width={0}
                height={0}
                className=' w-full h-[600px]'
                alt='winy'
              />
            </div>
          </div>

          <div className=' col-span-2 col-start-1 md:col-span-1 md:col-start-2 flex items-center justify-end'>
            <div className=' w-[300px]'>
              <h1 className=' text-5xl font-semibold'>Portfolio Gallery</h1>
              <p className=' mt-5 text-slate-700 mb-5'>
                It all begins with an idea. Maybe you want to launch a business. Maybe you want to turn a hobby into something more. Or maybe you have a creative project to share with the world. Whatever it is, the way you tell your story online can make all the difference.
              </p>
              <button className=' w-[150px] h-[56px] mt5 bg-slate-900 text-white flex items-center justify-center font-semibold uppercase'>See More</button>
            </div>

          </div>

        </div>

      </div>

    </Suspense>
  )
}

export default page