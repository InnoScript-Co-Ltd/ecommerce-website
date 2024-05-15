'use client'
import { FaShoppingBag } from "react-icons/fa";
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";

import NextLink from "next/link"
import { useAppSelector } from "@/helper/hook";
import Image from "next/image";
import { Suspense, useEffect, useState } from "react";

const page = () => {

    const [mounted, setMounted] = useState(false);

    const cart = useAppSelector(state => state.cart);
    console.log(cart);

    useEffect(() => {
        if (typeof window !== "undefined") {
            setMounted(true);
        }
    }, [])


    return (
        <Suspense fallback={<div>Loading...</div>}>

            <div>
                {
                    mounted && cart.cart.length === 0 ? (
                        <div className=" bg-[#F1F3F5] h-[300px] flex items-center justify-center">

                            <div className=" w-full md:w-[400px]">
                                <div className=" flex items-center justify-center">
                                    <FaShoppingBag size={30} />
                                </div>
                                <p className=" text-2xl mt-5 font-extrabold text-center leading-[20px]">Your shopping bag is empty!</p>
                                <NextLink href={'/shop'}>
                                    <button className=" block mx-auto font-bold uppercase px-[20px] py-[10px] mt-5 bg-black text-white rounded-[20px]">
                                        Continue Shopping
                                    </button>
                                </NextLink>
                            </div>

                        </div>
                    ) : (
                        <div className=" bg-[#F1F3F5] min-h-[300px]">

                            <div className=" px-[30px] md:px-[100px] grid grid-cols-5 gap-3">

                                <div className=" col-span-3">
                                    <div className=" bg-white p-[20px]">
                                        <h1 className=" uppercase text-2xl font-bold">Shopping Bag</h1>
                                        <div className=" w-full h-[1px] bg-[#B9B8B9] mt-[20px]"></div>

                                        <div>
                                            {
                                                mounted && cart.cart.map((cart, index) => {
                                                    return (
                                                        <div key={index} className=" flex items-start justify-start gap-4 mt-4">
                                                            <Image src={'/cart.png'} width={100} height={6} alt="cart photo" />
                                                            <div>
                                                                <h1 className=" text-lg font-bold">{cart.title}</h1>
                                                                <p className=" text-base">{cart.desc.length > 50 ? cart.desc.substring(0,50)+'...' : cart.desc}</p>
                                                                {/* <p className=" text-[#979698]">UK S (6-8) | EU 28 | US-4</p> */}

                                                                <div className=" w-[100px] flex items-center justify-start">
                                                                    <div className=" p-[10px] bg-[#B9B8B9] flex items-center justify-center">
                                                                        Qty :
                                                                    </div>
                                                                    <p className=" select-none p-[10px] flex items-center justify-center">{cart.choose_count}</p>
                                                                    <div className=" flex flex-col items-center justify-center gap-1">
                                                                        <MdKeyboardArrowUp className=" cursor-pointer active:text-primary focus:scale-105 hover:scale-105 w-[20px] h-[20px] border-[1px] border-[#B9B8B9] rounded-full" size={20} />
                                                                        <MdKeyboardArrowDown className=" cursor-pointer active:text-primary focus:scale-105 hover:scale-105 w-[20px] h-[20px] border-[1px] border-[#B9B8B9] rounded-full" size={20} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className=" ml-auto">
                                                                <RiDeleteBinLine className=" cursor-pointer hover:scale-105" size={20} />
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                </div>

                                <div className=" col-span-2">
                                    <div className=" bg-white p-[20px] h-[260px]">
                                        <div className=" flex items-center justify-between">
                                            <h1 className=" text-base font-bold">Subtotal</h1>
                                            <h3 className=" text-red-500 font-bold">$ 118.00</h3>
                                        </div>

                                        <button className=" w-full h-[50px] mt-[25px] text-xl font-bold text-primary border-2 border-primary flex items-center justify-center ">
                                            You've saved $45.00 so far
                                        </button>
                                        <button className=" w-full h-[50px] mt-[20px] text-xl font-bold uppercase text-white bg-green-500 flex items-center justify-center">
                                            checkout now
                                        </button>
                                        <div className=" w-full h-[1px] bg-[#B9B8B9] mt-[20px]"></div>
                                    </div>
                                </div>

                            </div>

                        </div>
                    )
                }
            </div>


        </Suspense>
    )
}

export default page