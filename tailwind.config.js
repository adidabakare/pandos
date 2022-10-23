module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      primary: "Playfair Display",
      body: "Work Sans",
    },
    container: {
      padding: {
        DEFAULT: "1rem",
        lg: "3rem",
      },
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
    extend: {
      fontFamily: {
        Wavetosh: ["Wavetosh", "cursive"],
        AunchantedMed: ["AunchantedMed"],
        Montserrat: ["Montserrat"],
      },
      backgroundImage: {
        "header-img": "url('/src/assets/img/space-5454441.jpg')",
        afgl5180: "url('/src/assets/theme/afgl5180.jpeg')",
        agCarinae: "url('/src/assets/theme/agCarinae.jpeg')",
        dobashi4173: "url('/src/assets/theme/dobashi4173.jpeg')",
        fomalhaut: "url('/src/assets/theme/fomalhaut.jpeg')",
        iras: "url('/src/assets/theme/iras.jpeg')",
        iras07015: "url('/src/assets/theme/iras07015.jpeg')",
        ldn1551: "url('/src/assets/theme/ldn1551.jpeg')",
        luhman16a: "url('/src/assets/theme/luhman16a.jpeg')",
        m104sombrerogalaxy: "url('/src/assets/theme/m104sombrerogalaxy.jpeg')",
        micegalaxiesngc4676:
          "url('/src/assets/theme/micegalaxiesngc4676.jpeg')",
        ngc1275: "url('/src/assets/theme/ngc1275.jpeg')",
        ngc1300: "url('/src/assets/theme/ngc1300.jpeg')",
        ogle2007: "url('/src/assets/theme/ogle-2007.jpeg')",
        sbw2007: "url('/src/assets/theme/sbw2007.jpeg')",
        trappist: "url('/src/assets/theme/trappist.jpeg')",
        enter: "url('/src/assets/img/enter-space.gif')",
        ocean: "url('/src/assets/img/n3.jpeg')",
        "space-enter": "url('/src/assets/img/space-enter.jpg')",
        "black-sheriff": "url('/src/assets/img/Black-Sherif-album-cover.jpg')",
        "sky-dark": "url('/src/assets/img/skyydark.jpg')",
        "music-bg": "url('/src/assets/img/pop.jpg')",

        // "enter-space": "url('https://embed.lottiefiles.com/animation/39589')",
      },
      content: {
        about: 'url("/src/assets/img/outline-text/about.svg")',
        portfolio: 'url("/src/assets/img/outline-text/portfolio.svg")',
        services: 'url("/src/assets/img/outline-text/services.svg")',
        testimonials: 'url("/src/assets/img/outline-text/testimonials.svg")',
        contact: 'url("/src/assets/img/outline-text/contact.svg")',
      },
      colors: {
        primary: "#050402",
        secondary: "#1C1D24",
        tertiary: "#131419",
        accent: {
          DEFAULT: "#ac6b34",
          hover: "#925a2b",
        },
        paragraph: "#878e99",
      },
      keyframes: {
        wave: {
          "0%": { transform: "rotate(0.0deg)" },
          "15%": { transform: "rotate(14.0deg)" },
          "30%": { transform: "rotate(-8.0deg)" },
          "40%": { transform: "rotate(14.0deg)" },
          "50%": { transform: "rotate(-4.0deg)" },
          "60%": { transform: "rotate(10.0deg)" },
          "70%": { transform: "rotate(0.0deg)" },
          "100%": { transform: "rotate(0.0deg)" },
        },
      },
      animation: {
        wave: "wave 1.5s infinite",
      },
    },
  },
  plugins: [],
};
