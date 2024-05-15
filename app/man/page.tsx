'use client'
import { MdArrowForwardIos } from "react-icons/md";
import NextLink from "next/link"
import { baseURL, endpoints } from "@/constant/endpoints"
import Image from "next/image";
import { Suspense, useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";


const shop = () => {

    const [productLists, setProductLists] = useState<Array<any>>();
    const [loading, setLoading] = useState<boolean>(false);

    const router = useRouter();

    const fetchProducts = useCallback(async () => {
        setLoading(true);
        const response = await fetch(`${baseURL}${endpoints.productMen}`);
        const products = await response.json();
        if (products.data) {
            setProductLists(products.data);
            setLoading(false);
        } else {
            setLoading(false);
            return null
        }
    }, [])

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts])

    return (
        <Suspense fallback={<div>Loading...</div>}>

            {
                productLists?.map((product, index) => {

                    return (
                        <div key={`product_women_${index}`} className=" w-full h-[900px] md:h-[589px] relative overflow-hidden">
                            <Image
                                src={`${endpoints.image}/${product.bg_image.image}`}
                                alt={`product_women_image`}
                                fill={true}
                                objectFit="cover"
                                quality="100"
                                loading={"lazy"}
                            />

                            <div className=" w-full md:w-[600px] lg:w-[800px] h-[300px] px-[10px] md:px-0 absolute top-[50%] left-[0%] md:top-[70%] md:left-[10%] -translate-x-[0%] -translate-y-[50%] text-white">
                                <h1 className=" font-bold text-[49px] text-wrap leading-[59px]">{product.title}</h1>
                                <p className=" font-normal text-[25px] leading-[30px]">{product.description}</p>
                                <NextLink
                                    href={{
                                        pathname: `/man/detail`,
                                        query : {
                                            productName: product.product_name,
                                            productIds: product.id 
                                        }
                                    }}
                                >
                                    <button className=" mt-[30px] flex items-center justify-start gap-3 font-bold text-[20px] leading-[24px] transition duration-150 ease-in-out hover:bg-primary-accent-200 hover:shadow-lg active:text-primary active:shadow-md motion-reduce:transition-none">Discover more <span> <MdArrowForwardIos />  </span> </button>
                                </NextLink>
                            </div>

                        </div>
                    )
                })
            }

            {/* <div className=" w-full h-[589px] bg-shop-sec-bg bg-cover object-cover flex justify-start align-bottom items-end">

                <div className=" md:w-[600px] lg:w-[750px] h-[300px] ps-[30px] md:ps-[100px] text-white">
                    <h1 className=" font-bold text-[49px] leading-[59px]">The A-Line Midi Denim Skirt</h1>
                    <p className=" font-normal text-[25px] leading-[30px]">Potter ipsum wand elf parchment wingardium. <br /> Die and the </p>
                    <button className=" mt-[30px] flex items-center justify-start gap-3 font-bold text-[20px] leading-[24px] transition duration-150 ease-in-out hover:bg-primary-accent-200 hover:shadow-lg active:text-primary active:shadow-md motion-reduce:transition-none">Discover more <span> <MdArrowForwardIos />  </span> </button>
                </div>

            </div>

            <div className=" w-full h-[589px] bg-shop-third-bg bg-cover object-cover flex justify-start align-bottom items-end">

                <div className=" md:w-[600px] lg:w-[750px] h-[300px] ps-[30px] md:ps-[100px] text-white">
                    <h1 className=" font-bold text-[49px] leading-[59px]">The Wide Leg Indigo Pant</h1>
                    <p className=" font-normal text-[25px] leading-[30px]">Potter ipsum wand elf parchment wingardium. <br /> Die and the </p>
                    <button className=" mt-[30px] flex items-center justify-start gap-3 font-bold text-[20px] leading-[24px] transition duration-150 ease-in-out hover:bg-primary-accent-200 hover:shadow-lg active:text-primary active:shadow-md motion-reduce:transition-none">Discover more <span> <MdArrowForwardIos />  </span> </button>
                </div>

            </div> */}

        </Suspense>
    )
}

export default shop;


