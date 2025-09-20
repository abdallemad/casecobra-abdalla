import { getPaymentStatusAction } from "@/actions/get-payment-status-action";
import { useQuery } from "@tanstack/react-query";
function useGetOrderStatus({ orderId }: { orderId: string }) {
  const { data, isLoading } = useQuery({
    queryKey: ["get-payment-status"],
    queryFn: () => getPaymentStatusAction({ orderId }),
    retry: true,
    retryDelay: 1000,
  });

  return {
    data,
    isLoading,
  };
}

export default useGetOrderStatus;
