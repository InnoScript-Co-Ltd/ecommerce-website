'use client'
import React, { useEffect, useState } from 'react'
import "./header.css"
import Image from 'next/image'
import Logo from "../../public/logo.svg"
import Search from "../../public/search.svg"
import Link from "../../public/link.svg";
import User from "../../public/user.svg";
import flag from "../../public/flag.svg";
import ShopBag from "../../public/shop_bag.svg"
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross1 } from "react-icons/rx";
import { Link as scrollLink } from "react-scroll";
import { useRouter } from 'next/navigation'


export const Header = () => {

  const [mobile, setMobile] = useState(false);
  const [scroll, setScroll] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const scrollHandler = () => {
      if (window.scrollY >= 100) {
        setScroll(false);
      } else {
        setScroll(true);
      }
    };

    window.addEventListener("scroll", scrollHandler);

    // Cleanup the event listener
    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  return (
    <>
      {/* top banner animation */}
      <div className="top-bar h-[24px]">
        <div className="scrolling-text-one font-bold text-xs leading-3 tracking-wider">
          <span>2 FOR USD30 ON ALL PREMIUM ESSENTIALS</span>
          <span>2 FOR USD30 ON ALL PREMIUM ESSENTIALS</span>
          <span>2 FOR USD30 ON ALL PREMIUM ESSENTIALS</span>
          <span>2 FOR USD30 ON ALL PREMIUM ESSENTIALS</span>
        </div>

        <div className="scrolling-text-two font-bold text-xs leading-3 tracking-wider">
          <span>2 FOR USD30 ON ALL PREMIUM ESSENTIALS</span>
          <span>2 FOR USD30 ON ALL PREMIUM ESSENTIALS</span>
          <span>2 FOR USD30 ON ALL PREMIUM ESSENTIALS</span>
          <span>2 FOR USD30 ON ALL PREMIUM ESSENTIALS</span>
        </div>
      </div>

      {/* for upper screen */}
      <div className={` ${scroll ? '' : 'animate-slideDown'} hidden lg:block w-full h-[82px] bg-primary text-white`}>

        <div className="h-full grid grid-cols-2">
          <div className=' h-full flex justify-end'>

            <div className=' w-[300px] flex justify-between items-center'>

              <ul className=' flex justify-start items-center gap-7 font-bold text-[16px] leading-3'>
                <li className=' cursor-pointer' >New In</li>
                <li className=' cursor-pointer' onClick={() => router.push('/shop')}>Shop</li>
              </ul>

              <div onClick={() => router.replace('/')} className=' translate-x-10'>
                <Image src={Logo} alt="WinKhin Logo" />
              </div>

            </div>

          </div>

          <div className=' flex justify-end items-center'>

            <ul className=' flex justify-start items-center gap-7 font-bold text-[16px] leading-3'>
              <li className=' cursor-pointer' onClick={() => router.push('/about')}>About</li>
              <li className=' cursor-pointer'>Contact Us</li>
            </ul>

            <div className=' w-[350px] flex items-center justify-end'>

              <ul className=' pr-10 flex justify-start items-center gap-5 font-bold text-[16px] leading-3'>
                <li>
                  <Image src={Search} alt="Search icon" />
                </li>
                <li>
                  <Image src={Link} alt="link icon" />
                </li>
                <li>
                  <Image src={User} alt="user icon" />
                </li>
                <li>
                  <Image src={flag} alt="flag icon" />
                </li>
                <li>
                  <Image src={ShopBag} alt="shop bag icon" />
                </li>
              </ul>

            </div>

          </div>
        </div>

      </div>

      {/* for mobile screen */}
      <div className={`${scroll ? '' : ' animate-slideDown'} lg:hidden w-full h-[82px] bg-primary flex-between px-[20px] transition duration-1000 ease-in-out`}>

        <div  onClick={() => router.replace('/')}>
          <Image src={Logo} alt="WinKhin Logo" />
        </div>

        <div onClick={() =>  setMobile(!mobile)} className=' text-white cursor-pointer'>
          <GiHamburgerMenu size={25} />
        </div>

        <div className={`${mobile ? ' animate-slideUpOpen' : 'animate-slideUpClose'} fixed top-0 left-0 z-10 bg-white backdrop-filter backdrop-blur-lg bg-opacity-30 w-full h-[100vh]`}>

          <div onClick={() => setMobile(!mobile)} className='  text-white mt-[30px] pr-[20px] flex items-center justify-end'>
            <RxCross1 size={25} />
          </div>

          <div>

            <ul className=' px-[30px] pt-[50px] text-white font-bold flex flex-col gap-3'>

              <li className=' cursor-pointer hover:text-primary transition duration-300 ease-in-out'>
                <p>
                  New In
                </p>
              </li>

              <li onClick={() => router.push('/shop')} className=' cursor-pointer hover:text-primary transition duration-300 ease-in-out'>
                <p>
                  Shop
                </p>
              </li>

              <li className=' cursor-pointer hover:text-primary transition duration-300 ease-in-out'>
                <p>
                  About
                </p>
              </li>

              <li className=' cursor-pointer hover:text-primary transition duration-300 ease-in-out'>
                <p>
                  Contact Us
                </p>
              </li>

            </ul>

          </div>

        </div>

      </div>


    </>
  )
}
