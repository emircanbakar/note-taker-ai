"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { UserButton, useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";

const carouselItems = [
  {
    title: "Biz Kimiz?",
    description:
      "Biz, öğrencilere özel dijital not alma ve paylaşım platformuyuz. Amacımız, bilgiye erişimi kolaylaştırmak ve işbirliğini artırmak.",
  },
  {
    title: "Hoşgeldiniz",
    description:
      "Platformumuza hoşgeldiniz! Burada notlarınızı güvenle saklayabilir ve arkadaşlarınızla paylaşabilirsiniz.",
  },
  {
    title: "Ne Yapıyoruz?",
    description:
      "Kullanıcılarımıza hızlı, güvenli ve pratik bir not alma deneyimi sunuyoruz. Herkes için erişilebilir bir öğrenme ortamı sağlıyoruz.",
  },
];

export default function Home() {
  const { user } = useUser();
  const createUser = useMutation(api.user.createUser);
  const [activeIndex, setActiveIndex] = useState(1);

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

  const handleItemClick = (index) => setActiveIndex(index);

  return (
    <div className="flex flex-col h-screen">
      <nav className="flex flex-row justify-between px-6 py-4 bg-white shadow-sm fixed top-0 left-0 w-full z-10">
        <h2 className="text-2xl font-medium">OGRENCISI</h2>
        {user ? <UserButton /> : <Button>Log in</Button>}
      </nav>
      <div className="flex flex-1 items-center justify-center px-16">
        <div className="relative flex items-center justify-center w-full h-64">
          <div
            className="absolute left-0 top-1/2 -translate-y-1/2 w-40 opacity-60 scale-75 z-0 transition-all duration-300 cursor-pointer flex items-center justify-center text-center flex flex-col"
            onClick={() =>
              handleItemClick(
                (activeIndex + carouselItems.length - 1) % carouselItems.length
              )
            }
          >
            <h2 className="text-xl font-bold w-full text-center">
              {
                carouselItems[
                  (activeIndex + carouselItems.length - 1) %
                    carouselItems.length
                ].title
              }
            </h2>
          </div>
          <div
            className="mx-auto flex flex-col items-center justify-center text-center w-72 opacity-100 scale-100 z-20 transition-all duration-300 cursor-pointer"
            onClick={() => handleItemClick(activeIndex)}
          >
            <h2 className="text-3xl font-bold w-full text-center">
              {carouselItems[activeIndex].title}
            </h2>
            <p className="mt-4 text-base text-gray-600 w-full text-center">
              {carouselItems[activeIndex].description}
            </p>
          </div>
          {/* Sağ küçük div */}
          <div
            className="absolute right-0 top-1/2 -translate-y-1/2 w-40 opacity-60 scale-75 z-0 transition-all duration-300 cursor-pointer flex items-center justify-center text-center"
            onClick={() =>
              handleItemClick((activeIndex + 1) % carouselItems.length)
            }
          >
            <h2 className="text-xl font-bold w-full text-center">
              {carouselItems[(activeIndex + 1) % carouselItems.length].title}
            </h2>
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center gap-2 pb-8">
        {carouselItems.map((_, idx) => (
          <button
            key={idx}
            onClick={() => handleItemClick(idx)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              activeIndex === idx ? "bg-black" : "bg-gray-200"
            }`}
            aria-label={`carousel-dot-${idx}`}
          />
        ))}
      </div>
    </div>
  );
}
