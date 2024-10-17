/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui')],
  daisyui: {
    // Configura temas de daisyUI
    themes:["light","dark","cupcake","bumblebee","emerald","corporate","synthwave","retro",
      "cyberpunk","valentine","halloween","garden","forest","aqua","lofi","pastel","fantasy",
      "wireframe","black","luxury","dracula","cmyk","autumn","business","acid","lemonade",
      "night","coffee","winter","dim","nord","sunset",
    ], // Puedes elegir los temas que quieras
    darkTheme: "light", // Establece el tema oscuro por defecto
    base: true, // Si deseas utilizar los estilos base de daisyUI
    styled: true, // Si deseas utilizar los componentes estilizados por daisyUI
    utils: true, // Habilita las clases utilitarias adicionales
    logs: true, // Activa los logs en consola de daisyUI
    rtl: false, // Habilita el soporte para lenguajes RTL
    prefix: "", // Puedes agregar un prefijo a todas las clases de daisyUI
  },
}
