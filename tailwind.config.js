module.exports = {
    mode: "jit",
    purge: [
        "*.hbs",
        "**/*.hbs",
        "assets/built/**/*.js",
        "!node_modules/**/*.hbs",
    ],
    darkMode: false, // or 'media' or 'class'
    theme: {
        width: {
            '200': '200px',
            '300': '300px',
            '400': '400px',
            '500': '500px',
            '600': '600px',
            '700': '700px',
            '800': '800px',
            '900': '900px',
            '1000': '1000px',
            
           },
           height: {
            '200': '200px',
            '300': '300px',
            '400': '400px',
            '500': '500px',
            '600': '600px',
            '700': '700px',
            '800': '800px',
            '900': '900px',
            '1000': '1000px',
            
           },
           screens: {
            'sm': '200px',
            // => @media (min-width: 640px) { ... }
      
            'md': '768px',
            // => @media (min-width: 768px) { ... }
      
            'lg': '1024px',
            // => @media (min-width: 1024px) { ... }
      
            'xl': '1280px',
            // => @media (min-width: 1280px) { ... }
      
            '2xl': '1536px',
            // => @media (min-width: 1536px) { ... }
          },
    },
    variants: {
        extend: {},
    },
    plugins: [
        require("@tailwindcss/typography"),
        require("@tailwindcss/line-clamp"),
    ],
};
