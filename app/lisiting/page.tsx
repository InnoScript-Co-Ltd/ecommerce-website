'use client'
import { keys } from "@/constant/key";
import { useAppDispatch, useAppSelector } from "@/helper/hook"
import { addCart, addCartCount, reduceCartCount, Color, Size } from "@/services/redux/cartSlice";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { HeartIcon } from "@radix-ui/react-icons";
import { FaCheck } from "react-icons/fa6";
import ruler from "@/public/ruler-vertical.svg fill.svg";

//carousel shadcn ui
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Suspense, useCallback, useEffect, useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { addExchange } from "@/services/redux/exchangeSlice";
import { baseURL, endpoints } from "@/constant/endpoints";
import Loading from "../loading";
import { addFav } from "@/services/redux/favSlice";

interface ITEM {
  id: number,
  similar_shop: any,
  title: string,
  sell_price: any,
  promotion_price: any,
  size: any,
  color: any,
  product_detail_content: string,
  detail_images: Array<any>,
  product: {
    id: number,
    product_name: string,
    title: string,
    bg_image: {
      id: number,
      image: string;
    },
    description: string,
    man_or_woman: string,
    is_public: string,
  }
}

const page = ({
  searchParams,
}: {
  searchParams: {
    item: string,
  }
}) => {

  const [loading, setLoading] = useState<boolean>(false);
  const [selectColor, setSelectColor] = useState<string>('');
  const [selectSize, setSelectSize] = useState<string>();
  const [sizeLists, setSizeLists] = useState([]);
  const [mounted, setMounted] = useState<boolean>(false);
  const [choose, setChoose] = useState({
    color: "",
    size: "",
    count: 1
  });
  const [item, setItem] = useState<ITEM>();
  const [selectFav, setSelectFav] = useState<boolean>(false);

  const cartLists = useAppSelector(state => state.cart);
  const dispatch = useAppDispatch();
  const exchange = useAppSelector((state) => state.exchnage);
  const favState = useAppSelector((state) => state.fav);
  const router = useRouter();



  const addCount = () => {
    const newCount = { ...choose };
    newCount.count += 1;
    setChoose(newCount);
  }

  const reduceCount = () => {
    if (choose.count > 1) {
      const newCount = { ...choose };
      newCount.count -= 1;
      setChoose(newCount);
    }
  }

  const addToCart = () => {

    const cart = {
      id: item?.id,
      title: item?.title,
      price: item?.sell_price,
      promotionPrice: item?.promotion_price,
      desc: item?.product_detail_content,
      image: item?.detail_images,
      choose_count: choose.count,
      choose_color: choose.color,
      choose_size: choose.size
    }
    dispatch(addCart(cart));
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setMounted(true);
      const exchangeLocal = localStorage.getItem(keys.EXCHANGE);
      if (exchangeLocal) {
        const parsedExchange = JSON.parse(exchangeLocal);
        dispatch(addExchange(parsedExchange));
      }
    }
  }, [dispatch]);

  const getItem = useCallback(async () => {

    if (searchParams.item) {
      setLoading(true);
      const response = await fetch(`${baseURL}${endpoints.item}/${searchParams.item}`);
      const data = await response.json();
      if (data.data) {
        setItem(data.data);
        setLoading(false);
      } else {
        setLoading(false);
      }

    }

  }, [searchParams.item])

  useEffect(() => {
    getItem()
  }, [getItem])

  useEffect(() => {
    if (item?.size) {
      const sizeLists = [];
      sizeLists.push(JSON.parse(item?.size));
      setSizeLists(sizeLists[0].split(','));
    }
  }, [item])

  useEffect(() => {
    if(cartLists.cart.length > 0 && item){
      cartLists.cart.filter((cart : any) => {
        
        if(cart?.id === item?.id){
          console.log(cart);
          
          setSelectColor(cart.choose_color);
          setSelectSize(cart.choose_size);
          setChoose({
            ...choose,
            color: cart.choose_color,
            size : cart.choose_size,
            count : cart.choose_count
          })
        }
      })
    }
  }, [cartLists.cart, item])
  

  useEffect(() => {
    if(favState.fav.length > 0){
      favState.fav.map((fav) => {        
        if(fav.id === item?.id){
          setSelectFav(true);
        }
      })
    }

  }, [favState.fav, item])
  

  return (
    <Suspense fallback={<Loading />}>

      {loading && (
        <Loading />
      )}

      <div className=" grid grid-cols-5 px-[10px] lg:px-[50px] mt-[50px]">
        <div className="col-span-5 md:col-span-1 col-start-1">

          <div className="w-full h-full flex flex-col relative">
            {
              loading === false && item?.detail_images?.slice(0, 4).map((image, index) => {
                return (
                  <Image
                    key={index}
                    loading="lazy"
                    src={`${endpoints.image}/${image?.image}`}
                    alt="listing image"
                    width={0}
                    height={0}
                    objectFit="cover"
                    unoptimized={true}
                    className=" w-full h-[200px]"
                  // sizes="(max-width: 768px) 100%, (max-width: 1200px) 100%, (max-height: 200px) 200px"
                  />
                )
              })
            }
          </div>


        </div>
        <div className="col-span-5 md:col-span-2 col-start-1 md:col-start-2 relative">

          <Carousel
            opts={{
              loop: true
            }}
            className=" w-full h-[800px] relative"
          >
            <CarouselContent>
              {
                item?.detail_images.map((image, index) => (
                  <CarouselItem
                    key={index}
                    className=" w-full h-full"
                  >
                    <Image
                      src={`${endpoints.image}/${image?.image}`}
                      unoptimized={true}
                      alt="detail image"
                      width={0}
                      height={0}
                      objectFit="contain"
                      className=" w-full h-[800px]"
                      priority={true}
                    />
                  </CarouselItem>
                ))
              }
            </CarouselContent>
            <CarouselPrevious className=" absolute left-5 top-[50%] translate-x-0 -translate-y-[50%]" />
            <CarouselNext className=" absolute right-5 top-[50%] translate-x-0 -translate-y-[50%]" />
          </Carousel>


        </div>
        <div className="col-span-5 md:col-span-2 p-5">
          <h1 className=" text-2xl font-bold">{item?.title}</h1>
          {mounted && (
            <div className=" flex items-center justify-start gap-3 my-3">
              <p className=" line-through font-bold text-xl text-grey">${exchange.exchange.rate ? (item?.sell_price * exchange.exchange.rate) : item?.sell_price}</p>
              <span className=" text-red-500 font-bold text-xl">${exchange.exchange.rate ? (item?.promotion_price * exchange.exchange.rate) : item?.promotion_price}</span>
            </div>
          )}
          {/* color  */}
          <h3 className=" font-semibold text-lg">Color</h3>
          <div className=" flex flex-wrap items-center justify-start gap-3">
            {
              item?.color.length > 0 && JSON.parse(item?.color).split(',')?.map((color: string, index: number) => {
                
                return (
                  <div
                    key={`color_${index}`}
                    style={{
                      width: '35px',
                      height: '35px',
                      color: 'white',
                      background: color,
                      borderRadius: '50%',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      cursor: 'pointer'
                    }}
                    onClick={() => {
                      setSelectColor(color);
                      setChoose({...choose, color: color});
                      dispatch(Color({
                        id: item?.id, 
                        color: color
                    }));
                    }}
                    className=" font-bold active:scale-110 active:shadow transition-all duration-300 ease-in"
                  >
                    {color === selectColor && (
                      <FaCheck fontSize={20} />
                    )}
                  </div>
                )
              })
            }
          </div>

          {/* size */}
          <h3 className=" font-semibold text-lg text-gray mt-3">Size</h3>
          <div className=" flex flex-wrap items-center justify-start gap-3">
            {

              sizeLists.length > 0 && sizeLists?.map((size, index) => {
                return (
                  <div
                    key={`size_${index}`}
                    onClick={() => {
                      setSelectSize(size)
                      setChoose({...choose, size : size})
                      dispatch(Size({
                        id: item?.id,
                        size: size
                      }))
                    }}
                    className={`${size === selectSize ? ' bg-black text-white font-bold shadow' : ''} w-[40px] h-[40px] border border-black rounded-sm uppercase flex items-center justify-center transition-all duration-300 ease-in cursor-pointer`}
                  >
                    {size}
                  </div>
                )
              })
            }
          </div>

          <div className=" flex items-center justify-start gap-2 mt-3">
            <Image
              loading="lazy"
              src={ruler}
              alt="ruler icon"
              style={{
                width: '12px',
                height: '14px',
              }}
            />
            <p className=" uppercase text-gray">Size Guid</p>
          </div>

          <div className=" flex items-center justify-between md:justify-start gap-2 mt-5 select-none">
            <div className=" flex items-center justify-start gap-2">
              <p>{choose.count}</p>
              <div className=" flex flex-col items-center justify-center gap-1">
                <MdKeyboardArrowUp onClick={() => {
                  if(cartLists.cart.length > 0){
                    cartLists.cart.map((cart) => {
                      if(cart.id === item?.id){
                        dispatch(addCartCount({id: item?.id}))
                      }else {
                        addCount();
                      }
                    })
                  }else {
                    addCount();
                  }
        
                }} className=" cursor-pointer active:text-primary active:scale-105 hover:scale-105 w-[20px] h-[20px] border-[1px] border-[#B9B8B9] rounded-full" size={20} />
                <MdKeyboardArrowDown onClick={() => {
                  if(cartLists.cart.length > 0){
                    dispatch(reduceCartCount({id: item?.id}))
                  }
                }} className=" cursor-pointer active:text-primary active:scale-105 hover:scale-105 w-[20px] h-[20px] border-[1px] border-[#B9B8B9] rounded-full" size={20} />
              </div>
            </div>

            <button
              onClick={addToCart}
              className=" bg-green-500 active:scale-105 active:shadow-lg text-white w-[200px] h-[50px] grid items-center transition-all duration-300 ease-in"
            >
              Add To Bag
            </button>

            <button 
              className={`${selectFav ? 'text-white bg-red-500 border-none' : 'border border-black'} w-[50px] h-[50px] grid items-center justify-center rounded-sm `}
              onClick={() => {
                dispatch(addFav(item))
              }}
            >
              <HeartIcon width={'20px'} height={'20px'} />
            </button>

          </div>

          <button onClick={() => router.push('/checkout')} className=" w-full lg:w-[300px] h-[50px] mt-3 active:scale-105 active:shadow-lg border border-black flex items-center justify-center transition-all duration-300 ease-in">
            Checkout Now
          </button>



        </div>

      </div>

      <div>
        <h1 className=" text-center font-bold text-xl my-[50px]">Similar Product</h1>
        <div className="w-full h-full relative">
          <Image
            src={`${endpoints.image}/${item?.product.bg_image.image}`}
            alt="detail image"
            width={0}
            height={0}
            layout="responsive"
            objectFit="cover"
            className=" w-full h-full"
            quality="100"
            loading={"lazy"}
          />

          <div className=" absolute top-[50%] left-[5%] -translate-y-[50%] text-white">
            <h1 className=" text-[20px] md:text-[45px] font-bold leading-3 md:leading-10">{item?.product.title}</h1>
            <p className=" text-[18px] md:text-[30px] font-semibold leading-5 md:leading-[30px] pt-3">{item?.product.description}</p>
            <button
              className=" mt-[30px] flex items-center justify-start gap-3 font-bold text-[20px] leading-[24px] transition duration-150 ease-in-out hover:bg-primary-accent-200 hover:shadow-lg active:text-primary active:shadow-md motion-reduce:transition-none"
            >
              Explore
            </button>
          </div>

        </div>
      </div>

    </Suspense>
  )
}

export default page