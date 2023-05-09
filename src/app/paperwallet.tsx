"use client";

import {
  InitializedUser,
  PaperEmbeddedWalletSdk,
  UserStatus,
} from "@paperxyz/embedded-wallet-service-sdk";

import { Button } from "react-bootstrap";
import { useState } from "react";
import { useEffect } from "react";

// const fetchData = async () => {
//   const response = await fetch('https://example.com/data');
//   const data = await response.json();
//   return data;
// };

export default function PaperWallet() {
  // // const [count, setCount] = useState(0);
  const [sdk, setsdk] = useState(
    // default paper wallet
    new PaperEmbeddedWalletSdk({
      clientId: "1bcbd6c9-7a6a-418c-864e-ebc257f7e713",
      chain: "Mumbai",
    })
  );
  const [user, setUser] = useState<InitializedUser | null>(null);

  // useEffect(() => {
  //   switch (user?.status) {
  //     case UserStatus.LOGGED_OUT: {
  //       // User is logged out, call one of the auth methods on Paper.auth to authenticate the user
  //       break;
  //     }
  //     case UserStatus.LOGGED_IN_WALLET_INITIALIZED: {
  //       // user is logged in and wallet is all set up.
  //       // You have access to:
  //       user.status;
  //       user.authDetails;
  //       user.walletAddress;
  //       user.wallet;
  //       break;
  //     }
  //   }
  // }, [user]);

  // const getData = async () => {
  //   const newsdk = await sdk.getUser();
  // };
  // getData();
  // sdk.auth.loginWithPaperModal()
  // }, []);

  // Call when the user clicks your "Connect with Paper" button.
  return (
    <div className="p-10">
      <div className="p-10">
        <h1 className="text-2xl font-800">Paper Wallet Info Viewer</h1>
      </div>
      <Button
        style={{ backgroundColor: "#00a8ff", padding: "10px" }}
        onClick={async () => {
          try {
            const gotUser = await sdk.auth.loginWithPaperModal();
            // user is now logged in
            console.log(gotUser);
            setUser(gotUser.user);
          } catch (e) {
            // User closed modal or something else went wrong during the authentication process
            console.error(e);
          }
        }}
      >
        {user ? "Reconnect with Paper" : "Connect with Paper"}
      </Button>
      <br />
      <div className="p-10">
        {user ? (
          <div>
            <p>Your Linked Email is:</p>
            <p>"{user?.authDetails.email}"</p>
            <br />
            <p>Your Linked Wallet Id is:</p>
            <p>"{user?.authDetails.userWalletId}"</p>
            <br />
            <p>
              <b>Your Public Wallet Address is:</b>
            </p>
            <p>
              <b>"{user?.walletAddress}"</b>
            </p>
          </div>
        ) : (
          <i>(Please connect your Paper Wallet first)</i>
        )}
        {}
      </div>
    </div>
  );

  // return (
  //   <div>
  //     <p>You clicked {count} times</p>
  //     <Button onClick={() => setCount(count + 1)}>Click me</Button>
  //   </div>
  // );
}
