"use client";

import { createContext } from "react";
import type { Author, Category } from "~/types";

type HeaderContextValue = {
  searchOpen: boolean;
  menuOpen: boolean;
  categories: Category[];
  users: Author[];
  setSearchOpen: (open: boolean) => void;
  setMenuOpen: (open: boolean) => void;
};

export const HeaderContext = createContext<HeaderContextValue>({
  searchOpen: false,
  menuOpen: false,
  categories: [],
  users: [],
  setSearchOpen: () => {},
  setMenuOpen: () => {},
});
