"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  text: string;
  /** Задержка между словами, мс. */
  stagger?: number;
  /** Начальная задержка, мс. */
  delay?: number;
  className?: string;
};

/** Пословное появление заголовка: каждое слово выезжает из маски + un-blur. */
export default function WordReveal({
  text,
  stagger = 90,
  delay = 0,
  className = "",
}: Props) {
  const ref = useRef<HTMLHeadingElement | null>(null);
  const [visible, setVisible] = useState(false);
  const words = text.split(" ");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <h1
      ref={ref}
      className={`word-reveal ${visible ? "is-visible" : ""} ${className}`}
    >
      {words.map((word, i) => (
        <span className="w" key={i}>
          <span style={{ transitionDelay: `${delay + i * stagger}ms` }}>
            {word}
          </span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </h1>
  );
}
