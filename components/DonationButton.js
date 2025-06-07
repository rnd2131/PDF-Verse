// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Button } from "@chakra-ui/react";

const stripePromise = loadStripe(
  "pk_live_51IUqMCJ2iOysJZvP8AxPuY7Oflx4CA02El4scyZFHSjppcduMwGrO5sniEkrxu0sqTLTNtGJghy4JF60bfKjSCMd00dQHwGtrd"
);

const DonationButton = ({ itemID, ammount }) => {

  const handleClick = async (event) => {
    const stripe = await stripePromise;
    stripe
      .redirectToCheckout({
        lineItems: [{ price: itemID, quantity: 1 }],
        mode: "payment",
        successUrl: window.location.protocol + "//localpdf.tech/merge",
        cancelUrl: window.location.protocol + "//localpdf.tech/merge",
        submitType: "donate",
      })
      .then(function (result) {
        if (result.error) {
          console.log(error);
        }
      });
  };

  return (
    <Button
    variant="outline"
    colorScheme="orange"
      onClick={handleClick}
    >
      Donate {ammount}$
    </Button>
  );
};

export default DonationButton;
