'use client'
import Loading from "@/app/loading"
import { baseURL, endpoints } from "@/constant/endpoints"
import { paths } from "@/constant/paths"
import { dynamicBlurDataUrl } from "@/helper/dynamicBlurDataUrl"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Suspense, useCallback, useEffect, useState } from "react"

interface PRODUCT_DETAIL {
    id: number,
    product_id: number,
    item_id: number,
    header_title: string,
    header_bg: {
        id: number,
        image: string
    },
    header_description: string,
    header_content_title: string,
    header_content_description: string,
    header_content_bgcolor: string,
    showcase_content: string,
    showcase_description: string,
    product_detail_title: string,
    product_detail_content: string,
    product_detail_bgcolor: string,
    product_detail_info: string,
    showcase_bg: {
        id: number,
        image: string,
    },
    footer_left: {
        id: number,
        image: string
    },
    footer_right: {
        id: number,
        image: string
    },
    headerBgDataUrl: string,
    showcaseBgDataUrl: string,
    footerLeftBgDataUrl: string,
    footerRightBgDataUrl: string
}

const shopDetail = ({
    searchParams,
}: {
    searchParams: {
        productName: string,
        productIds: string
    }
}) => {

    const [loading, setLoading] = useState<boolean>(false);
    const [productDetail, setProductDetail] = useState<PRODUCT_DETAIL>();
    const router = useRouter();

    const getProductDetail = useCallback(async () => {

        if (searchParams.productIds) {
            setLoading(true);
            const response = await fetch(`${baseURL}${endpoints.productDetail}/${searchParams.productIds}`);
            const data = await response.json();
            if (data.data[0]) {

                const headerBgDataUrl = await dynamicBlurDataUrl(data.data[0].header_bg.image);
                const showcaseBgDataUrl = await dynamicBlurDataUrl(data.data[0].showcase_bg.image);
                const footerLeftBgDataUrl = await dynamicBlurDataUrl(data.data[0].footer_left.image);
                const footerRightBgDataUrl = await dynamicBlurDataUrl(data.data[0].footer_right.image);
                const addDataUrl = {...data.data[0], headerBgDataUrl, showcaseBgDataUrl, footerLeftBgDataUrl, footerRightBgDataUrl };

                setProductDetail(addDataUrl);
                setLoading(false);
            } else {
                setLoading(false);
            }
            setLoading(false);
        }

    }, [searchParams.productIds])


    useEffect(() => {
        getProductDetail()
    }, [getProductDetail]);

    console.log(productDetail);
    


    return (
        <div>

            {loading && (
                <Loading />
            )}

            {
                loading === false && productDetail === undefined && (
                    <div className=" w-full h-screen flex items-center justify-center font-bold">
                    No product Detail found
                    </div>
                )
            }

            {
                loading === false && productDetail !== null && productDetail !== undefined && (
                    <>
                        <div className=" w-full h-full relative overflow-hidden">

                            <Image
                                src={`${endpoints.image}/${productDetail?.header_bg.image && productDetail?.header_bg.image}`}
                                alt={`product_detail_header_bg`}
                                width={0}
                                height={0}
                                layout="responsive"
                                objectFit="cover"
                                className=" w-full h-full"
                                quality="100"
                                loading={"lazy"}
                                placeholder="blur"
                                blurDataURL={productDetail.headerBgDataUrl}
                            />

                            <div className=" w-[300px] md:w-[600px] text-white absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%]">

                                <div
                                className=" text-center font-normal text-[20px] leading-[25px] md:leading-[19px]"
                                dangerouslySetInnerHTML={{__html: productDetail! && productDetail?.header_title}}
                                />

                                <div
                                    className=" text-center font-bold text-[30px] md:text-[49.9px] leading-[40px] md:leading-[59.87px]"
                                    dangerouslySetInnerHTML={{ __html: productDetail! && productDetail?.header_description }}
                                />

                            </div>

                        </div>

                        <div style={{
                            background: productDetail?.header_content_bgcolor
                        }} className=" w-full h-auto px-[50px] py-[30px] lg:ps-0 flex flex-col lg:flex-row gap-3 lg:flex-center">

                            <div className=" w-full lg:w-[40%] text-white">
                                <div 
                                className=" font-normal text-[40px] md:text-[49.9px] leading-[40px] md:leading-[59px]"
                                dangerouslySetInnerHTML={{__html: productDetail! && productDetail?.header_content_title}}
                                />
                            </div>

                            <div className=" w-full lg:w-[40%] text-white">

                                <div
                                    className=" text-white font-normal text-[20px] leading-[35px] md:leading-[40px]"
                                    dangerouslySetInnerHTML={{ __html: productDetail! && productDetail?.header_content_description }}
                                />

                            </div>


                        </div>

                        <div className=" w-full h-full relative overflow-hidden">

                            <Image
                                src={`${endpoints.image}/${productDetail?.showcase_bg.image}`}
                                alt={`product_detail_showcase_bg`}
                                width={0}
                                height={0}
                                layout="responsive"
                                objectFit="cover"
                                className=" w-full h-full"
                                quality="100"
                                loading={"lazy"}
                                placeholder="blur"
                                blurDataURL={productDetail.showcaseBgDataUrl}
                            />

                            <div className=" w-[300px] md:w-[700px] lg:w-[1100px] h-auto lg:h-[400px] px-[50px] py-[30px] text-white absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%]">

                                <div
                                className=" font-normal text-[30px] text-center md:text-[39px] leading-[35px] md:leading-[46px]"
                                dangerouslySetInnerHTML={{__html : productDetail! && productDetail?.showcase_content}}
                                />

                                <div
                                    className=" text-center text-[20px] md:text-[18px] mt-[50px] font-normal leading-[30px] md:leading-[15px]"
                                    dangerouslySetInnerHTML={{ __html: productDetail! && productDetail?.showcase_description }}
                                />

                            </div>

                        </div>

                        <div style={{
                            background: productDetail?.product_detail_bgcolor
                        }} className=" w-full h-auto text-white flex-center">

                            <div className=" w-[380px] md:w-[600px] px-[30px] py-[30px]">

                                <div 
                                className=" font-normal text-[39px] leading-[46px]"
                                dangerouslySetInnerHTML={{__html: productDetail! && productDetail?.product_detail_title}}
                                />

                                <div
                                    className=" font-normal text-[20px] leading-[25px] md:leading-[40px] mt-[30px]"
                                    dangerouslySetInnerHTML={{ __html: productDetail! && productDetail?.product_detail_content }}
                                />

                            </div>

                        </div>

                        <div className=" w-full h-[1200px] md:h-[888px] flex flex-col md:flex-row md:flex-between">

                            <div
                                className="w-full md:w-[50%] h-full relative"
                            >
                                <Image
                                    src={`${endpoints.image}/${productDetail?.footer_left.image}`}
                                    alt={`product_detail_footer_left`}
                                    fill={true}
                                    quality="100"
                                    loading="lazy"
                                    placeholder="blur"
                                    blurDataURL={productDetail.footerLeftBgDataUrl}
                                />
                            </div>

                            <div
                                className="w-full md:w-[50%] h-full relative"
                            >
                                <Image
                                    src={`${endpoints.image}/${productDetail?.footer_right.image}`}
                                    alt={`product_detail_footer_right`}
                                    fill={true}
                                    quality="100"
                                    loading="lazy"
                                    placeholder="blur"
                                    blurDataURL={productDetail.footerRightBgDataUrl}
                                />
                            </div>

                        </div>

                        <div className=" w-full flex items-center justify-center py-[20px]">
                            <Link
                                href={{
                                    pathname: `/lisiting`,
                                    query: {
                                        item: productDetail?.item_id
                                    }
                                }}
                            >
                                <button
                                    onClick={() => router.push(paths.lisiting)}
                                    className=" w-[117px] h-[44px] font-bold text-[16px] leading-[19px] bg-black text-white rounded-full  transition duration-150 ease-in-out hover:bg-primary-accent-200 hover:shadow-lg active:bg-slate-50 active:text-primary active:shadow-md motion-reduce:transition-none">
                                    BUY NOW
                                </button>
                            </Link>
                        </div>

                    </>
                )
            }

        </div>
    )

}

export default shopDetail