import { useState, useEffect } from 'react';
import { auth } from '../firebase';
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs } from 'firebase/firestore';
import Button from '@mui/material/Button';
import { createPortalLink } from '../firebase-functions/createPortalLink';
import Products from './Products';
import { Typography, CircularProgress, Box, Grid2 } from '@mui/material';

import { db } from '../firebase';

function Profile() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [subscriptions, setSubscriptions] = useState(null);
  const [subLoading, setSubLoading] = useState(true);

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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedInUser({
          uid: user.uid,
          displayName: user.displayName,
          email: user.email
        });
      } else {
        setLoggedInUser(null);
        setSubscriptions(null);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (loggedInUser) {
      fetchSubscription(loggedInUser.uid);
    }
  }, [loggedInUser]);

  if (loggedInUser === null) {
    return <div>Not logged in</div>;
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: '100vh', padding: 2 }}
    >
      <Typography variant="h4" gutterBottom>Your Profile</Typography>
      <Typography variant="h6">Name: {loggedInUser.displayName}</Typography>
      <Typography variant="h6">Email: {loggedInUser.email}</Typography>
      
      <Typography variant="h5" sx={{ marginTop: 2 }}>Subscription Status</Typography>

      {subLoading ? (
        <CircularProgress sx={{ marginTop: 2 }} />
      ) : subscriptions && subscriptions.length > 0 ? (
        <Grid2 container spacing={2} sx={{ marginTop: 2 }}>
          {subscriptions.map(subscription => (
            <Grid2 item xs={12} sm={6} md={4} key={subscription.id}>
              <Box 
                border={1} 
                borderColor="grey.400" 
                borderRadius={2} 
                padding={2} 
                display="flex" 
                flexDirection="column" 
                alignItems="center"
              >
                <Typography>Status: {subscription.status}</Typography>
                <Typography>Role: {subscription.role}</Typography>
                <Typography>Plan: {subscription.items[0].price.product.name}</Typography>
                <Button variant="contained" onClick={() => createPortalLink()}>
                  Manage Subscription
                </Button>
              </Box>
            </Grid2>
          ))}
        </Grid2>
      ) : (
        <Box sx={{ marginTop: 2 }}>
          <Typography>No active subscription found.</Typography>
          <Products />
        </Box>
      )}
    </Box>
  );
}

export default Profile;
