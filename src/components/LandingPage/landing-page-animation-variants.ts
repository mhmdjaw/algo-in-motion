const landingPageAnimationVariants = {
  svgVariants: {
    hidden: {
      rotate: -180,
    },
    visible: {
      rotate: 0,
      x: ["-50%", "-50%", "-50%", "0%"],
      transition: { duration: 2, ease: "easeInOut" },
    },
  },

  pathVariants: {
    hidden: {
      opacity: 0,
      pathLength: 0,
      fillOpacity: 0,
    },
    visible: {
      opacity: 1,
      pathLength: 1,
      fillOpacity: 1,
      transition: {
        default: { duration: 2, ease: "easeInOut" },
        fillOpacity: { duration: 2, ease: [1, 0, 0.8, 1] },
      },
    },
  },

  leftContainerVariants: {
    hidden: {
      opacity: 0,
      y: "10%",
    },
    visible: (i: number): Record<string, unknown> => ({
      // opacity: 1,
      // y: "0%",
      // transition: {
      //   delay: i * 0.2 + 1.5,
      //   duration: (i + 1) * 0.3,
      //   ease: "easeInOut",
      // },
      opacity: [0, 0, 0, 1],
      y: ["10%", "10%", "10%", "0%"],
      transition: {
        duration: 2 + 0.3 * (i + 1),
        ease: "easeInOut",
      },
    }),
  },
};

export default landingPageAnimationVariants;
