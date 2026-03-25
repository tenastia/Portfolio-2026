"use client";

import { createContext, useContext, useState } from "react";

type Scheme = "dark" | "light";

const SchemeContext = createContext<{
  scheme: Scheme;
  setScheme: (s: Scheme) => void;
}>({ scheme: "dark", setScheme: () => {} });

export function useScheme() {
  return useContext(SchemeContext);
}

export default function SchemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [scheme, setScheme] = useState<Scheme>("dark");

  return (
    <SchemeContext.Provider value={{ scheme, setScheme }}>
      {children}
    </SchemeContext.Provider>
  );
}
