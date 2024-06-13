'use client'
import { MdArrowForwardIos } from "react-icons/md";
import NextLink from "next/link"
import { baseURL, endpoints } from "@/constant/endpoints"
import Image from "next/image";
import { Suspense, useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Loading from "../loading";
import { dynamicBlurDataUrl } from "@/helper/dynamicBlurDataUrl";

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


const shop = () => {

    const [productLists, setProductLists] = useState<Array<any>>();
    const [loading, setLoading] = useState<boolean>(false);
    const [media, setMedia] = useState<boolean>(false);

    const router = useRouter();

    const fetchProducts = useCallback(async () => {
        setLoading(true);
        const response = await fetch(`${baseURL}${endpoints.productWomen}`);
        const products = await response.json();
        if (products.data) {

            const updateWomenProduct = await Promise.all(
                products.data.map(async (product: PRODUCT) => {
                    const blurData = await dynamicBlurDataUrl(product.bg_image.image);
                    return { ...product, blurData }
                })
            )
            setProductLists(updateWomenProduct);
            setLoading(false);
        } else {
            setLoading(false);
            return null
        }
    }, [])

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    useEffect(() => {
        if(typeof window !== "undefined") {
            const mediaQuery = window.matchMedia('(max-width: 600px)');
            setMedia(mediaQuery.matches);
        }
    }, [])

    return (
        <Suspense fallback={<Loading />}>

            {
                loading && (
                    <Loading />
                )
            }

            <div>
                {
                    productLists?.map((product, index) => {

                        return (
                            <div key={`product_man_${index}`} className="w-full h-full relative overflow-hidden">
                                <Image
                                    src={`${endpoints.image}/${product.bg_image.image}`}
                                    alt={`product_women_image`}
                                    width={0}
                                    height={media ? 600 : 0}
                                    className={`w-full ${media ? '!h-[600px]' : '!h-full'}`}
                                    quality={100}
                                    priority
                                    objectFit="fill"
                                    objectPosition={"center"}
                                    layout="responsive"
                                    placeholder="blur"
                                    blurDataURL={product.blurData}
                                    unoptimized
                                />
                                <div className="w-full md:w-[600px] lg:w-[800px] h-[300px] px-[30px] md:px-[20px] absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] text-white">
                                    <h1 className="font-bold text-[25px] md:text-[35px] text-wrap text-center">{product.title}</h1>
                                    <p className=" text-[18px] md:text-[30px] font-medium text-center">{product.description?.length > 120 ? product.description.substring(0, 120) + "..." : product.description}</p>
                                    <NextLink
                                        href={{
                                            pathname: `/woman/detail`,
                                            query: {
                                                productName: product.product_name,
                                                productIds: product.id
                                            }
                                        }}
                                        className=" flex items-center justify-center"
                                    >
                                        <button className="mt-[30px] font-bold text-[20px] border border-white rounded-[30px] px-3 py-2 transition duration-150 ease-in-out hover:bg-primary-accent-200 hover:shadow-lg active:text-primary active:shadow-md motion-reduce:transition-none">
                                            Explore
                                        </button>
                                    </NextLink>
                                </div>
                            </div>
                        )
                    })
                }
            </div>

        </Suspense>
    )
}

export default shop;


