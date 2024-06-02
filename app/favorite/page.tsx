'use client'

import { useAppSelector } from "@/helper/hook";
import { HeartIcon } from "lucide-react";
import NextLink from "next/link";
import { Suspense, useEffect, useState } from "react";
import Loading from "../loading";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Image from "next/image";
import { endpoints } from "@/constant/endpoints";
import { ToastAction } from "@/components/ui/toast";
import { useDispatch } from "react-redux";
import { useToast } from "@/components/ui/use-toast";
import { removeFav } from "@/services/redux/favSlice";
import { RiDeleteBinLine } from "react-icons/ri";

const page = () => {

    const [mounted, setMounted] = useState<boolean>(false);

    const toast = useToast();
    const favState = useAppSelector(state => state.fav);
    const dispatch = useDispatch();

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setMounted(true);
        }
    }, [])

    return (
        <Suspense fallback={<Loading />}>

            <div>
                {
                    mounted && favState.fav.length === 0 && (
                        <div className=" bg-[#F1F3F5] h-[300px] flex items-center justify-center">

                            <div className=" w-full md:w-[400px]">
                                <div className=" flex items-center justify-center">
                                    <HeartIcon size={30} />
                                </div>
                                <p className=" text-2xl mt-5 font-extrabold text-center leading-[20px]">Your fav list is empty!</p>
                                <NextLink href={'/'}>
                                    <button className=" block mx-auto font-bold uppercase px-[20px] py-[10px] mt-5 bg-black text-white rounded-[20px]">
                                        Go Back
                                    </button>
                                </NextLink>
                            </div>

                        </div>
                    )
                }
            </div>

            {mounted && favState.fav.length > 0 && (
                <div className=" bg-[#F1F3F5] min-h-[300px] py-5">

                    <div className=" px-[30px] md:px-[100px]">
                            <div className=" bg-white p-[20px]">
                                <h1 className=" uppercase text-2xl font-bold">Favorite Item Lists</h1>
                                <div className=" w-full h-[1px] bg-[#B9B8B9] mt-[20px]"></div>

                                <div>
                                    {
                                        mounted && favState.fav.map((fav, index) => {

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
                                                                    fav?.detail_images.map((image: any, index: number) => (
                                                                        <CarouselItem
                                                                            key={index}
                                                                            className=" w-full lg:w-[200px] h-[400px] lg:h-[200px] relative"
                                                                        >
                                                                            <Image
                                                                                src={`${endpoints.image}/${image.image}`}
                                                                                alt="fav photo"
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
                                                        <h1 className=" text-lg font-bold">{fav.title}</h1>
                                                        <div 
                                                            className=" text-base"
                                                            dangerouslySetInnerHTML={{ __html : fav.product_detail_content.length > 50 ? fav.product_detail_content.substring(0, 50) + '...' : fav.product_detail_content }}
                                                        />
                                                        
                                                    </div>
                                                    <div onClick={() => {
                                                        toast.toast({
                                                            variant: "destructive",
                                                            title: 'Remove your fav item, Are you sure to remove?',
                                                            action: (
                                                                <ToastAction onClick={() => {
                                                                    dispatch(removeFav({ id: fav.id }))
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

                    </div>
            )}

        </Suspense>
    )
}

export default page;
