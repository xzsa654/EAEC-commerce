import { GithubIcon } from "@/components/icons";
import { Link } from "@heroui/link";
import React from "react";

export default function Footer() {
  return (
    <footer className=" mt-10 text-white py-12 px-4 tracking-wide">
      <div className="text-center">
        <ul className="flex flex-col justify-center gap-x-8 gap-4 mt-8 mb-6">
          <li>
            <Link
              color="foreground"
              href="https://github.com/xzsa654/EAEC-commerce"
              isExternal
            >
              <GithubIcon />
            </Link>
          </li>
          <li>Email:xzsa654@gmail.com</li>
        </ul>
        <p className="text-base text-gray-300">
          © 2025 EAEC All rights reserved.
        </p>
      </div>
    </footer>
  );
}
