"use client";

import { useEffect, useState } from "react";

export function useTypewriter(text: string, speed = 35, start = true) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!start) {
      setDisplayed("");
      setDone(false);
      return;
    }

    setDisplayed("");
    setDone(false);
    let index = 0;

    const id = setInterval(() => {
      index += 1;
      setDisplayed(text.slice(0, index));
      if (index >= text.length) {
        setDone(true);
        clearInterval(id);
      }
    }, speed);

    return () => clearInterval(id);
  }, [text, speed, start]);

  return { displayed, done };
}
