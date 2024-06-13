import Link from "next/link";
import Success from "../../../public/success.svg"
import Image from "next/image";


const success = () => {
    return (
        <div className=" w-full min-h-screen flex items-center justify-center">

            <div className=" w-[300px] md:w-[450px] bg-white shadow-lg p-[30px]">
                <Image
                    src={Success}
                    width={50}
                    height={50}
                    alt="Success icon"
                    className=" block mx-auto"
                />
                <h1 className=" text-center text-2xl font-semibold">Thanks for your shopping with us!</h1>
                <div className=" flex items-center justify-center mt-[10px]">
                    <Link
                        href={'/'}
                        className=" bg-black text-white px-3 py-2 rounded-[20px]"
                    >
                        Go Back
                    </Link>
                </div>
            </div>

        </div>
    )
}

export default success;