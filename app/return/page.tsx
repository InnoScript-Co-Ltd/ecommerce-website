import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


const return = () => {

    const [status, setStatus] = useState(null);
    const [customerEmail, setCustomerEmail] = useState('');

    const router = useRouter();

    useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const sessionId = urlParams.get('session_id');

    //     fetch("/status.php", {
    //         headers: {
    //             Accept: "application/json",
    //             "Content-Type": "application/json",
    //         },
    //         method: "POST",
    //         body: JSON.stringify({ session_id: sessionId }),
    //     })
    //         .then((res) => res.json())
    //         .then((data) => {
    //             setStatus(data.status);
    //             setCustomerEmail(data.customer_email);
    //         });
    // }, []);

    if (status === 'open') {
        router.forward('/checkout');
    }

    if (status === 'complete') {
        return (
            <section id="success">
                <p>
                    We appreciate your business! A confirmation email will be sent to {customerEmail}.

                    If you have any questions, please email <a href="mailto:orders@example.com">orders@example.com</a>.
                </p>
            </section>
        )
    }

    return null;
}

export default return;
