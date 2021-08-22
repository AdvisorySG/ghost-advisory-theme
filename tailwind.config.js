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
        extend: {
            typography: {
                DEFAULT: {
                    css: {
                        a: {
                            textDecoration: "none",
                        },
                    },
                },
            },
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
