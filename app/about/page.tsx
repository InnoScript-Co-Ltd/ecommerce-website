import React from 'react'
import Image from 'next/image'
import WINY from "../../public/winykhin.png"
import ELLIPSE from "../../public/ellipse.png"
import LOGO from "../../public/logoblack.png"
import NextLink from "next/link"

const page = () => {
  return (
    <div>

      <div className='flex justify-center mt-[26px]'>
        <div className='w-[820px]'><NextLink className=' cursor-pointer' href={"/"}>Home</NextLink> / <span>About</span></div>
      </div>

      <div className='flex justify-center mt-[85px]'>
        <div className='w-[700px]'>
          <p className='text-[49px] leading-[58px] text-[#DC6044]'>Lady from Burma,</p>
          <p className='text-[20px] leading-[24px] text-[#676668] mt-[30px]'>I am Winy Khin, a fervent Burmese fashion designer intricately entwined with the legacy of Achiek—a revered Burmese fabric. My designs are born from Achiek itself, honoring its profound symbolism and weaving its cultural heritage into every creation. At my atelier, Achiek serves as both muse and medium, melding tradition with contemporary expression.</p>
          <p className='text-[20px] leading-[24px] text-[#676668]'>Achiek, renowned for its intricate patterns and deep cultural significance, inspires my craftsmanship. Within each garment, I endeavor to encapsulate Achiek&apos;s essence, narrating stories of our heritage's resilience and beauty. While my designs captivate audiences globally, my allegiance remains rooted in Burma. Collaborating closely with local artisans, I safeguard traditional techniques and champion sustainable practices. Fashion, as I perceive it, is a canvas to immortalize the timeless allure of Achiek—a legacy adorned with pride, cultural heritage, and everlasting elegance.</p>
        </div>
      </div>
      
      <div className='flex-col grid justify-items-center mt-[47px]'>
        <Image src={WINY} alt='winykhin' className='relative z-[10]'/>
        <Image src={ELLIPSE} alt='ellipse' className='ml-[360px] mt-[-240px] relative z-[0]'/>
      </div>
      <div className='flex justify-center mt-[-20px]'>
        <Image src={LOGO} alt='logo'/>
      </div>
     
    </div>
  )
}

export default page