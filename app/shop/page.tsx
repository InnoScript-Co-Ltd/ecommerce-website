import { MdArrowForwardIos } from "react-icons/md";


const shop = () => {
    return (
        <div>

            <div className=" w-full h-[589px] bg-shop-one-bg bg-cover object-cover flex justify-start align-bottom items-end">

                <div className=" md:w-[600px] lg:w-[680px] h-[300px] ps-[30px] md:ps-[100px] text-white">
                    <h1 className=" font-bold text-[49px] leading-[59px]">The Wide Leg Indigo Pant</h1>
                    <p className=" font-normal text-[25px] leading-[30px]">Potter ipsum wand elf parchment wingardium. <br /> Die and the </p>
                    <button className=" mt-[30px] flex items-center justify-start gap-3 font-bold text-[20px] leading-[24px] transition duration-150 ease-in-out hover:bg-primary-accent-200 hover:shadow-lg active:text-primary active:shadow-md motion-reduce:transition-none">Discover more <span> <MdArrowForwardIos />  </span> </button>
                </div>

            </div>

            <div className=" w-full h-[589px] bg-shop-sec-bg bg-cover object-cover flex justify-start align-bottom items-end">

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

            </div>

        </div>
    )
}

export default shop;


