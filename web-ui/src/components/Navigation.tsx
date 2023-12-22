import React from "react";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function Navigation() {
  return (
    <nav className="py-5 px-20 mx-8 flex items-center justify-between mdmax:p-4 mdmax:m-0 mdmax:flex-col">
      <Logo />
      <Button asChild className="mdmax:w-full mdmax:mt-6">
        <Link
          href="https://github.com/acikkaynak/calisma-mekanlari"
          target="_blank"
        >
          Mekan Ekle
        </Link>
      </Button>
    </nav>
  );
}

export default Navigation;
