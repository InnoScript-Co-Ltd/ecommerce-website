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

    const router = useRouter();

    const fetchProducts = useCallback(async () => {
        setLoading(true);
        const response = await fetch(`${baseURL}${endpoints.productWomen}`);
        const products = await response.json();
        if (products.data) {

            const updateWomenProduct = await Promise.all(
                products.data.map(async (product:PRODUCT) => {
                    const blurData = await dynamicBlurDataUrl(product.bg_image.image);
                    return {...product, blurData}
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
    }, [fetchProducts])

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
                            <div key={`product_women_${index}`} className=" w-full h-full relative overflow-hidden">
                                <Image
                                    src={`${endpoints.image}/${product.bg_image.image}`}
                                    alt={`product_women_image`}
                                    width={0}
                                    height={0}
                                    layout="responsive"
                                    objectFit="cover"
                                    className=" w-full h-full"
                                    quality="100"
                                    // loading={"lazy"}
                                    placeholder="blur"
                                    blurDataURL={product.blurData}
                                />

                                <div className=" w-full md:w-[600px] lg:w-[800px] h-[300px] px-[10px] md:px-0 absolute top-[70%] left-[0%] md:left-[10%] -translate-x-[0%] -translate-y-[50%] text-white">
                                    <h1 className=" font-bold text-[25px]  md:text-[35px] text-wrap md:leading-[59px]">{product.title.length > 30 ? product.title.substring(0,30)+"..." : product.title}</h1>
                                    <p className=" mt-3 font-normal text-[18px] md:text-[30px] md:leading-[30px]">{product.description}</p>
                                    <NextLink
                                        href={{
                                            pathname: `/woman/detail`,
                                            query: {
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
            </div>

        </Suspense>
    )
}

export default shop;


