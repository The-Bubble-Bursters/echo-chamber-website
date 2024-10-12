import { useState, useEffect } from 'react';
import { auth } from '../firebase';
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs } from 'firebase/firestore';
import Button from '@mui/material/Button';
import { createPortalLink } from '../firebase-functions/createPortalLink'

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

  const createStripePortal = async (uid) => {
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

  useEffect(() => {
    // Listener for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedInUser({
          uid: user.uid,
          displayName: user.displayName,
          email: user.email
        });
      } else {
        setLoggedInUser(null);
        setSubscriptions(null); // Clear subscription when user logs out
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // Fetch subscription only when loggedInUser is set
    if (loggedInUser) {
      fetchSubscription(loggedInUser.uid);
    }
  }, [loggedInUser]); // Runs whenever loggedInUser changes

  if (loggedInUser === null) {
    return <div>Not logged in</div>;
  } else {
    return (
      <div>
        <h1>Your Profile</h1>
        <p>Name: {loggedInUser.displayName}</p>
        <p>Email: {loggedInUser.email}</p>
        <h2>Subscription Status</h2>
        {subLoading ? (
          <p>Loading subscription...</p>
        ) : subscriptions && subscriptions.length > 0 ? subscriptions.map(subscription => (
          <div key={subscription.id}>
            <p>Status: {subscription.status}</p>
            <p>Role: {subscription.role}</p>
            <p>Plan: {subscription.items[0].price.product.name}</p>
            <Button variant="contained" onClick={() => createPortalLink()}>
              Manage Subscription
            </Button>
          </div>
        )) : (
          <p>No active subscription found.</p>
        )}
      </div>
    );
  }
}

export default Profile;
