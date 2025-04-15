// vite.config.js
export default {
  define: {
    'import.meta.env.VITE_OPENROUTER_KEY': JSON.stringify(process.env.VITE_OPENROUTER_KEY)
  }
};
