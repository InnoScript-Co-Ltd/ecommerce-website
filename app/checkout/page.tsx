
'use client'
// import { useEffect, useState } from "react";

// import { Elements } from "@stripe/react-stripe-js";
// import { Stripe, loadStripe } from "@stripe/stripe-js";
// import CheckoutForm from "@/components/checkout/Checkout";

function Payment() {
  // const [stripePromise, setStripePromise] = useState<Promise<Stripe | null>>();
  // const [clientSecret, setClientSecret] = useState("");

  // useEffect(() => {
  //   fetch("http://localhost:5252/config").then(async (r) => {
  //     const { publishableKey } = await r.json();
  //       publishableKey && setStripePromise(loadStripe(publishableKey));
  //   });
  // }, []);

  // useEffect(() => {
  //   fetch("http://localhost:5252/create-payment-intent", {
  //     method: "POST",
  //     body: JSON.stringify({}),
  //   }).then(async (result) => {
  //     var { clientSecret } = await result.json();
  //     setClientSecret(clientSecret);
  //   });
  // }, []);

  return (
    <div 
      // className=" w-full min-h-screen flex items-center justify-center"
      className="min-h-screen"
    >
      {/* {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      )} */}
    </div>
  );
}

export default Payment;