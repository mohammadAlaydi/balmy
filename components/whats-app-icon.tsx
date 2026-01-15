import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppIcon() {
    return (
        <Link href="https://wa.me" >
            <FaWhatsapp className="fixed bottom-20 right-5 w-[30px] h-[30px] sm:w-[40px] sm:h-[40px] text-[#25D366] rounded-full shadow-lg  transition z-[1000]"/>
        </Link>
    )
}

