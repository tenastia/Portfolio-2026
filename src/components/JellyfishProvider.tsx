"use client";

import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import Jellyfish from "./Jellyfish";

interface JellyfishContextValue {
  visible: boolean;
  toggle: () => void;
}

const JellyfishContext = createContext<JellyfishContextValue>({
  visible: true,
  toggle: () => {},
});

export function useJellyfish() {
  return useContext(JellyfishContext);
}

export default function JellyfishProvider({ children }: { children: ReactNode }) {
  const [visible, setVisible] = useState(true);

  return (
    <JellyfishContext.Provider value={{ visible, toggle: () => setVisible((v) => !v) }}>
      <Jellyfish visible={visible} />
      {children}
    </JellyfishContext.Provider>
  );
}
