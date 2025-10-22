"use client";
import React, { useContext, createContext, useState, useRef } from "react";

type NavContextType = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
};

const NavContext = createContext<NavContextType | null>(null);

export function NavProvider({ children }: { children: React.ReactNode }) {
  // need menu to trigger a new height
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const navItem = {
    isOpen,
    setIsOpen,
  };

  return <NavContext value={navItem}>{children}</NavContext>;
}

export const useNav = (): NavContextType => {
  const context = useContext(NavContext);
  if (!context) {
    throw new Error("useNav must be used within a NavProvider");
  }
  return context;
};
