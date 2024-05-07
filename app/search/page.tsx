import { FaArrowLeftLong } from "react-icons/fa6";


const page = () => {
    return (
        <div className=" container">
            <div className=" flex items-center justify-start gap-10">
                <span className=" cursor-pointer">
                    <FaArrowLeftLong size={20} />
                </span>
                <div className=" w-full">
                    <input type="text" placeholder="Search" className=" w-full border-[1px] border-black rounded-[25px] px-[15px] py-[9px]" />
                </div>
            </div>

            <div className=" h-screen">

            </div>

        </div>
    )
}

export default page