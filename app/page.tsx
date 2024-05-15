'use client'

import { baseURL, endpoints } from "@/constant/endpoints"
import Image from "next/image";
import { Suspense, useCallback, useEffect, useState } from "react";
import NextLink from "next/link";

const page = () => {

  const [productLists, setProductLists] = useState<Array<any>>();
  const [loading, setLoading] = useState<boolean>(false);

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
            <div
              key={`product_${index}`}
              className=" w-full h-[700px] text-white bg-cover object-cover relative"
            >
              <Image
                src={`${endpoints.image}/${product.bg_image.image}`}
                alt={`product_image`}
                fill={true}
                style={{
                  width: '100%',
                  objectFit: "cover"
                }}
                quality="100"
                loading={"lazy"}
              />

              <div className=' w-[300px] md:w-[800px] lg:w-[1100px] absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]'>
                <div className=' flex-center'>
                  <h2 className='text-center text-[30px] md:text-[64px] leading-[73px] font-bold'>{product.title}</h2>
                </div>

                <div className='mt-3'>
                  <p className=' text-[18px] md:text-[31px] font-bold leading-[30px] md:leading-[37px] text-center'>{product.description}</p>
                  {/* <p className=' text-[18px] md:text-[31px] font-bold leading-[30px] md:leading-[37px] text-center'>cloud-like comfort, perfect forchic après ski style</p> */}
                </div>

                <div className=' flex-center mt-3'>

                  <NextLink
                    href={{
                      pathname: `/women/detail`,
                      query: {
                        productName: product.product_name,
                        productIds: product.id
                      }
                    }}
                  >
                    <button className=' inline-block rounded-[32px] border-2 border-white px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-lg active:bg-slate-100 active:text-black active:shadow-lg motion-reduce:transition-none'>
                      Explore
                    </button>
                  </NextLink>
                </div>

              </div>

            </div>
          )
        })
      }

      {/* <div className=" w-full h-[700px] text-white bg-second-bg bg-cover object-cover flex-center">

        <div>

          <div className=' text-center'>
            <h2 className='text-[16px] md:text-[16px] font-bold'>The FRI Series has <br /> <span className=' mr-[98px]'>been</span></h2>
          </div>

          <div className=' w-[300px] md:w-[800px] lg:w-[1100px]'>

            <div className='mt-3'>
              <p className=' text-[20px] md:text-[61px] font-bold leading-[30px] md:leading-[60px] text-center'>Fri Stubble Field & Warenes</p>
            </div>

            <div className=' flex-center mt-3'>

              <button className=' inline-block rounded-[32px] border-2 border-white px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-lg active:bg-slate-100 active:text-black active:shadow-lg motion-reduce:transition-none'>
                Explore
              </button>

            </div>

          </div>

        </div>

      </div>

      <div className=" w-full h-[700px] text-white bg-third-bg bg-cover object-cover flex-center">

        <div>

          <div className=' text-center'>
            <h2 className='text-[16px] md:text-[16px] font-bold'>The FRI Series has <br /> <span className='mr-[98px]'>been</span></h2>
          </div>

          <div className=' w-[300px] md:w-[800px] lg:w-[1100px]'>

            <div className='mt-3'>
              <p className=' text-[20px] md:text-[61px] font-bold leading-[30px] md:leading-[60px] text-center'>Mastering Waterproofness</p>
            </div>

            <div className=' flex-center mt-3'>

              <button className=' inline-block rounded-[32px] border-2 border-white px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-lg active:bg-slate-100 active:text-black active:shadow-lg motion-reduce:transition-none'>
                Explore
              </button>

            </div>

          </div>

        </div>

      </div>

      <div className=" w-full h-[700px] text-white bg-four-bg bg-cover object-cover flex-center">

        <div>

          <div className=' text-center'>
            <h2 className='text-[16px] md:text-[16px] font-bold'>The FRI Series has <br /> <span className=' mr-[98px]'>been</span></h2>
          </div>

          <div className=' w-[300px] md:w-[800px] lg:w-[1100px]'>

            <div className='mt-3'>
              <p className=' text-[20px] md:text-[61px] font-bold leading-[30px] md:leading-[67px] text-center'>Celebrating the <br /> 2023 Laureates</p>
            </div>

            <div className=' flex-center mt-3'>

              <button className=' inline-block rounded-[32px] border-2 border-white px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-lg active:bg-slate-100 active:text-black active:shadow-lg motion-reduce:transition-none'>
                Explore
              </button>

            </div>

          </div>

        </div>

      </div> */}

    </Suspense>
  )
}

export default page