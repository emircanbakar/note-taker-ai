"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { UserButton, useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import Link from "next/link";

const carouselItems = [
  {
    id: 1,
    title: "Biz Kimiz?",
    description:
      "Biz, öğrencilere özel dijital not alma ve paylaşım platformuyuz. Amacımız, bilgiye erişimi kolaylaştırmak ve işbirliğini artırmak.",
  },
  {
    id: 2,
    title: "Hoşgeldiniz",
    description:
      "Platformumuza hoşgeldiniz! Burada notlarınızı güvenle saklayabilir ve arkadaşlarınızla paylaşabilirsiniz.",
  },
  {
    id: 3,
    title: "Ne Yapıyoruz?",
    description:
      "Kullanıcılarımıza hızlı, güvenli ve pratik bir not alma deneyimi sunuyoruz. Herkes için erişilebilir bir öğrenme ortamı sağlıyoruz.",
  },
];

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

  const handleItemClick = (index) => {
    if (index === activeIndex || isTransitioning) return;

    // Önce fade-out yap
    setIsTransitioning(true);

    // 1000ms sonra (tam fade-out tamamlandıktan sonra) index değiştir
    setTimeout(() => {
      setActiveIndex(index);
      // Hemen fade-in başlat
      setTimeout(() => {
        setIsTransitioning(false);
      }, 150);
    }, 600);
  };

  return (
    <div className="flex flex-col h-screen">
      <nav className="flex flex-row justify-between px-6 py-4 bg-white shadow-sm fixed top-0 left-0 w-full z-10">
        <h2 className="text-2xl font-medium">OGRENCISI</h2>
        <div className="flex flex-row gap-4">
          <Link href={"/dashboard"}>
            <Button>Dashboard</Button>
          </Link>
          {user ? <UserButton /> : <Button>Log in</Button>}
        </div>
      </nav>
      <div className="flex flex-1 items-center justify-center px-16">
        <div className="relative flex items-center justify-center w-full h-64 overflow-hidden">
          {carouselItems.map((item, index) => {
            // Her item için pozisyon hesapla
            let position = index - activeIndex;
            if (position < 0) position += carouselItems.length;
            if (position >= carouselItems.length)
              position -= carouselItems.length;

            // Pozisyona göre stil belirle
            let positionClass = "";
            let sizeClass = "";
            let zIndex = "";
            let opacityClass = "";
            let onClick = () => handleItemClick(index);

            if (position === 0) {
              // Aktif item (merkez)
              positionClass = "left-1/2 -translate-x-1/2";
              sizeClass = "w-72";
              opacityClass = isTransitioning ? "opacity-0" : "opacity-100";
              zIndex = "z-20";
            } else if (position === 1) {
              // Sağ item
              positionClass = "right-0";
              sizeClass = "w-40";
              opacityClass = isTransitioning ? "opacity-0" : "opacity-60";
              zIndex = "z-10";
            } else if (position === carouselItems.length - 1) {
              // Sol item
              positionClass = "left-0";
              sizeClass = "w-40";
              opacityClass = isTransitioning ? "opacity-0" : "opacity-60";
              zIndex = "z-10";
            } else {
              // Gizli itemlar
              positionClass = "left-1/2 -translate-x-1/2";
              sizeClass = "w-40";
              opacityClass = "opacity-0";
              zIndex = "z-0";
            }

            return (
              <div
                key={index}
                className={`absolute top-1/2 -translate-y-1/2 ${positionClass} ${sizeClass} ${opacityClass} ${zIndex} transition-all duration-1000 ease-in-out cursor-pointer flex flex-col items-center justify-center text-center`}
                onClick={onClick}
              >
                <h2
                  className={`font-bold w-full text-center transition-all duration-1000 ease-in-out ${
                    position === 0 ? "text-3xl" : "text-xl"
                  }`}
                >
                  {item.title}
                </h2>
                {position === 0 && (
                  <p className="mt-4 text-base text-gray-600 w-full text-center transition-all duration-1000 ease-in-out">
                    {item.description}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex justify-center items-center gap-2 pb-8">
        {carouselItems.map((_, idx) => (
          <button
            key={idx}
            onClick={() => handleItemClick(idx)}
            className={`w-2 h-2 rounded-full transform transition-all duration-1000 ease-[cubic-bezier(0.25,0.8,0.25,1)] ${
              activeIndex === idx
                ? "bg-black scale-125"
                : "bg-gray-200 scale-100"
            }`}
            aria-label={`carousel-dot-${idx}`}
          />
        ))}
      </div>
    </div>
  );
}
