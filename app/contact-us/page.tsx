'use client'
import { baseURL, endpoints } from "@/constant/endpoints";
import { FormEvent, Suspense, useRef, useState } from "react";
import { MdOutlineEmail } from "react-icons/md";
import { useToast } from "@/components/ui/use-toast"
import Loading from "../loading";

const page = () => {

  const [loading, setLoading] = useState<boolean>(false);
  const form = useRef<any>();
  const { toast } = useToast();

  const submitContact = async (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData(form.current);
    setLoading(true);

    try {
      const response = await fetch(`${baseURL}${endpoints.contact}`, {
        method: 'POST',
        body: formData
      });
      const data = await response.json();

      if (typeof data.data.subject !== 'string') {
        toast({
          variant: "destructive",
          title: 'Validation error you need to fail all the input!',
        });

      } else {
        toast({
          title: 'Your message is successfully sent!',
        });
        form.current.reset(); // Clear the form
      }
    } catch (error: any) {
      console.log(error);

      toast({
        variant: "destructive",
        title: error.message,
      });
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }


  }

  return (
    <Suspense fallback={<Loading />} >
      <div className="mt-[50px]">
        <div className=" px-[20px] md:px-0 flex items-center justify-center ">
          <div className="  w-full md:w-[430px]">
            <h3 className=" text-xl font-bold">Contact Us</h3>

            <form ref={form} onSubmit={submitContact} action="" className=" mt-[20px]">

              <input disabled={loading} type="text" className=" w-full px-[5px] py-[10px] border-b-[1px] border-[#757575] outline-none" placeholder="Subject" name="subject" />

              <input disabled={loading} type="text" className=" w-full px-[5px] py-[10px] border-b-[1px] border-[#757575] outline-none my-[15px]" placeholder="Name" name="name" />

              <input disabled={loading} type="email" className=" w-full px-[5px] py-[10px] border-b-[1px] border-[#757575] outline-none" placeholder="Email" name="email" />

              <textarea disabled={loading} name="message" rows={5} className=" w-full mt-[15px] rounded-none border-[1px] border-black" id=""></textarea>

              <button disabled={loading} className=" uppercase px-[25px] py-[10px] mt-[10px] bg-black text-white font-bold text-xl">Submit</button>

            </form>
          </div>
        </div>

        <div className=" bg-[#F4F5F6] h-[300px] mt-[150px] flex items-center justify-center">

          <div className=" w-full md:w-[400px]">
            <div className=" flex items-center justify-center">
              <MdOutlineEmail size={30} />
            </div>
            <h3 className=" text-center text-[#323232] text-2xl font-bold">Get In Touch</h3>
            <p className=" text-center mt-[10px]">Have questions about your order, or a general inquiry?</p>

            <a href="mailto:test@gmail.com" className=" mx-auto flex items-center justify-center w-[200px] h-[40px] mt-[20px] bg-[#323232] text-white font-bold" >
              Email Us
            </a>
          </div>

        </div>

      </div>
    </Suspense>
  )
}

export default page