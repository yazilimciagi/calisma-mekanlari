import { Coffee } from "lucide-react";
import Link from "next/link";
import React from "react";

function Logo() {
  return (
    <Link href="/" className="flex flex-nowrap items-center">
      <div className="w-12 h-12 flex items-center mr-4 justify-center border rounded-xl">
        <Coffee className="h-6 w-6" />
      </div>
      <span className="text-xl whitespace-nowrap font-semibold">
        Çalışma Mekanları
      </span>
    </Link>
  );
}

export default Logo;
