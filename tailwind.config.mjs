/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}", // Include any files in the pages folder
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}", // Include any files that use Tailwind CSS
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",// Include any files that use Tailwind CSS
    "./src/styles/**/*.css", // Include CSS files
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)", // Adiciona a cor de fundo
        foreground: "var(--foreground)", // Adiciona a cor do texto
      },
    },
  },
  plugins: [],
};

