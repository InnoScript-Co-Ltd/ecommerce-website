'use client'
import { FaShoppingBag } from "react-icons/fa";
import NextLink from "next/link"
import { useAppSelector } from "@/helper/hook";

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

        </div>
    )
}

export default page