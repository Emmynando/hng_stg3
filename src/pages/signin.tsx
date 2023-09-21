"use client";
import { useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import Authentication from "@components/components/Layout/Authentication";

export default async function SignIn() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    // If the user is already authenticated, redirect them to album page
    if (session) {
      router.push("/album");
    }
  }, [session]);

  const handleSignIn = () => {
    signIn("credentials", {
      redirect: false,
      callbackUrl: "/album",
    });
  };

  return (
    <>
      <Authentication onClick={handleSignIn} />
    </>
  );
}
