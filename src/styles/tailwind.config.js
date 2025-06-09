const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#F59E0B", // 원하는 오렌지 계열 색상으로 지정
      },
    },
  },
  plugins: [],
});
