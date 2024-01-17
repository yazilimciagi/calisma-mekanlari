import { VenueData } from "@/types/types";
import { Clock, Info, Instagram, Map, Plug, Volume2, Wifi } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const VenueCard = ({ venue }: { venue: VenueData }) => {
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [image, setImage] = useState("/fallback-image.png");

  const getImage = async () => {
    try {
      const res = await fetch("/api/images?url=" + venue.harita, {
        cache: "force-cache",
        next: { revalidate: 7200 },
      });
      const data = await res.json();

      setImage(data.image);
    } catch (error) {
      console.log(error);
    } finally {
      setIsImageLoading(false);
    }
  };

  useEffect(() => {
    getImage();
  });

  return (
    <div className="rounded-2xl flex flex-col border p-6 venue-card">
      {isImageLoading ? (
        <Skeleton className="w-full h-60 mb-5 rounded-[0.5rem]" />
      ) : (
        <div className="relative w-full h-60 mb-5">
          {(venue.notlar || venue.instagram) && (
            <div className="w-full opacity-0 transition-opacity absolute z-10 h-full rounded-[0.5rem] image-container">
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    className="absolute z-20 mt-3 ml-3 border-0"
                    size="icon"
                    variant="outline"
                  >
                    <Info className="w-4 h-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader className="grid w-full gap-y-4 space-y-0">
                    <DialogTitle>{venue.isim} Hakkında Notlar</DialogTitle>
                    <DialogDescription className="grid w-full gap-y-4">
                      {venue.notlar && venue.notlar}
                      {venue.instagram && (
                        <Button asChild className="w-full" variant="outline">
                          <Link
                            href={`https://instagram.com/${venue.instagram.replace(
                              "@",
                              ""
                            )}`}
                            target="_blank"
                          >
                            <Instagram className="w-4 h-4 mr-2" />
                            {venue.instagram}
                          </Link>
                        </Button>
                      )}
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>
          )}
          <Image
            alt={venue.isim}
            className="object-cover rounded-[0.5rem]"
            src={image}
            fill
          />
        </div>
      )}
      <h3 className="text-base flex items-center font-normal text-muted-foreground mb-2">
        {venue.konum}
      </h3>
      <h2 className="text-2xl font-semibold mb-4">{venue.isim}</h2>
      <div className={cn("grid gap-y-2", venue.harita && "mb-6")}>
        <TooltipProvider delayDuration={200}>
          <Tooltip>
            <TooltipTrigger className="w-fit">
              <div className="flex items-center text-muted-foreground">
                <Clock className="w-5 h-5 mr-2 min-w-[1.25rem]" />
                <p className="text-base font-medium text-left">
                  {venue.calismaSaatleri}
                </p>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Çalışma Saatleri</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider delayDuration={200}>
          <Tooltip>
            <TooltipTrigger className="w-fit">
              <div className="flex items-center text-muted-foreground">
                <Wifi className="w-5 h-5 mr-2 min-w-[1.25rem]" />
                <p className="text-base font-medium text-left">
                  {venue.wifi === "N/A"
                    ? "N/A"
                    : venue.wifiHiz === "N/A"
                    ? "Mevcut"
                    : venue.wifiHiz}
                </p>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>WiFi</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider delayDuration={200}>
          <Tooltip>
            <TooltipTrigger className="w-fit">
              <div className="flex items-center text-muted-foreground">
                <Plug className="w-5 h-5 mr-2 min-w-[1.25rem]" />
                <p className="text-base text-left font-medium">{venue.priz}</p>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Priz</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider delayDuration={200}>
          <Tooltip>
            <TooltipTrigger className="w-fit">
              <div className="flex items-center text-muted-foreground">
                <Volume2 className="w-5 h-5 mr-2 min-w-[1.25rem]" />
                <p className="text-base text-left font-medium">
                  {venue.gurultu}
                </p>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Gürültü Seviyesi</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      {venue.harita && (
        <Button asChild variant="outline" className="w-full mt-auto">
          <Link href={venue.harita} target="_blank">
            <Map className="w-4 h-4 mr-2" />
            Haritada Göster
          </Link>
        </Button>
      )}
    </div>
  );
};

export default VenueCard;
