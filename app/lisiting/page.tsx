'use client'
import { keys } from "@/constant/key";
import { useAppDispatch } from "@/helper/hook"
import { addCart } from "@/services/redux/cartSlice";
import { useRouter } from "next/navigation";

const cartLists = [
    {
        title : 'Lorem ipsum dolor sit amet consectetur.',
        price : 'USD .300.00',
        desc : 'UK S (6-8) | EU 28 | US-4',
        item_count : 1
    }
];


const page = () => {

    const dispatch = useAppDispatch();
    const router = useRouter();

    const addToCart = () => {

        localStorage.setItem(keys.CART, JSON.stringify(cartLists));
        dispatch(addCart(cartLists));
        router.push('/cart');
    }

  return (
    <div>page</div>
  )
}

export default page