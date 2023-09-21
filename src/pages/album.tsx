"use client";
import { useEffect } from "react";

import ShoeList from "@components/components/Layout/ShoeList";
import { signIn, useSession } from "next-auth/react";
import Loader from "@components/components/UI/Loader";

export default function Album() {
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      // The user is not authenticated, handle it here.
      signIn();
    },
  });

  if (status === "loading") {
    return <Loader />;
  }

  if (status === "authenticated") {
    return (
      <>
        <>
          <h1 style={{ textAlign: "center" }}>This is album page</h1>
          <ShoeList />
        </>
      </>
    );
  }
}
