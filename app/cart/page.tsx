'use client'
import { FaShoppingBag } from "react-icons/fa";
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";

import NextLink from "next/link"
import { useAppDispatch, useAppSelector } from "@/helper/hook";
import Image from "next/image";
import { Suspense, useCallback, useEffect, useState } from "react";
import Loading from "../loading";
import { addCartCount, reduceCartCount, removeCart, total } from "@/services/redux/cartSlice";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { baseURL, endpoints } from "@/constant/endpoints";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

interface CART {

    choose_color: string,
    choose_count: number,
    choose_size: string,
    desc: string,
    id: number,
    image : Array<any>,
    price : string,
    promotionPrice: string,
    title: string
}

interface CARTLISTS extends Array<CART> {}

function sumPrices(cart: any, priceType: string) {
    return cart.reduce((sum: any, current: any) => sum + parseFloat(current[priceType] || 0), 0);
}

const page = () => {

    const [mounted, setMounted] = useState(false);

    const dispatch = useAppDispatch();
    const cart : any = useAppSelector(state => state.cart);
    const exchange = useAppSelector((state) => state.exchnage);
    const router = useRouter();
    const toast = useToast();

    useEffect(() => {
        setMounted(true);
        dispatch(total(["price","promotionPrice", "choose_count"]))
    }, [dispatch]);

    console.log(exchange);
    

    const checkout = async () => {

        const formatCheckout = cart.cart.map((cart : any) => {
            return {
                price_data: {
                    currency: exchange.exchange.name ? exchange.exchange.name?.toLowerCase() : 'thb',
                    product_data : {
                        name: cart.title
                    },
                    unit_amount: cart.price
                },
                quantity: cart.choose_count
            }
        })

        console.log(formatCheckout);
        const payload: any = {
            line_items : formatCheckout
        }
        

        try {
            const response = await fetch(`${baseURL}/checkout`, {
                headers: {
                    "Content-Type": "application/json"
                },
                method: "POST",
                body: JSON.stringify(payload)
            }).then(res => res.json())
            .then((data : any) => {
                console.log(data);
                
                if(data.data){
                    window.location.replace(data.data)
                }

                return data
            });
        } catch (e) {
            console.error('Checkout error', e);
        }
    }
    

    return (
        <Suspense fallback={<Loading />}>

            <div>
                {
                    mounted && cart.cart.length === 0 ? (
                        <div className=" bg-[#F1F3F5] h-[300px] flex items-center justify-center">

                            <div className=" w-full md:w-[400px]">
                                <div className=" flex items-center justify-center">
                                    <FaShoppingBag size={30} />
                                </div>
                                <p className=" text-2xl mt-5 font-extrabold text-center leading-[20px]">Your shopping bag is empty!</p>
                                <NextLink href={'/'}>
                                    <button className=" block mx-auto font-bold uppercase px-[20px] py-[10px] mt-5 bg-black text-white rounded-[20px]">
                                        Continue Shopping
                                    </button>
                                </NextLink>
                            </div>

                        </div>
                    ) : (
                        <div className=" bg-[#F1F3F5] min-h-[300px] py-5">

                            <div className=" px-[30px] md:px-[100px] grid grid-cols-5 gap-3">

                                <div className=" col-span-5 lg:col-span-3">
                                    <div className=" bg-white p-[20px]">
                                        <h1 className=" uppercase text-2xl font-bold">Shopping Bag</h1>
                                        <div className=" w-full h-[1px] bg-[#B9B8B9] mt-[20px]"></div>

                                        <div>
                                            {
                                                mounted && cart.cart.length > 0 && cart.cart.map((cart : any, index : number) => {

                                                    return (
                                                        <div key={index} className=" w-full h-full flex flex-col lg:flex-row items-start justify-start gap-4 mt-4">
                                                            <div className=" w-full lg:w-[200px] h-[400px] lg:h-[200px] relative">

                                                                <Carousel
                                                                    opts={{
                                                                        loop: true
                                                                    }}
                                                                    className=" w-full lg:w-[200px] h-[400px] lg:h-[200px] relative"
                                                                >
                                                                    <CarouselContent>
                                                                        {
                                                                            cart?.image.map((image: any, index: number) => (
                                                                                <CarouselItem
                                                                                    key={index}
                                                                                    className=" w-full lg:w-[200px] h-[400px] lg:h-[200px] relative"
                                                                                >
                                                                                    <Image
                                                                                        src={`${endpoints.image}/${image}`}
                                                                                        alt="cart photo"
                                                                                        loading="lazy"
                                                                                        quality={100}
                                                                                        fill={true}
                                                                                        objectFit="cover"
                                                                                        unoptimized={true}
                                                                                        className=" w-full h-full"
                                                                                    />
                                                                                </CarouselItem>
                                                                            ))
                                                                        }
                                                                    </CarouselContent>
                                                                    <CarouselPrevious className=" absolute left-5 top-[50%] translate-x-0 -translate-y-[50%]" />
                                                                    <CarouselNext className=" absolute right-5 top-[50%] translate-x-0 -translate-y-[50%]" />
                                                                </Carousel>
                                                            </div>
                                                            <div className=" md:w-[200px] lg:min-w-[200px]">
                                                                <h1 className=" text-lg font-bold">{cart.title}</h1>
                                                                <div 
                                                                className=" text-base"
                                                                dangerouslySetInnerHTML={{ __html: cart.desc.length > 100 ? cart.desc.substring(0, 100) + '...' : cart.desc }}
                                                                />
                                                                {/* <p className=" text-[#979698]">UK S (6-8) | EU 28 | US-4</p> */}

                                                                <div className=" w-[100px] flex items-center justify-start">
                                                                    <div className=" p-[10px] bg-[#B9B8B9] text-[14px] flex items-center justify-center">
                                                                        <span>Qty:</span>
                                                                    </div>
                                                                    <p className=" select-none p-[10px] flex items-center justify-center">{cart.choose_count}</p>
                                                                    <div className=" flex flex-col items-center justify-center gap-1">
                                                                        <MdKeyboardArrowUp onClick={() => {
                                                                            dispatch(addCartCount({ id: cart.id }));
                                                                            dispatch(total(["price","promotionPrice", "choose_count"]))
                                                                        }} className=" cursor-pointer active:text-primary focus:scale-105 hover:scale-105 w-[20px] h-[20px] border-[1px] border-[#B9B8B9] rounded-full" size={20} />
                                                                        <MdKeyboardArrowDown onClick={() => {
                                                                            dispatch(reduceCartCount({ id: cart.id }));
                                                                            dispatch(total(["price","promotionPrice", "choose_count"]))
                                                                        }} className=" cursor-pointer active:text-primary focus:scale-105 hover:scale-105 w-[20px] h-[20px] border-[1px] border-[#B9B8B9] rounded-full" size={20} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div onClick={() => {
                                                                toast.toast({
                                                                    variant: "destructive",
                                                                    title: 'Remove your item draft, Are you sure to remove?',
                                                                    action: (
                                                                        <ToastAction onClick={() => {
                                                                            dispatch(removeCart({ id: cart.id }))
                                                                        }} altText="Goto schedule to undo">
                                                                            Remove
                                                                        </ToastAction>
                                                                    ),
                                                                })
                                                            }} className=" cursor-pointer active:scale-110 active:text-primary ml-auto">
                                                                <RiDeleteBinLine className=" cursor-pointer hover:scale-105" size={20} />
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                </div>

                                <div className=" col-span-5 lg:col-span-2">
                                    <div className=" bg-white p-[20px] h-[260px]">
                                        <div className=" flex items-center justify-between">
                                            <h1 className=" text-base font-bold">Subtotal</h1>
                                            <h3 className=" text-red-500 font-bold">$ {cart.totalPrice * cart.totalQty}</h3>
                                        </div>

                                        <button className=" w-full h-[50px] mt-[25px] text-xl font-bold text-primary border-2 border-primary flex items-center justify-center ">
                                            You've saved ${(cart.totalPrice - cart.totalSellPrice) * cart.totalQty} so far
                                        </button>
                                        <button onClick={checkout} className=" w-full h-[50px] mt-[20px] text-xl font-bold uppercase text-white bg-green-500 flex items-center justify-center">
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