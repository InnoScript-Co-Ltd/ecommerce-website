'use client'
import { FaShoppingBag } from "react-icons/fa";
import NextLink from "next/link"
import { useAppSelector } from "@/helper/hook";
import Image from "next/image";

const page = () => {

    const cart = useAppSelector(state => state.cart);
    console.log(cart);


    return (
        <div className=" mt-[50px]">

            {/* Empty State */}
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

            <div className=" bg-[#F1F3F5] min-h-[300px]">

                <div className=" px-[30px] md:px-[100px] grid grid-cols-5">

                    <div className=" col-span-3">
                        <div className=" bg-white p-[20px]">
                            <h1 className=" uppercase text-2xl font-bold">Shopping Bag</h1>
                            <div className=" w-full h-[1px] bg-[#B9B8B9] mt-[20px]"></div>

                            <div className=" flex items-start justify-start gap-4 mt-4">
                                <Image src={'/cart.png'} width={100} height={6} alt="cart photo" />
                                <div>
                                    <h1 className=" text-lg font-bold">USD .300.00</h1>
                                    <p className=" text-base">Lorem ipsum dolor sit amet consectetur.</p>
                                    <p className=" text-[#979698]">UK S (6-8) | EU 28 | US-4</p>

                                    <div className=" flex items-center justify-center p-0">
                                        <div className=" p-[10px] bg-[#B9B8B9] flex items-center justify-center">
                                            Qty :
                                        </div>
                                        <p>1</p>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className=" col-span-2 bg-blue-500">
                        col2
                    </div>

                </div>

            </div>

        </div>
    )
}

export default page