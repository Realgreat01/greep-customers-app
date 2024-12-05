export default defineAppConfig({
  ui: {
    primary: "brand",
    gray: "neutral",
    fonts: {
      defaults: {
        weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
      },
    },
    button: {
      default: {
        size: "md",
        color: "primary",
        loadingIcon: "i-uiw-loading",
      },
      variant: {
        ghost: "hover:bg-gray-100",
      },
    },

    input: {
      default: {
        size: "xl",
        color: "white",
        variant: "outline",
      },

      base: "disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none border-0 border-gray-50",
    },
    formGroup: {
      label: {
        base: "block font-normal text-gray-700 dark:text-gray-200",
        required:
          "after:content-['*'] after:ms-0.5 after:text-red-500 dark:after:text-red-400",
      },
    },
  },
});
