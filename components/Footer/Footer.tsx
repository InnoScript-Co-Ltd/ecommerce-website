import Image from "next/image";
import "./footer.css";
import VisaPayment from "../../public/visa.png"
import SecondPayment from "../../public/second_payment.png";
import ThirdPayment from "../../public/third_payment.png"
import AMEX from "../../public/amex.png"
import { FaInstagram, FaFacebookF, FaPinterest } from "react-icons/fa";


const Footer = () => {
    return (
        <div className=" bg-white flex justify-center">

            <div className=" w-full  md:w-[800px] lg:w-[1000px] px-[20px] lg:px-0 mt-[70px] pb-[50px]">

                <div className=" w-full h-[1px] bg-gray opacity-[15%]"></div>

                <div className=" w-full grid grid-rows-3 md:grid-rows-none lg:grid-cols-3 gap-5 lg:gap-0 mt-[20px]">

                    <div>
                        <h1 className=" text-[16px] font-bold leading-[19px] text-gray">Payment Method</h1>

                        <ul className=" mt-[20px] flex flex-col gap-3">

                            <li>
                                <Image src={VisaPayment} alt="payment one" />
                            </li>

                            <li>
                                <Image src={SecondPayment} alt="payment two" />
                            </li>

                            <li>
                                <Image src={ThirdPayment} alt="payment third" />
                            </li>

                            <li>
                                <Image src={AMEX} alt="payment four" />
                            </li>

                        </ul>
                    </div>

                    <div>
                        <h1 className=" text-[16px] font-bold leading-[19px] text-gray">Help</h1>

                        <ul className=" mt-[20px] flex flex-col gap-3">

                            <li className=" font-bold text-[16px] leading-[19px] text-black-50">
                                <p>Contact Us</p>
                            </li>

                            <li className=" font-bold text-[16px] leading-[19px] text-black-50">
                                <p>Delivery</p>
                            </li>

                            <li className=" font-bold text-[16px] leading-[19px] text-black-50">
                                <p>Our Returns Policy</p>
                            </li>

                            <li className=" font-bold text-[16px] leading-[19px] text-black-50">
                                <p>Privacy Policy</p>
                            </li>

                        </ul>
                    </div>

                    <div>
                        <h1 className=" text-[16px] font-bold leading-[19px] text-gray">Social</h1>

                        <ul className=" mt-[20px] flex flex-col gap-3">

                            <li className=" text-black-50">
                                <FaInstagram />
                            </li>

                            <li className=" text-black-50">
                                <FaFacebookF />
                            </li>

                            <li className=" text-black-50">
                                <FaPinterest />
                            </li>

                        </ul>
                    </div>


                </div>

            </div>

        </div>
    )
}

export default Footer;