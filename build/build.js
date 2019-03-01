/* eslint-env node */
const path = require('path');
const glob = require('glob');
const util = require('./util');
const argv = require('minimist')(process.argv.slice(2));

argv._.forEach(arg => {
    const tokens = arg.split('=');
    argv[tokens[0]] = tokens[1] || true;
});

const numArgs = Object.keys(argv).length;
argv.all = argv.all || numArgs <= 1; // no arguments passed, so compile all

const minify = !(argv.debug || argv.nominify || argv.d);

// TODO, reference camelize function from utils when seperated
const camelizeRe = /-(\w)/g;

function camelize(str) {
    return str.replace(camelizeRe, toUpper);
}

function toUpper(_, c) {
    return c ? c.toUpperCase() : '';
}

// -----

// map component build jobs
const components = glob.sync('src/js/components/*.js').reduce((components, file) => {

    const name = path.basename(file, '.js');

    components[name] = () => {
        return util.compile(`${__dirname}/componentWrapper.js`, `dist/${file.substring(4, file.length - 3)}`, {
            name,
            minify,
            external: ['skit', 'skit-util'],
            globals: {uikit: 'Skit', 'skit-util': 'Skit.util'},
            aliases: {component: path.join(__dirname, '..', file.substr(0, file.length - 3))},
            replaces: {NAME: `'${camelize(name)}'`}
        });
    };

    return components;
}, {});

const steps = {

    core: () => util.compile('src/js/skit-core.js', 'dist/js/skit-core', {minify}),
    uikit: () => util.compile('src/js/skit.js', 'dist/js/skit', {minify, bundled: true}),
    icons: () => util.icons('{src/images,custom}/icons/*.svg').then(ICONS => util.compile('src/js/icons.js', 'dist/js/skit-icons', {
        minify,
        name: 'icons',
        replaces: {ICONS}
    }))

};

if (argv.h || argv.help) {

    console.log(`
        usage:

        build.js [componentA, componentB, ...] [-d|debug|nominify|development]

        examples:

        build.js // builds all of uikit, including icons and does minification (implies 'all')
        build.js uikit icons -d // builds all of uikit and the icons, skipping the minification
        build.js core lightbox -d // builds uikit-core and the lightbox, skipping the minification

        available components:

        bundles: ${Object.keys(steps).join(', ')}
        components: ${Object.keys(components).join(', ')}

    `);

} else {

    let jobs = collectJobs();

    if (jobs.length === 0) {
        argv.all = true;
        jobs = collectJobs();
    }

}

function collectJobs() {

    // if parameter components is set or all or none(implicit all), add all components
    if (argv.components || argv.all) {
        Object.assign(argv, components);
    }

    // if parameter components is set or all or none(implicit all), add all steps
    if (argv.all) {
        Object.assign(argv, steps);
    }

    Object.assign(steps, components);

    // Object.keys(argv).forEach(step => components[step] && componentJobs.push(components[step]()));
    return Object.keys(argv).filter(step => steps[step]).map(step => steps[step]());

}