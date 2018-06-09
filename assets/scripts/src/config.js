/**
 * Application configuration declaration.
 *
 * This configuration file is shared between the website and the build script so
 * that values don't have to be duplicated across environments. Any non-shared,
 * environment-specific configuration should placed in appropriate configuration files.
 */

requirejs.config({
    // This is just to set a shorter alias for longer paths
    paths: {
        // RequireJS plugins
        'text': 'lib-thirdparty/require/text',
        'json': 'lib-thirdparty/require/json',

        // Third party libraries
        'jquery': 'lib-thirdparty/jquery-2.2.0.min',
        'handlebars': 'lib-thirdparty/handlebars-v4.0.5'
    },

    // This allows us to set dependencies for third-party libraries that do not follow the RequireJS pattern
    shim: {
        'jquery': { exports: '$' }
    }
});
