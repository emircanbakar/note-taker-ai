"use client";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { UserButton, useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import Image from "next/image";
import { useEffect } from "react";

export default function Home() {
  const { user } = useUser();
  const createUser = useMutation(api.user.createUser);

  useEffect(() => {
    user && CheckUser();
  }, [user]);

  const CheckUser = async () => {
    const res = await createUser({
      email: user?.primaryEmailAddress.emailAddress,
      userName: user?.fullName,
      imageUrl: user?.imageUrl,
    });

    console.log(res);
  };

  return (
    <div>
      sa
      <Button>meraba</Button>
      <UserButton />
    </div>
  );
}
