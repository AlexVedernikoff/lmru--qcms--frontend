const {grid} = require('@fronton/postcss-plugin').presets;

module.exports = {
    theme: {
        layout: {
            breakpoints: grid.lmruGrid,
        },
    },
};
