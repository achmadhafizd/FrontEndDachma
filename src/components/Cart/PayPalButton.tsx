import { FC } from "react";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { PaymentDetails } from "./Checkout";

interface PayPalButtonProps {
  amount: number;
  onSuccess: (details: PaymentDetails) => void;
  onError: () => void;
}

const PayPalButton: FC<PayPalButtonProps> = ({
  amount,
  onSuccess,
  onError,
}) => {
  return (
    <PayPalScriptProvider
      options={{
        clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID,
      }}
    >
      <PayPalButtons
        style={{ layout: "vertical" }}
        createOrder={(_data, actions) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                amount: {
                  currency_code: "USD",
                  value: parseFloat(amount.toString()).toFixed(2),
                },
              },
            ],
          });
        }}
        onApprove={async (_, actions) => {
          if (actions.order) {
            const details = await actions.order.capture();
            const paymentDetails: PaymentDetails = {
              paymentDetails: {
                transactionId: details.id ?? "unknown",
                paymentGateway: "paypal",
                amount: parseFloat(
                  details.purchase_units?.[0]?.payments?.captures?.[0]?.amount
                    ?.value ?? "0"
                ),
                currency:
                  details.purchase_units?.[0]?.payments?.captures?.[0]?.amount
                    ?.currency_code ?? "USD",
              },
            };

            onSuccess(paymentDetails);
          }
        }}
        onError={onError}
      />
    </PayPalScriptProvider>
  );
};

export default PayPalButton;
