'use client'

import { baseURL, endpoints } from "@/constant/endpoints";
import Image from "next/image";
import { Suspense, useCallback, useEffect, useState } from "react";
import NextLink from "next/link";
import { MdArrowForwardIos } from "react-icons/md";
import { dynamicBlurDataUrl } from "@/helper/dynamicBlurDataUrl";
import Loading from "./loading";

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

const Page = () => {
  const [productLists, setProductLists] = useState<PRODUCT[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [media, setMedia] = useState<boolean>(false);
  const [video, setVideo] = useState<any>();

  const fetchVideo = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${baseURL}${endpoints.video}`);
      const data = await response.json();

      if (data.data) {
        setVideo(data.data)
        setLoading(false)
      } else {
        setLoading(false);
      }

    } catch (e) {
      console.error('fetch video api', e);
      setLoading(false);
      throw e;
    }
  }


  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${baseURL}${endpoints.product}`);
      const products = await response.json();

      if (products.data) {
        // const updatedProducts = await Promise.all(
        //   products.data.map(async (product: PRODUCT) => {
        //     const blurData = await dynamicBlurDataUrl(product.bg_image.image);
        //     return { ...product, blurData };
        //   })
        // );

        setProductLists(products.data);
      } else {
        setProductLists([]);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
    fetchVideo();
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia('(max-width: 600px)');
      setMedia(mediaQuery.matches);
    }
  }, [])

  return (
    <Suspense fallback={<Loading />}>

      {
        loading && <Loading />
      }

      <div className="backdrop-blur-xl bg-white/30">
        {
          loading === false && video && (
            <div className=" w-full h-auto md:min-h-[600px] relative">
              <video className=" !w-full !h-auto" autoPlay={true}>
                <source src={`${endpoints.image}/${video.file_name}`} type="video/mp4" />
              </video>
              <h2 className=" absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] text-2xl font-semibold text-white">{video.title}</h2>
            </div>
          )
        }
      </div>

      {
        productLists.map((product: any, index) => (
          <div key={`product_man_${index}`} className="w-full h-full relative overflow-hidden">
            <Image
              src={`${endpoints.image}/${product.bg_image.image}`}
              alt={`product_image`}
              width={0}
              height={media ? 600 : 0}
              className={`w-full ${media ? '!h-[600px]' : '!h-full'}`}
              quality={100}
              priority
              objectFit="fill"
              objectPosition={"center"}
              layout="responsive"
              // placeholder="blur"
              // blurDataURL={product.blurData}
              unoptimized
            />
            <div className="w-full md:w-[600px] lg:w-[800px] h-[300px] px-[30px] md:px-[20px] absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] text-white">
              <h1 className="font-bold text-[25px] md:text-[35px] text-wrap text-center">{product.title}</h1>
              <p className=" text-[18px] md:text-[30px] font-medium text-center">{product.description?.length > 120 ? product.description.substring(0, 120) + "..." : product.description}</p>
              <NextLink
                href={{
                  pathname: product.man_or_woman === "MAN" ? `/man/detail` : '/woman/detail',
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
        ))
      }
    </Suspense>
  );
};

export default Page;
