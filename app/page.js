"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { UserButton, useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import Link from "next/link";

// const carouselItems = [
//   {
//     id: 1,
//     title: "Biz Kimiz?",
//     description:
//       "Biz, öğrencilere özel dijital not alma ve paylaşım platformuyuz. Amacımız, bilgiye erişimi kolaylaştırmak ve işbirliğini artırmak.",
//   },
//   {
//     id: 2,
//     title: "Hoşgeldiniz",
//     description:
//       "Platformumuza hoşgeldiniz! Burada notlarınızı güvenle saklayabilir ve arkadaşlarınızla paylaşabilirsiniz.",
//   },
//   {
//     id: 3,
//     title: "Ne Yapıyoruz?",
//     description:
//       "Kullanıcılarımıza hızlı, güvenli ve pratik bir not alma deneyimi sunuyoruz. Herkes için erişilebilir bir öğrenme ortamı sağlıyoruz.",
//   },
// ];

export default function Home() {
  const { user } = useUser();
  const createUser = useMutation(api.user.createUser);
  const [activeIndex, setActiveIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);

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
        <h2 className="text-2xl font-medium">OGRENCISI</h2>
        <div className="flex flex-row gap-4">
          <Link href={"/dashboard"}>
            <Button>Dashboard</Button>
          </Link>
          {user ? (
            <UserButton />
          ) : (
            <Link href={"/sign-in"}>
              <Button>Log in</Button>
            </Link>
          )}
        </div>
      </nav>

      <div className="flex flex-row items-center justify-between w-[1024px] h-full gap-16">
        <div className="flex flex-col text-black w-2/3">
          <span className="text-5xl font-semibold py-2">
            stood'a hoşgeldin!
          </span>
          <span className="text-2xl">
            biz, öğrencilere özel dijital not alma ve paylaşım platformuyuz. biz
            kullanıcılarımıza hızlı, güvenli ve pratik bir not alma deneyimi
            sunuyoruz. burada notlarınızı güvenle saklayabilir ve AI destekli
            ürünlerimizi kullanarak daha fazla not çıkartabilir ve bu süreci
            hızlıca yönetebilirsiniz!
          </span>
        </div>
        <div className="flex w-1/3">
          <button className="p-4 py-6 text-lg bg-amber-600 text-white rounded-full">
            üye ol
          </button>
          <span className="text-gray-300 text-4xl">notları hallet!</span>
        </div>
      </div>
    </div>
  );
}
