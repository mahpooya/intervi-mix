const mix              = require('laravel-mix');
const InterviSvgLoader = require("./extensions/InterviSvgLoader");

mix.extend('useInterviSvgLoader', new InterviSvgLoader());
