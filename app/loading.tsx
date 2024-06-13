import LoadingSVG from "@/public/loading.svg"
import Image from "next/image"

export default function Loading() {
    return(
        <div className=" relative w-full h-screen overflow-hidden z-[9999] backdrop-blur-sm bg-white/30">

            <Image 
            src={LoadingSVG}
            alt="loading"
            width={100}
            height={100}
            priority={true}
            className=" fixed top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]"
            />

        </div>
    )
}