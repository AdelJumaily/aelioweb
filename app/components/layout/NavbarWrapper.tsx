"use client";

import { useState } from "react";
import Navbar from "./Navbar";
import ContactModal from "../ContactModal";

export default function NavbarWrapper() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  return (
    <>
      <Navbar onContactClick={() => setIsContactModalOpen(true)} />
      <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
    </>
  );
}


