import { useState, useEffect } from 'react';
import { collection, query, where, getDocs, addDoc, onSnapshot } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { db, auth } from '../firebase';

// Material UI components
import { Box, Card, CardContent, CardActions, Button, Typography, CircularProgress, Grid2, Dialog, DialogContent, DialogTitle } from '@mui/material';
import { Link } from 'react-router-dom';

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [subscriptions, setSubscriptions] = useState(null);
  const [subLoading, setSubLoading] = useState(true);
  const [openLoadingDialog, setOpenLoadingDialog] = useState(false);
  const [redirecting, setRedirecting] = useState(false); // State to control redirection


  const fetchSubscription = async (uid) => {
    if (uid) {
      setSubLoading(true);
      try {
        const subscriptionRef = collection(db, `customers/${uid}/subscriptions`);
        const subscriptionDocs = await getDocs(subscriptionRef);
        const userSubscriptions = subscriptionDocs.docs.map(doc => ({
          id: doc.id, // Subscription ID
          ...doc.data() // Subscription data
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
      setOpenLoadingDialog(true)
      // Add a checkout session for the current user
      const checkoutSessionsRef = collection(db, "customers", currentUser.uid, "checkout_sessions");
      const docRef = await addDoc(checkoutSessionsRef, {
        price: priceId,  // Use dynamic price ID
        success_url: window.location.origin,
        cancel_url: window.location.origin,
      });

      // Listen for updates on the checkout session
      onSnapshot(docRef, (snap) => {
        const { error, url } = snap.data();
        if (error) {
          alert(`An error occurred: ${error.message}`);
        }
        if (url) {
          setRedirecting(true)
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
        
        // Fetch prices subcollection
        const pricesRef = collection(doc.ref, "prices");
        const priceSnap = await getDocs(pricesRef);
        const prices = priceSnap.docs.map((priceDoc) => {
          const priceData = priceDoc.data();
          const isRecurring = priceData.type === 'recurring';
          
          // Format price object
          return {
            id: priceDoc.id,
            amount: (priceData.unit_amount / 100).toFixed(2), // Convert cents to dollars
            currency: priceData.currency.toUpperCase(),
            type: priceData.type,
            interval: isRecurring ? priceData.recurring?.interval : null // Get interval if it's recurring
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
      })
      }
      else {
        setLoggedInUser(null)
      }
    });
    getProducts();

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // Fetch subscription only when loggedInUser is set
    if (loggedInUser) {
      fetchSubscription(loggedInUser.uid);
    }
  }, [loggedInUser]); // Runs whenever loggedInUser changes

  // Render loading state
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  // Render products and prices
  return (
    <Box sx={{ padding: 4 }}>
      { loggedInUser && subLoading ? (
          <p>Loading subscription...</p>
        ) : subscriptions && subscriptions.length > 0 ? (
          <p>Please note that <b>you currently have an active subscription</b>. Go to your <Link to="/profile">Profile Page</Link> to view and manage</p>
        ) : null
      }
      <Typography variant="h4" gutterBottom>
        Echo Chamber Premium
      </Typography>
      
      {products.length > 0 ? (
        <Grid2 container spacing={4}>
          {products.map((product) => (
            <Grid2 xs={12} sm={6} md={4} key={product.id}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    {product.name}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {product.description}
                  </Typography>

                  <Typography variant="h6" mt={2}>Prices:</Typography>
                  <ul>
                    {product.prices.map((price) => (
                      <li key={price.id}>
                        {price.amount} {price.currency} - {price.type === 'recurring' 
                          ? `Recurring (${price.interval})` 
                          : 'One-time'}
                        <CardActions>
                          <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            onClick={() => createCheckoutSession(loggedInUser, price.id)} // Use dynamic price ID
                          >
                            Checkout
                          </Button>
                          <Dialog open={openLoadingDialog} onClose={() => setOpenLoadingDialog(false)} aria-labelledby="alert-dialog-title">
                            <DialogTitle id="alert-dialog-title">Processing...</DialogTitle>
                            <DialogContent>
                              <CircularProgress />
                              {redirecting ? (
                                <p>Redirecting you to Stripe for payment...</p>
                              ) : (
                                <p>Please wait while we prepare your payment.</p>
                              )}
                            </DialogContent>
                          </Dialog>
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
        <Typography>No products found</Typography>
      )}
    </Box>
  );
}

export default Products;
