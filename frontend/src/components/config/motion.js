export const transition = { type: "spring", duration: 2 };

export const slideAnimation = (direction) => {
  return {
    initial: {
      x: direction === "left" ? -2000 : direction === "right" ? 1000 : 0,
      y: direction === "up" ? 1000 : direction === "down" ? -1000 : 0,
      opacity: 0,
      transition: { ...transition, delay: 0.5 },
    },
    animate: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: { ...transition, delay: 0 },
    },
    exit: {
      x: direction === "left" ? -1000 : direction === "right" ? 1000 : 0,
      y: direction === "up" ? 1000 : direction === "down" ? -1000 : 0,
      transition: { ...transition, delay: 0 },
    },
  };
};