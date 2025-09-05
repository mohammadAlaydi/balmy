import { cn } from "@/lib/utils";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";

export default function ZeroQuantity() {
    return (
        <div className="z-50 absolute top-0 left-0 w-full h-full flex justify-center items-end rounded-lg">
            {/* Background overlay */}
            <div className="absolute w-full h-full bg-white blur-2xl opacity-60 z-0 rounded-lg"></div>
            {/* Centered content */}
            <div className="z-10 pb-10">
                <Card
                    className={cn(
                        "w-[80px] h-[80px] sm:w-[85px] sm:h-[85px] sm:w-[130px] sm:h-[130px] rotate-[-35deg] rounded-full flex flex-col items-center justify-center font-bold",
                        "bg-black border-[8px] border-solid border-red-color"
                    )}
                >
                    <CardContent className="flex flex-col items-center justify-center p-0 text-center">
                        <Badge className="text-white p-0 bg-transparent text-xs sm:text-sm md:text-lg ">لم يعد</Badge>
                        <Badge className="text-red-color p-0 bg-transparent text-xs sm:text-sm md:text-lg">الصنف</Badge>
                        <Badge className="text-white p-0 bg-transparent text-xs sm:text-sm md:text-lg">متوفر</Badge>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}