import { useState, useEffect } from 'react';
import { collection, query, where, getDocs, addDoc, onSnapshot } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { db, auth } from '../firebase';

// Material UI components
import {
  Box,
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  CircularProgress,
  Grid2,
  Dialog,
  DialogContent,
  DialogTitle
} from '@mui/material';
import { Link } from 'react-router-dom';

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [subscriptions, setSubscriptions] = useState(null);
  const [subLoading, setSubLoading] = useState(true);
  const [openLoadingDialog, setOpenLoadingDialog] = useState(false);
  const [redirecting, setRedirecting] = useState(false);

  const fetchSubscription = async (uid) => {
    if (uid) {
      setSubLoading(true);
      try {
        const subscriptionRef = collection(db, `customers/${uid}/subscriptions`);
        const subscriptionDocs = await getDocs(subscriptionRef);
        const userSubscriptions = subscriptionDocs.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setSubscriptions(userSubscriptions);
      } catch (error) {
        console.error("Error fetching subscription: ", error);
      } finally {
        setSubLoading(false);
      }
    }
  };

  const createCheckoutSession = async (currentUser, priceId) => {
    if (!currentUser) {
      alert("You must be logged in to proceed with checkout.");
      return;
    }
    try {
      setOpenLoadingDialog(true);
      const checkoutSessionsRef = collection(db, "customers", currentUser.uid, "checkout_sessions");
      const docRef = await addDoc(checkoutSessionsRef, {
        price: priceId,
        success_url: window.location.origin,
        cancel_url: window.location.origin,
      });

      onSnapshot(docRef, (snap) => {
        const { error, url } = snap.data();
        if (error) {
          alert(`An error occurred: ${error.message}`);
        }
        if (url) {
          setRedirecting(true);
          window.location.assign(url);
        }
      });
    } catch (error) {
      console.error("Error creating checkout session:", error);
      alert("Failed to create checkout session.");
    } finally {
      setOpenLoadingDialog(false);
    }
  };

  const getProducts = async () => {
    try {
      const productsRef = collection(db, "products");
      const q = query(productsRef, where("active", "==", true));

      const querySnapshot = await getDocs(q);
      const productsArray = [];

      for (const doc of querySnapshot.docs) {
        const productData = doc.data();
        const pricesRef = collection(doc.ref, "prices");
        const priceSnap = await getDocs(pricesRef);
        const prices = priceSnap.docs.map((priceDoc) => {
          const priceData = priceDoc.data();
          const isRecurring = priceData.type === 'recurring';
          
          return {
            id: priceDoc.id,
            amount: (priceData.unit_amount / 100).toFixed(2),
            currency: priceData.currency.toUpperCase(),
            type: priceData.type,
            interval: isRecurring ? priceData.recurring?.interval : null
          };
        });

        productsArray.push({
          id: doc.id,
          ...productData,
          prices
        });
      }

      setProducts(productsArray);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products and prices:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedInUser({
          uid: user.uid
        });
      } else {
        setLoggedInUser(null);
      }
    });
    getProducts();

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (loggedInUser) {
      fetchSubscription(loggedInUser.uid);
    }
  }, [loggedInUser]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 4, backgroundColor: '#f2a1c4' }}>
      {loggedInUser && subLoading ? (
        <Typography align="center" color="white">Loading subscription...</Typography>
      ) : subscriptions && subscriptions.length > 0 ? (
        <Typography align="center" color="white">
          Please note that <b>you currently have an active subscription</b>. Go to your <Link to="/profile">Profile Page</Link> to view and manage
        </Typography>
      ) : null}
      
      <Typography variant="h4" gutterBottom align="center" sx={{ color: '#014397' }}>
        Echo Chamber Premium
      </Typography>
      
      {products.length > 0 ? (
        <Grid2 container spacing={4} justifyContent="center">
          {products.map((product) => (
            <Grid2 xs={12} sm={6} md={4} key={product.id}>
              <Card variant="outlined" sx={{ borderColor: '#014397' }}>
                <CardContent>
                  <Typography variant="h5" gutterBottom sx={{ color: '#014397' }}>
                    {product.name}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {product.description}
                  </Typography>

                  <Typography variant="h6" mt={2} sx={{ color: '#014397' }}>Prices:</Typography>
                  <ul>
                    {product.prices.map((price) => (
                      <li key={price.id} style={{ listStyleType: 'none' }}>
                        <Typography sx={{ color: '#014397' }}>
                          {price.amount} {price.currency} - {price.type === 'recurring' 
                            ? `Recurring (${price.interval})` 
                            : 'One-time'}
                        </Typography>
                        <CardActions>
                          <Button
                            variant="contained"
                            sx={{ backgroundColor: '#014397', color: 'white' }} // Use navy color
                            fullWidth
                            onClick={() => createCheckoutSession(loggedInUser, price.id)}
                          >
                            Checkout
                          </Button>
                        </CardActions>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </Grid2>
          ))}
        </Grid2>
      ) : (
        <Typography align="center">No products found</Typography>
      )}
      <Dialog open={openLoadingDialog} onClose={() => setOpenLoadingDialog(false)} aria-labelledby="alert-dialog-title">
        <DialogTitle id="alert-dialog-title">Processing...</DialogTitle>
        <DialogContent>
          <CircularProgress />
          {redirecting ? (
            <Typography>Redirecting you to Stripe for payment...</Typography>
          ) : (
            <Typography>Please wait while we prepare your payment.</Typography>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default Products;
