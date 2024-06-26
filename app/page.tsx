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

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${baseURL}${endpoints.productMen}`);
      const products = await response.json();
      
      if (products.data) {
        const updatedProducts = await Promise.all(
          products.data.map(async (product: PRODUCT) => {
            const blurData = await dynamicBlurDataUrl(product.bg_image.image);
            return { ...product, blurData };
          })
        );
        
        setProductLists(updatedProducts);
      } else {
        setProductLists([]);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  

  return (
    <Suspense fallback={<Loading />}>

      {
        loading && <Loading />
      }

      {
        productLists.map((product : any, index) => (
          <div key={`product_man_${index}`} className="w-full h-full relative overflow-hidden">
            <Image
              src={`${endpoints.image}/${product.bg_image.image}`}
              alt={`product_women_image`}
              width={0}
              height={0}
              className="w-full !h-[600px]  md:h-full"
              quality="100"
              objectFit="fill"
              objectPosition={"center"}
              layout="responsive"
              loading="lazy"
              placeholder="blur"
              blurDataURL={product.blurData}
              unoptimized
            />
            <div className="w-full md:w-[600px] lg:w-[800px] h-[300px] px-[30px] md:px-[20px] absolute top-[70%] left-[0%] md:left-[10%] -translate-x-[0%] -translate-y-[50%] text-white">
              <h1 className="font-bold text-[25px] md:text-[35px] text-wrap">{product.title}</h1>
              <p className=" text-[18px] md:text-[30px] font-medium">{product.description?.length > 150 ? product.description.substring(0,150)+"..." : product.description}</p>
              <NextLink
                href={{
                  pathname: `/woman/detail`,
                  query: {
                    productName: product.product_name,
                    productIds: product.id
                  }
                }}
              >
                <button className="mt-[30px] flex items-center justify-start gap-3 font-bold text-[20px] leading-[24px] transition duration-150 ease-in-out hover:bg-primary-accent-200 hover:shadow-lg active:text-primary active:shadow-md motion-reduce:transition-none">
                  Discover more <span><MdArrowForwardIos /></span>
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
