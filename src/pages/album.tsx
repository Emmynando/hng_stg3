"use client";

import ShoeList from "@components/components/Layout/ShoeList";
import { signIn, useSession } from "next-auth/react";

export default function Album() {
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      // The user is not authenticated, handle it here.
      signIn();
    },
  });

  if (status === "loading") {
    return "loading";
  }
  return (
    <>
      <>
        <h1 style={{ textAlign: "center" }}>This is album page</h1>
        <ShoeList />
      </>
    </>
  );
}
