// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{html,ts,tsx}", // ou os caminhos corretos para o seu projeto
  ],
  theme: {
    extend: {
      colors: {
        // Adicionar cores personalizadas, se necessário
        primary: "#1D4ED8", // Exemplo de cor azul
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#1D4ED8", // Defina a cor primária do tema
          secondary: "#9333EA",
          accent: "#F59E0B",
          neutral: "#f5f5f5", // Defina a cor de fundo neutra
          "base-100": "#ffffff", // Cor do fundo base
        },
      },
    ],
  },
};
