'use client'
import React, { useCallback, useEffect, useState } from 'react'
import "./header.css"
import Image from 'next/image'
import Logo from "../../public/logo.svg"
import Search from "../../public/search.svg"
import Link from "../../public/link.svg";
import ShopBag from "../../public/shop_bag.svg"
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross1 } from "react-icons/rx";
import NextLink from 'next/link';
import { usePathname } from 'next/navigation'
import { GlobeIcon } from '@radix-ui/react-icons'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { baseURL, endpoints } from '@/constant/endpoints'
import { useAppDispatch, useAppSelector } from '@/helper/hook'
import { keys } from '@/constant/key'
import { addExchange } from '@/services/redux/exchangeSlice'
import { HeartIcon, HeartPulseIcon } from 'lucide-react'

interface EXCHANGE {
  id: number;
  name: string;
  rate: string | number
}


const Header = () => {

  const [mobile, setMobile] = useState(false);
  const [scroll, setScroll] = useState(true);
  const [exchange, setExchange] = useState([]);
  const [checkedExchange, setCheckedExchange] = useState<EXCHANGE>({
    id: 0,
    name: "",
    rate: 0
  });
  const pathName = usePathname();
  const dispatch = useAppDispatch();
  const cartLists = useAppSelector(state => state.cart);
  const favLists = useAppSelector(state => state.fav);

  const fetchExchange = useCallback(async () => {
    const response = await fetch(`${baseURL}${endpoints.exchange}`);
    const data: any = await response.json();

    if (data.data) {
      setExchange(data.data);
    }
  }, [])



  useEffect(() => {
    fetchExchange()
    if (typeof window !== 'undefined') {
      const exchangeLocal = localStorage.getItem(keys.EXCHANGE);
      if (exchangeLocal) {
        const parsedExchange = JSON.parse(exchangeLocal);
        setCheckedExchange(parsedExchange);
        // dispatch(addExchange(parsedExchange));
      }
    }
  }, [fetchExchange])

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
      {/* <div className="top-bar h-[24px]">
        <div className="scrolling-text-one font-bold text-xs leading-3 tracking-wider">
          <span>2 FOR USD30 ON ALL PREMIUM ESSENTIALS</span>
          <span>2 FOR USD30 ON ALL PREMIUM ESSENTIALS</span>
          <span>2 FOR USD30 ON ALL PREMIUM ESSENTIALS</span>
          <span>2 FOR USD30 ON ALL PREMIUM ESSENTIALS</span>
        </div>
      </div> */}

      {/* for upper screen */}
      <div className={` ${scroll ? '' : 'animate-slideDown'} hidden lg:block w-full h-[82px] bg-primary text-white`}>

        <div className="h-full grid grid-cols-2">
          <div className=' h-full flex justify-end'>

            <div className=' w-[300px] flex justify-between items-center'>

              <ul className=' flex justify-start items-center gap-7 font-bold text-[16px] leading-3'>
                <li>
                  <NextLink className={` cursor-pointer ${pathName === '/man' ? 'link-active' : ''}`} href={'/man'} >Man</NextLink>
                </li>
                <li>
                  <NextLink className={` cursor-pointer ${pathName === '/woman' ? 'link-active' : ''}`} href={'/woman'} >Woman</NextLink>
                </li>
              </ul>

              <div className=' translate-x-10'>
                <NextLink href={'/'}>
                  <Image src={Logo} alt="WinKhin Logo" />
                </NextLink>
              </div>

            </div>

          </div>

          <div className=' flex justify-end items-center'>

            <ul className=' flex justify-start items-center gap-7 font-bold text-[16px] leading-3'>
              <li>
                <NextLink className={` cursor-pointer ${pathName === '/about' ? 'link-active' : ''}`} href={'/about'}>About</NextLink>
              </li>
              <li>
                <NextLink className={` cursor-pointer ${pathName === '/contact-us' ? 'link-active' : ''}`} href={'/contact-us'}>Contact Us</NextLink>
              </li>
            </ul>

            <div className=' w-[350px] flex items-center justify-end'>

              <ul className=' pr-10 flex justify-start items-center gap-5 font-bold text-[16px] leading-3'>
                <li>
                  <NextLink href={'/search'} ><Image src={Search} alt="Search icon" /></NextLink>
                </li>
                <li className=' relative'>
                  {
                    favLists.fav.length > 0 ? (
                      <NextLink href={'/favorite'}>
                      <HeartPulseIcon />
                      <p className=' animate-bounce absolute top-0 -right-2 w-[15px] h-[15px] text-[12px] font-bold bg-red-500 rounded-full flex items-center justify-center'>
                        {favLists.fav.length}
                      </p>
                      </NextLink>
                    ) : (
                      <NextLink href={'/favorite'}>
                        <HeartIcon />
                      </NextLink>
                    )
                  }
                  
                </li>
                <li>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild className=' cursor-pointer'>
                      <GlobeIcon width={'25px'} height={'25px'} />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                      <DropdownMenuLabel>Rate</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      {exchange.length > 0 ? exchange?.map((exchange: any, index) => {
                        const isChecked = checkedExchange?.name === exchange.name;
                        return (
                          <DropdownMenuCheckboxItem
                            checked={isChecked}
                            onCheckedChange={() => {
                              localStorage.setItem(keys.EXCHANGE, JSON.stringify(exchange));
                              setCheckedExchange(exchange);
                              dispatch(addExchange(exchange))
                            }}
                            key={`exchnage_${index}`}
                          >
                            {exchange.name}
                          </DropdownMenuCheckboxItem>
                        )
                      }) : (
                        <p>No avaliable rate</p>
                      )}

                    </DropdownMenuContent>
                  </DropdownMenu>
                </li>
                <li className=' relative'>
                  {
                    cartLists.cart.length > 0 && (
                      <p className=' animate-bounce absolute top-0 -right-2 w-[15px] h-[15px] text-[12px] font-bold bg-red-500 rounded-full flex items-center justify-center'>
                        {cartLists.cart.length}
                      </p>
                    )
                  }
                  <NextLink href={'/cart'}>
                    <Image src={ShopBag} alt="shop bag icon" />
                  </NextLink>
                </li>
              </ul>

            </div>

          </div>
        </div>

      </div>

      {/* for mobile screen */}
      <div className={`${scroll ? '' : ' animate-slideDown'} lg:hidden w-full h-[82px] bg-primary flex-between px-[20px] transition duration-1000 ease-in-out`}>

        <div>
          <NextLink href={'/'}>
            <Image src={Logo} alt="WinKhin Logo" />
          </NextLink>
        </div>

        <div onClick={() => setMobile(!mobile)} className=' text-white cursor-pointer'>
          <GiHamburgerMenu size={25} />
        </div>

        <div className={`${mobile ? ' animate-slideUpOpen' : 'animate-slideUpClose'} fixed top-0 left-0 z-10 bg-white backdrop-filter backdrop-blur-lg bg-opacity-30 w-full h-[100vh]`}>

          <div onClick={() => setMobile(!mobile)} className='  text-white mt-[30px] pr-[20px] flex items-center justify-end'>
            <RxCross1 size={25} />
          </div>

          <div>

            <ul className=' px-[30px] pt-[50px] text-white font-bold flex flex-col gap-3'>

              <li onClick={() => setMobile(!mobile)} className={` cursor-pointer text-primary ${pathName === '/man' ? ' underline' : ''}`}>
                <NextLink href={'/man'}>
                  Man
                </NextLink>
              </li>

              <li onClick={() => setMobile(!mobile)} className={` cursor-pointer text-primary ${pathName === '/woman' ? ' underline' : ''}`}>
                <NextLink href={"/woman"}>
                  Woman
                </NextLink>
              </li>

              <li onClick={() => setMobile(!mobile)} className={` cursor-pointer text-primary ${pathName === '/about' ? ' underline' : ''}`}>
                <NextLink href={'/about'}>
                  About
                </NextLink>
              </li>

              <li onClick={() => setMobile(!mobile)} className=' cursor-pointer text-primary transition duration-300 ease-in-out'>
                <NextLink href={'/contact-us'}>
                  Contact Us
                </NextLink>
              </li>

            </ul>

          </div>

        </div>

      </div>


    </>
  )
}

export default Header;
