"use client";

import {
  InitializedUser,
  PaperEmbeddedWalletSdk,
} from "@paperxyz/embedded-wallet-service-sdk";

import { useState } from "react";

export default function PaperWallet() {
  // default paper wallet - can be reset to whatever the developer's client id is
  const sdk = new PaperEmbeddedWalletSdk({
    clientId: "1bcbd6c9-7a6a-418c-864e-ebc257f7e713",
    chain: "Mumbai",
  });

  // state object to store user info
  const [user, setUser] = useState<InitializedUser | null>(null);

  // Call when the user clicks your "Connect with Paper" button.
  return (
    <div className="p-10">
      <div className="p-10">
        <h1 className="text-2xl font-800">Paper Wallet Info Viewer</h1>
      </div>
      <button
        style={{ backgroundColor: "#00a8ff", padding: "10px" }}
        onClick={async () => {
          try {
            // NOTE: the user info shown is only under the scope of the developer's client id defined above
            // if you want to see the user info for a different client id, you must change the client id above
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
      </button>
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
}
