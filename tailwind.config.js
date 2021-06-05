module.exports = {
    mode: "jit",
    purge: ["*.hbs", "**/*.hbs", "assets/js/*.js", "!node_modules/**/*.hbs"],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {},
    },
    variants: {
        extend: {},
    },
    plugins: [require("@tailwindcss/typography")],
};
