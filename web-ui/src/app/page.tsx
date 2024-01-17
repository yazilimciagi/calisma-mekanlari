"use client";

import { useEffect, useState } from "react";
import type { VenueData } from "@/types/types";
import VenueCard from "@/components/VenueCard";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import Filter from "@/components/Filter";
import SkeletonCard from "@/components/SkeletonCard";

const Page = () => {
  const [isDataLoading, setIsDataLoading] = useState<boolean>(true);
  const [data, setData] = useState<Record<string, VenueData[]> | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | undefined>("All");

  const getVenues = async () => {
    try {
      const res = await fetch("/api/venues", {
        cache: "force-cache",
        next: {
          revalidate: 7200,
        },
      });
      const data = await res.json();

      const orderByCity = Object.keys(data)
        .sort()
        .reduce((obj: any, key) => {
          obj[key] = data[key];
          return obj;
        }, {});

      setData(orderByCity);
    } catch (error) {
      console.log(error);
    } finally {
      setIsDataLoading(false);
    }
  };

  useEffect(() => {
    getVenues();
  }, []);

  const getVenuesByCity = (city: string) => {
    if (!data) return [];
    return data[city] || [];
  };

  return (
    <main className="max-w-[90rem] mx-auto w-full">
      <Navigation />
      <section className="py-24 mdmax:py-16 mdmax:px-4 w-full flex flex-col items-center px-20">
        <div className="mb-16 mdmax:mb-12 px-8 mdmax:px-0">
          <h1 className="text-4xl font-semibold mb-5 text-center">
            {selectedCity && selectedCity !== "All"
              ? `${selectedCity} Şehrindeki Çalışma Mekanları`
              : "Çalışma Mekanları"}
          </h1>
          <p className="text-xl text-muted-foreground font-normal text-center">
            Bu reponun amacı, herkesin şehir şehir kategorize ederek bilinen
            çalışma mekanlarını bir araya getirmek.
          </p>
        </div>
        <Filter
          data={data}
          selectedCity={selectedCity}
          setSelectedCity={setSelectedCity}
          isDataLoading={isDataLoading}
        />
        {isDataLoading && (
          <div className="mt-16 mdmax:mt-12 w-full grid grid-cols-3 gap-x-6 mdmax:gap-x-4 mdmax:gap-y-4 px-8 mdmax:px-0 gap-y-6 xlmax:grid-cols-2 mdmax:grid-cols-1">
            {new Array(6).fill(null).map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        )}
        {data && selectedCity && selectedCity === "All" && (
          <div className="grid w-full mt-16 mdmax:mt-12 px-8 mdmax:px-0 gap-y-16">
            {Object.keys(data).map((city, index) => {
              return (
                <div key={index}>
                  <h4 className="text-xl font-semibold">{city}</h4>
                  <div className="mt-8 mdmax:mt-5 w-full grid grid-cols-3 gap-x-6 gap-y-6 mdmax:gap-x-4 mdmax:gap-y-4 xlmax:grid-cols-2 mdmax:grid-cols-1">
                    {getVenuesByCity(city).map((venue, index) => (
                      <VenueCard key={index} venue={venue} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
        {selectedCity && selectedCity !== "All" && (
          <div className="mt-16 mdmax:mt-12 w-full grid grid-cols-3 gap-x-6 mdmax:gap-x-4 mdmax:gap-y-4 px-8 mdmax:px-0 gap-y-6 xlmax:grid-cols-2 mdmax:grid-cols-1">
            {getVenuesByCity(selectedCity).map((venue, index) => (
              <VenueCard key={index} venue={venue} />
            ))}
          </div>
        )}
      </section>
      <Footer />
    </main>
  );
};

export default Page;
