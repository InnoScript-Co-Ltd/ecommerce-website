'use client'
import React, { Suspense, useEffect, useState } from 'react'
import Image from 'next/image'
import Profile from "../../public/hero_bg.jpeg"
import fourBg from "../../public/about-one.jpeg"
import second from "../../public/about-two.jpeg"
import One from "../../public/about-three.jpeg"
import Two from "../../public/shop_detail_four_bg.jpeg"
import detail from "../../public/shop_detail_two_bg.jpeg"
import ELLIPSE from "../../public/ellipse.png"
import LOGO from "../../public/logoblack.png"
import NextLink from "next/link"
import Loading from '../loading'
import { baseURL, endpoints } from '@/constant/endpoints'
import { dynamicBlurDataUrl } from '@/helper/dynamicBlurDataUrl'

const page = () => {

  const [loading, setLoading] = useState<boolean>(false);
  const [about, setAbout] = useState<any>(null);
  const [media, setMedia] = useState<boolean>(false);
  const [artistPhotos, setArtistPhotos] = useState<Array<any>>([]);

  const getAbout = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${baseURL}${endpoints.about}`);
      const data = await response.json();
      console.log(data.data);

      if (data.data) {
        const header_bg = await dynamicBlurDataUrl(data.data.header_section_bg_img);
        const nice_bg = await dynamicBlurDataUrl(data.data.nice_photo);
        const protfolio = await dynamicBlurDataUrl(data.data.portfolio_photo);

        setAbout({ ...data.data, header_bg, nice_bg, protfolio });

        const updateArtistPhoto = await Promise.all(
          data.data.artist_photos?.map(async (artist: any) => {
            const blurData = await dynamicBlurDataUrl(artist.photo);
            return { ...artist, blurData: blurData }
          })
        )
        setArtistPhotos(updateArtistPhoto);
        // setAbout(data.data)
        setLoading(false);
      } else {
        setLoading(false);
      }

    } catch (e) {
      throw e;
      console.error('Fetch about us api', e);
    }
  }

  console.log(artistPhotos);



  useEffect(() => {
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia('(max-width: 600px)');
      setMedia(mediaQuery.matches);
    }

    getAbout();

  }, [])


  return (
    <Suspense fallback={<Loading />}>

      <div className=' w-full'>

        <div className=' w-full min-h-[600px] md:h-auto relative'>
          {
            loading === false && about !== null && about !== undefined && (
              <Image
                src={`${endpoints.image}/${about?.header_section_bg_img}`}
                alt={`product_detail_header_bg`}
                width={0}
                height={0}
                layout="responsive"
                objectFit="cover"
                className={`w-full ${media ? '!h-[600px]' : '!min-h-[600px]'}`}
                quality={100}
                priority
                placeholder="blur"
                blurDataURL={about && about?.header_bg}
              />
            )
          }
          <div className='absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]'>
            <h1 className=' text-pink-50 font-bold text-[30px] md:text-[55px] text-center'>{about?.title}</h1>
            <div className=' flex items-center justify-center mt-[20px]'>
              <a href={about?.header_btn_url} target='__blank' className=' w-[150px] md:w-[200px] h-[56px] font-semibold flex items-center justify-center text-white bg-primary'>
                Explore More
              </a>
            </div>
          </div>

        </div>

      </div>

      <div className=' p-10'>
        <h1 className=' text-xl md:text-4xl font-medium'>
          {about?.description}
        </h1>
        <a href={about?.description_btn_url} target='__blank' className=' w-[150px] md:w-[200px] h-[56px] mt-[20px] font-semibold flex items-center justify-center text-white bg-primary'>
          Explore More
        </a>
        <div className=' h-[2px] w-full bg-black-50 mt-[50px]'></div>
      </div>

      {/* Start course  */}
      <div className=' w-full'>
        <h1 className=' text-3xl md:text-5xl font-semibold text-center'>{about?.artist_title}</h1>
        <div className=' flex items-center justify-center'>
          <p className=' w-[300px] text-center font-semibold text-slate-700 mt-[20px]'>{about?.artist_description}</p>
        </div>

        <div className=' grid grid-cols-2 px-[40px] mt-[80px] gap-5 md:gap-0'>
            {
              loading === false && artistPhotos.length > 0 && (
                <div className=' col-start-1 col-span-2 md:col-span-1 relative'>
                  <Image
                    src={`${endpoints.image}/${artistPhotos[0]?.photo}`}
                    width={0}
                    height={0}
                    sizes="100vw"
                    className=' w-full min-h-[600px]'
                    alt='winy'
                    placeholder="blur"
                    blurDataURL={artistPhotos[0]?.blurData}
                    unoptimized
                  />
                  <h1 className=' text-4xl font-medium mt-5'>{artistPhotos[0].photo_title}</h1>
                  <p className=' text-lg text-slate-700'>{artistPhotos[0].photo_description}</p>
                </div>
              )
            }
          <div className=' col-start-1 md:col-start-2 col-span-2 md:col-span-1'>
            {
              loading === false && artistPhotos.length > 1 && (
                <div className=' w-full md:w-[80%] ml-auto'>
                  <Image
                    src={`${endpoints.image}/${artistPhotos[1]?.photo}`}
                    width={0}
                    height={0}
                    sizes="100vw"
                    className=' w-full h-[700px]'
                    placeholder="blur"
                    blurDataURL={artistPhotos[1]?.blurData}
                    unoptimized
                    priority
                    alt='winy'
                  />
                  <h1 className=' text-4xl font-medium mt-5'>{artistPhotos[1].photo_title}</h1>
                  <p className=' text-lg text-slate-700'>{artistPhotos[1].photo_description}</p>
                </div>
              )
            }
          </div>
        </div>

        <div className=' w-full px-[40px] mt-[20px] md:mt-0'>
          {
            loading === false && artistPhotos.length > 2 && (
              <div className=' w-full md:w-[500px] ml-auto'>
                <Image
                  src={`${endpoints.image}/${artistPhotos[2]?.photo}`}
                  width={0}
                  height={0}
                  sizes="100vw"
                  className=' w-full h-[550px]'
                  placeholder="blur"
                  blurDataURL={artistPhotos[2]?.blurData}
                  unoptimized
                  priority
                  alt='winy'
                />
                <h1 className=' text-4xl font-medium mt-5'>{artistPhotos[2].photo_title}</h1>
                <p className=' text-lg text-slate-700'>{artistPhotos[2].photo_description}</p>
              </div>
            )
          }
        </div>

        <div className=' grid grid-cols-2 p-[40px] mt-[40px] bg-yellow-200 gap-5 md:gap-0'>

          <div className=' col-span-2 md:col-span-1 col-start-1 flex items-center justify-start'>
            <div className=' w-[300px]'>
              <h1 className=' text-5xl font-semibold'>{about?.nice_title}</h1>
              <p className=' mt-5 text-slate-700 mb-5'>{about?.nice_description}</p>
              <a href={about?.nice_btn_url} target='__blank' className=' w-[150px] h-[56px] mt5 bg-slate-900 text-white flex items-center justify-center font-semibold'>Contact Me</a>
            </div>

          </div>
          <div className=' col-span-2 md:col-span-1 col-start-1 md:col-start-2'>
            <div className=' w-full md:w-[80%] ml-auto'>
              {
                loading === false && about !== null && about !== undefined && (
                  <Image
                    src={`${endpoints.image}/${about?.nice_photo}`}
                    alt={`product_detail_header_bg`}
                    width={0}
                    height={0}
                    layout="responsive"
                    objectFit="cover"
                    className={`${media ? 'w-full !h-[600px]' : 'md:w-[80%] !min-h-[600px]'}`}
                    quality={100}
                    priority
                    placeholder="blur"
                    blurDataURL={about && about?.nice_bg}
                  />
                )
              }
            </div>
          </div>

        </div>

        <div className=' grid grid-cols-2 p-[40px] mt-[0px] gap-5 md:gap-0'>

          <div className=' col-span-2 md:col-span-1 col-start-1'>
            <div className=' w-full md:w-[80%] mr-auto'>
              {
                loading === false && about !== null && about !== undefined && (
                  <Image
                    src={`${endpoints.image}/${about?.portfolio_photo}`}
                    alt={`product_detail_header_bg`}
                    width={0}
                    height={0}
                    layout="responsive"
                    objectFit="cover"
                    className={`${media ? 'w-full !h-[600px]' : 'md:w-[80%] !min-h-[600px]'}`}
                    quality={100}
                    priority
                    placeholder="blur"
                    blurDataURL={about && about?.protfolio}
                  />
                )
              }
            </div>
          </div>

          <div className=' col-span-2 col-start-1 md:col-span-1 md:col-start-2 flex items-center justify-end'>
            <div className=' w-[300px]'>
              <h1 className=' text-5xl font-semibold'>{about?.portfolio_title}</h1>
              <p className=' mt-5 text-slate-700 mb-5'>
                {about?.portfolio_description}
              </p>
              <a href={about?.portfolio_btn_url} target='__blank' className=' w-[150px] h-[56px] mt5 bg-slate-900 text-white flex items-center justify-center font-semibold uppercase'>See More</a>
            </div>

          </div>

        </div>

      </div>

    </Suspense>
  )
}

export default page