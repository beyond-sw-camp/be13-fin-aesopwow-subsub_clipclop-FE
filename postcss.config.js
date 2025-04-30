import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

export default {
  plugins: [
    tailwindcss({ config: './src/styles/tailwind.config.js' }),
    autoprefixer(),
  ],
};