import { Button } from "@/components/ui/button";
import Image from "next/image";
import ShopPay from "../../public/shop_pay.svg"
import GPay from "../../public/G_pay.svg"
import { Input } from "@/components/ui/input";
import { CheckboxUi } from "@/components/custom/CheckboxUi";
import { SelectUi } from "@/components/custom/SelectUi";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import VisaPayment from "../../public/visa.png"
import SecondPayment from "../../public/second_payment.png";
import ThirdPayment from "../../public/third_payment.png"
import AMEX from "../../public/amex.png"
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "lucide-react";
import { InputUi } from "@/components/custom/InputUi";

const checkout = () => {
    return (
        <>
            <div className=" min-h-screen mt-[100px] grid grid-cols-2">

                <div className=" bg-white px-[90px] shadow-lg border-[#DADADA] border-r-2">

                    <h4 className=" text-[14px] text-[#0000008F] leading-[21px] text-center my-[30px]">Express checkout</h4>

                    <div className=" flex-between gap-5">
                        <Button className=" w-[277.5px] h-[48px] rounded-[5px] bg-blue-default hover:bg-blue-default hover:scale-105 transition-all duration-300 ease-in-out">
                            <Image src={ShopPay} alt="shop pay" />
                        </Button>
                        <Button className=" w-[277.5px] h-[48px] rounded-[5px] bg-black hover:bg-black hover:scale-105 transition-all duration-300 ease-in-out">
                            <Image src={GPay} alt="G pay" />
                        </Button>
                    </div>

                    <div className=" flex-between gap-4 my-[20px]">

                        <div className=" w-full h-[1px] bg-divider-bg"></div>
                        <div className=" text-[14px] leading-[21px]">OR</div>
                        <div className=" w-full h-[1px] bg-divider-bg"></div>

                    </div>

                    <div className=" flex-between">

                        <h1 className=" text-[24px] font-medium leading-[28.8px]">Contact</h1>
                        <div className=" font-normal text-[14px] text-[#0000008F] leading-[21px]">
                            Have an account? <span className=" underline cursor-pointer">Log in</span>
                        </div>

                    </div>

                    <Input className=" mt-[20px] focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-0 " type="email" placeholder="Enter your email" />

                    <CheckboxUi label={'Email me with news and offers'} my={20} />

                    <h1 className=" pt-[20px] font-medium text-[24px] leading-[28.8px]">Delivery</h1>

                    <SelectUi placeholder="Country/Region" selectLabel="Country/Region" w={'full'} my={20} />

                    <div className=" flex-between gap-5">
                        <Input className="focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-0 " placeholder=" First name" />
                        <Input className="focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-0 " placeholder="Last name" />
                    </div>

                    <Input placeholder="Address" className=" mt-[20px]" />

                    <p className=" text-[#69727B] font-normal text-[14px] leading-[21px] my-[20px]">
                        + <span>Add apartment, suite, etc.</span>
                    </p>

                    <div className=" flex-between gap-4">

                        <Input className="focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-0 " placeholder=" City" />

                        <SelectUi placeholder="State" selectLabel="State" w="full" />

                        <Input className="focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-0 " placeholder="PIN code" />

                    </div>

                    <Input placeholder="Phone" className=" mt-[20px]" />

                    <CheckboxUi label="Text me with news and offers" my={20} />

                    <h1 className=" font-medium text-[17px] leading-[20.4px]">Shipping method</h1>

                    <Input className=" bg-[#F6F6F6] my-[20px] h-[55px] focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-0" placeholder=" Enter your shipping address to view available shipping methods." />

                    <h1 className="  font-medium text-[24px] leading-[28.8px] mt-[30px]">Payment</h1>
                    <p className=" text-[#0000008F] font-normal text-[14px] leading-[21px]">All transactions are secure and encrypted.</p>

                    <Accordion type="single" collapsible className="w-full rounded-[5px] my-[20px]">
                        <AccordionItem className=" bg-[#0000000B] custom-accordion" value="item-1">
                            <AccordionTrigger className=" border-[#69727B] px-[20px] rounded-tl-[5px] rounded-tr-[5px] border-l-[1px] border-t-[1px] border-r-[1px]">
                                <div>
                                    <Checkbox className=" rounded-full mr-2" /> Credit card
                                </div>
                                <div>
                                    <ul className=" flex flex-row gap-3">

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
                            </AccordionTrigger>
                            <AccordionContent className=" p-[20px]">
                                <Input className="focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-0 " placeholder=" Card number" />
                                <div>
                                    <InputUi endIcon={Calendar} />
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>

                    <div className=" my-[20px]">

                    </div>


                </div>
                <div className=" bg-checkout-bg">

                </div>

            </div>

        </>
    )
}

export default checkout;