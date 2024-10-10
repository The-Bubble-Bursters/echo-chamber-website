import { useState, useEffect } from 'react';
import { collection, query, where, getDocs, addDoc, onSnapshot } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { db, auth } from '../firebase';

// Material UI components
import { Box, Card, CardContent, CardActions, Button, Typography, CircularProgress, Grid2 } from '@mui/material';

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loggedInUser, setLoggedInUser] = useState(null);

  const createCheckoutSession = async (currentUser, priceId) => {
    if (!currentUser) {
      alert("You must be logged in to proceed with checkout.");
      return;
    }
    try {

      // Log currentUser for debugging
      console.log("Current User:", currentUser);
      console.log("User UID:", currentUser.uid); // Check UID
      // Add a checkout session for the current user
      const checkoutSessionsRef = collection(db, "customers", currentUser.uid, "checkout_sessions");
      const docRef = await addDoc(checkoutSessionsRef, {
        price: priceId,  // Replace with actual price ID
        success_url: window.location.origin,
        cancel_url: window.location.origin,
      });

      // Listen for updates on the checkout session
      onSnapshot(docRef, (snap) => {
        const { error, url } = snap.data();
        if (error) {
          // Show an error message if there's an issue
          alert(`An error occurred: ${error.message}`);
        }
        if (url) {
          // Redirect to the Stripe checkout URL
          window.location.assign(url);
        }
      });
    } catch (error) {
      console.error("Error creating checkout session:", error);
      alert("Failed to create checkout session.");
    }
  };


  // Fetch products and prices
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
    // async listener
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedInUser(user.providerData[0])
      }
      else {
        setLoggedInUser(null)
      }
    });
    getProducts();

    // Cleanup subscription when the component unmounts
    return () => unsubscribe();
  }, []);

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
      <Typography variant="h4" gutterBottom>
        Products
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
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <CardActions>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={() => createCheckoutSession(loggedInUser, 'price_1GqIC8HYgolSBA35zoTTN2Zl')}
                >
                  Checkout
                </Button>
                </CardActions>
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
