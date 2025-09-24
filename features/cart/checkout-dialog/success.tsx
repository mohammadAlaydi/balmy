import Link from "next/link";
import { CheckIcon } from "@/components/ui/icons/check-icon";
import { SuccessProps } from "@/types/types";
import { ORDER_INFO_LABELS, SUCCESS_MESSAGES } from "@/static-data/static-data";
import { useDispatch } from "react-redux";
import { resetStatus } from "@/store/slices/cart-slice";
import { useRouter } from "next/navigation";

export default function Success({ data }: SuccessProps) {
  console.log("✅ Success component rendered with data:", data);
  
  // Handle different data structures
  const order = data?.data?.order || data?.data || data;

  // If no order data, show error
  if (!order || !order.id) {
    console.error("No order data available:", data);
    return (
      <div className="p-4 bg-red-100 text-red-800 rounded-md">
        Error: No order data available. Please check the console for details.
      </div>
    );
  }

  const orderInfoItems = [
    { label: ORDER_INFO_LABELS.ORDER_NUMBER, value: `#${order.id}` },
    { label: ORDER_INFO_LABELS.ORDER_STATUS, value: order.status },
    { label: ORDER_INFO_LABELS.SHIPPING_METHOD, value: order.shipping_method },
    {
      label: ORDER_INFO_LABELS.SHIPPING_AMOUNT,
      value: order.shipping_amount + " " + ((order as any)?.channel_currency_code || ""),
    },
    { label: ORDER_INFO_LABELS.PAYMENT_TITLE, value: order.payment_title },
  ];

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-950 p-4 sm:p-6 md:p-8">
      <div className="max-w-md w-full bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden">
        <SuccessHeader />
        <OrderInfoSection orderInfoItems={orderInfoItems} />
        <ActionSection />
      </div>
    </div>
  );
}

function SuccessHeader() {
  return (
    <div className="px-6 py-12 flex flex-col items-center justify-center space-y-4">
      <div className="bg-green-500 dark:bg-green-600 p-4 rounded-full">
        <CheckIcon className="h-8 w-8 text-white" />
      </div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50">
        {SUCCESS_MESSAGES.TITLE}
      </h1>
      <p className="text-gray-500 dark:text-gray-400 text-center">
        {SUCCESS_MESSAGES.DESCRIPTION}
      </p>
    </div>
  );
}

interface OrderInfoSectionProps {
  orderInfoItems: Array<{ label: string; value: string }>;
}

function OrderInfoSection({ orderInfoItems }: OrderInfoSectionProps) {
  return (
    <div className="bg-gray-100 dark:bg-gray-800 px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex flex-col gap-4">
      {orderInfoItems.map((item, index) => (
        <div className="flex justify-between gap-3 items-center" key={index}>
          <p className="text-gray-900 dark:text-gray-50 font-medium">
            {item.value}
          </p>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            {item.label}
          </p>
        </div>
      ))}
    </div>
  );
}

function ActionSection() {
  const dispatch = useDispatch();
  const router = useRouter();
  
  const handleResetAndClose = () => {
    dispatch(resetStatus());
  };

  const handleGoHome = () => {
    dispatch(resetStatus());
    router.push("/home");
  };

  return (
    <div className="px-6 py-4 flex flex-col gap-3">
      <button
        onClick={handleGoHome}
        className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-6 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
      >
        {SUCCESS_MESSAGES.GO_HOME}
      </button>
      <button
        onClick={handleResetAndClose}
        className="inline-flex h-10 items-center justify-center rounded-md bg-gray-200 px-6 text-sm font-medium text-gray-700 shadow transition-colors hover:bg-gray-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50"
      >
        Close Dialog
      </button>
    </div>
  );
}
