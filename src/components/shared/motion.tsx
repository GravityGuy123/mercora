"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

type BaseMotionProps = {
  children: ReactNode;
  className?: string;
};

type FadeUpProps = BaseMotionProps & {
  delay?: number;
  duration?: number;
  y?: number;
  amount?: number;
};

export function FadeUp({
  children,
  className,
  delay = 0,
  duration = 0.6,
  y = 24,
  amount = 0.2,
}: FadeUpProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

type FadeInProps = BaseMotionProps & {
  delay?: number;
  duration?: number;
  amount?: number;
};

export function FadeIn({
  children,
  className,
  delay = 0,
  duration = 0.6,
  amount = 0.2,
}: FadeInProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount }}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

type ScaleInProps = BaseMotionProps & {
  delay?: number;
  duration?: number;
  scale?: number;
  amount?: number;
};

export function ScaleIn({
  children,
  className,
  delay = 0,
  duration = 0.55,
  scale = 0.97,
  amount = 0.2,
}: ScaleInProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount }}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerGroup({ children, className }: BaseMotionProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: 0.1,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: BaseMotionProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.55,
            ease: EASE,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}