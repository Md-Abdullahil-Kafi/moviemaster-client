import { motion } from "framer-motion";

export default function FadeInSection({ children,
  direction = "up",
  offset = 30,
  duration = 0.9,
  delay = 0,
  once = true,
  className = "",
}) {
  // compute initial transform based on direction
  const from = {
    opacity: 0,
    x: 0,
    y: 0,
  };

  if (direction === "up") from.y = offset;
  if (direction === "down") from.y = -offset;
  if (direction === "left") from.x = offset;
  if (direction === "right") from.x = -offset;

  return (
    <motion.div
      className={className}
      initial={from}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration, delay, ease: "easeOut" }}
      viewport={{ once, amount: 0.35 }} // amount controls how much visible before animate
    >
      {children}
    </motion.div>
  );
}
