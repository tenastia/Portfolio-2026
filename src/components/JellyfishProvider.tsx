"use client";

import { createContext, useContext, useState } from "react";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import Jellyfish from "./Jellyfish";

interface JellyfishContextValue {
  visible: boolean;
  toggle: () => void;
  blurred: boolean;
  setBlurred: (b: boolean) => void;
}

const JellyfishContext = createContext<JellyfishContextValue>({
  visible: true,
  toggle: () => {},
  blurred: false,
  setBlurred: () => {},
});

export function useJellyfish() {
  return useContext(JellyfishContext);
}

export default function JellyfishProvider({ children }: { children: ReactNode }) {
  const [visible, setVisible] = useState(true);
  const [blurred, setBlurred] = useState(false);
  const pathname = usePathname();
  const showJellyfish = !pathname.startsWith("/project/");

  return (
    <JellyfishContext.Provider value={{ visible, toggle: () => setVisible((v) => !v), blurred, setBlurred }}>
      {showJellyfish && <Jellyfish visible={visible} blurred={blurred} />}
      {children}
    </JellyfishContext.Provider>
  );
}
