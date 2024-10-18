'use client'

import { useState, useEffect, use } from "react";
import WebApp from "@twa-dev/sdk";

interface UserData {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  is_premium?: boolean;
}

export default function Home() {
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    if (WebApp.initDataUnsafe.user && typeof window !== "undefined" && typeof window !== undefined) {
      setUserData(WebApp.initDataUnsafe.user as UserData);
    }
    
}, []);

  return (
    <>
    <main className="p-4">
      {
        userData ? (
          <>
          <h1 className="text-2x1 font-bold mb-4">User Data</h1>
          </>
        ) : (
          <>
          <h1 className="text-2x1 font-bold mb-4">User</h1>
          </>
        )
      }
    </main>
    </>
  );
}
