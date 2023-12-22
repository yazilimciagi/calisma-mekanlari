import React from "react";
import Logo from "@/components/Logo";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="flex items-center mdmax:flex-col justify-between py-12 mx-8 mdmax:mx-0 mdmax:px-4 px-20">
      <Logo />
      <p className="ml-6 mdmax:ml-0 mdmax:mt-12 text-center">
        <Link href="https://github.com/code-a-man" target="_blank">
          @code-a-man
        </Link>
        &nbsp;ve&nbsp;
        <Link href="https://github.com/pekkiriscim" target="_blank">
          @pekkiriscim
        </Link>
        &nbsp;tarafından 🖤 ile geliştirilmiştir.
      </p>
    </footer>
  );
};

export default Footer;
