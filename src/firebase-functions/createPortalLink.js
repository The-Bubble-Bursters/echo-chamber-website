import { functions } from '../firebase'; // Adjust the path as necessary
import { httpsCallable } from "firebase/functions"; // Import httpsCallable

export const createPortalLink = async () => {
  try {
    const createPortalLinkFunction = httpsCallable(functions, "ext-firestore-stripe-payments-createPortalLink");

    const { data } = await createPortalLinkFunction({
      returnUrl: window.location.origin, // URL to redirect after managing the subscription
      locale: "auto", // Automatically detects user’s locale
    });

    window.location.assign(data.url); // Redirect to the Stripe portal
  } catch (error) {
    console.error("Error creating portal link: ", error);
  }
};
