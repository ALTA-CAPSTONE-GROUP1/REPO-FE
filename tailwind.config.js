/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "@Red": "#C82333",
        "@Red2": "#E6A9AF",
        "@Red3": "#FFBBC2",
        "@Orange": "#FF9D28",
        "@Green": "#064E3B",
        "@Blue": "#394F87",
        "@Gray": "#64748B",
        "@Gray2": "#E7EAEE",
      },
    },
  },
  // eslint-disable-next-line no-undef
  plugins: [require("daisyui")],
};
