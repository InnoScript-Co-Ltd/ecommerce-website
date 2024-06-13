'use client'
import { baseURL, endpoints } from "@/constant/endpoints";
import useDebounce from "@/helper/useDebounce";
import { Suspense, useCallback, useEffect, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { CrossCircledIcon, DoubleArrowRightIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { dynamicBlurDataUrl } from "@/helper/dynamicBlurDataUrl";
import Link from "next/link"
import Loading from "../loading";

interface PRODUCT {
    bg_image: {
        id: number,
        image: string
    },
    description: string,
    id: number,
    is_public: string,
    man_or_woman: string,
    product_name: string,
    title: string,
}


const page = () => {

    const [loading, setLoading] = useState<boolean>(false);
    const [search, setSearch] = useState('');
    const [productLists, setProductLists] = useState([]);
    const debouncedSearch = useDebounce(search, 1500);

    const getProduct = useCallback(async () => {
        if (debouncedSearch) {
            setLoading(true);
            const result: any = await fetch(`${baseURL}${endpoints.product}?search=${search}`);
            const response: any = await result.json();

            if (response.data) {
                const updatedMenProducts: any = await Promise.all(
                    response.data.map(async (product: PRODUCT) => {
                        const blurData = await dynamicBlurDataUrl(product.bg_image.image);
                        return { ...product, blurData }
                    })
                )

                setProductLists(updatedMenProducts);
                setLoading(false);
            } else {
                setLoading(false);
            }
        }
    }, [debouncedSearch]);

    useEffect(() => {
        getProduct();
    }, [getProduct]);



    return (
        <Suspense fallback={<Loading />}>

            {
                loading && (
                    <Loading />
                )
            }

            <div className=" container">
                <div className=" flex items-center justify-start gap-10">
                    <span onClick={() => {
                        setSearch("");
                        getProduct();
                    }} className=" cursor-pointer">
                        <FaArrowLeftLong size={20} />
                    </span>
                    <div className=" w-full relative">
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            type="text"
                            placeholder="Search"
                            className=" w-full border-[1px] border-black rounded-[25px] px-[15px] py-[9px]" />
                        {/* {
                        search.length > 0 && (
                            <CrossCircledIcon onClick={() => {
                                setSearch("")
                            }} width={30} height={30} className=" cursor-pointer absolute top-[50%] right-3 -translate-y-[50%]" />
                        )
                    } */}
                    </div>
                </div>

                <div className=" flex flex-col gap-3 mt-5">

                    {
                        loading === false && productLists?.map((product: any, index) => {
                            return (
                                <div key={`product_${index}`} className=" bg-slate-50 p-5 grid grid-cols-12">
                                    <div className=" col-span-4">
                                        <Image
                                            width={0}
                                            height={0}
                                            alt="product_photo"
                                            src={`${endpoints.image}/${product.bg_image.image}`}
                                            layout={'cover'}
                                            objectFit="cover"
                                            unoptimized
                                            className=" w-full h-[200px] rounded-lg"
                                            placeholder="blur"
                                            blurDataURL={product.blurData}
                                        />
                                    </div>
                                    <div className=" col-span-8 px-5">
                                        <h1 className=" text-xl font-bold ">{product.title}</h1>
                                        <p className=" text-lg text-gray">{product.description.length > 100 ? product.description.substring(0, 100) + '...' : product.description}</p>

                                        <div className=" w-full">
                                            <Link
                                                href={{
                                                    pathname: `/${product.man_or_woman === "WOMAN" ? "woman" : "man"}/detail`,
                                                    query: {
                                                        productName: product.product_name,
                                                        productIds: product.id
                                                    }
                                                }}
                                            >
                                                <DoubleArrowRightIcon width={30} height={30} className=" block ml-auto mt-auto" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }

                </div>

            </div>

        </Suspense>
    )
}

export default page