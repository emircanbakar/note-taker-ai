"use client";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { UserButton, useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import Link from "next/link";

export default function Home() {
  const { user } = useUser();
  const createUser = useMutation(api.user.createUser);

  const renderTextWithHover = (text, className = "") => {
    return text.split(" ").map((word, index) => (
      <span
        key={index}
        className={`hover:text-amber-500 transition-all duration-200 cursor-default inline-block mr-2 ${className}`}
      >
        {word}
      </span>
    ));
  };

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
    <div className="flex flex-col h-screen w-full items-center">
      <nav className="flex flex-row justify-between px-6 py-4 bg-white shadow-sm fixed top-0 left-0 w-full z-10">
        <h2 className="text-3xl font-medium">stood</h2>
        <div className="flex flex-row gap-4">
          {user ? (
            <Link href={"/dashboard"}>
              <Button>Dashboard</Button>
            </Link>
          ) : (
            ""
          )}
          {user ? (
            <UserButton />
          ) : (
            <Link href={"/sign-in"}>
              <Button>Log in</Button>
            </Link>
          )}
        </div>
      </nav>

      <div className="flex flex-row items-center justify-between mx-16 max-w-[1024px] h-full gap-16">
        <div className="flex flex-col text-black w-2/3">
          <div className="text-5xl font-semibold py-2">
            {renderTextWithHover("stood'a hoşgeldin!")}
          </div>
          <div className="text-2xl">
            {renderTextWithHover(
              "biz, öğrencilere özel dijital not alma ve paylaşım platformuyuz. biz kullanıcılarımıza hızlı, güvenli ve pratik bir not alma deneyimi sunuyoruz. burada notlarınızı güvenle saklayabilir, AI destekli ürünlerimizi kullanarak daha fazla not çıkartabilir ve bu süreci hızlıca yönetebilirsiniz!"
            )}
          </div>
        </div>
        <div className="relative flex items-center justify-center w-1/3 h-64">
          <span className="absolute text-amber-200 text-center text-8xl font-bold opacity-30 z-0">
            notları hallet!
          </span>
          <button className="relative z-10 p-4 py-6 text-lg bg-blend-color-burn bg-primary text-white rounded-full hover:bg-amber-500 transition-all duration-300 ">
            üye ol
          </button>
        </div>
      </div>
    </div>
  );
}
