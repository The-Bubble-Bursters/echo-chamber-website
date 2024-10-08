
import { useState, useEffect } from 'react';
import { auth } from '../firebase';
import { onAuthStateChanged } from "firebase/auth";

function Profile() {
  const [loggedInUser, setLoggedInUser] = useState(null);


  useEffect(() => {
    // async listener
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedInUser(user.providerData)
      }
      else {
        setLoggedInUser(null)
      }
    });

    // Cleanup subscription when the component unmounts
    return () => unsubscribe();
  }, []);

  if (loggedInUser === null) {
    return <div>Not logged in</div>
  }
  else {
    return (
      <div>
        <h1>Hello {loggedInUser[0].displayName}</h1>
        <p>Email: {loggedInUser[0].email}</p>
      </div>
    );
  }

}

export default Profile
