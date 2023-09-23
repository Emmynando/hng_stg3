"use client";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import styles from "./NavBar.module.css";

export default function NavBar() {
  const { data: session } = useSession();
  return (
    <div className={styles["full-container"]}>
      <nav>
        <h1>
          <Link href="/">Logo Here</Link>
        </h1>
        <ul>
          <li>
            <Link href="/album">Album</Link>
          </li>
          <li>
            {session ? (
              <button onClick={() => signOut()}>Sign Out</button>
            ) : (
              <Link href="/album">
                <button>Sign in</button>
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
}
