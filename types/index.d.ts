import {Api}       from "laravel-mix";
import {MixConfig} from "laravel-mix/types/config";

declare const config: MixConfig;

export type SvgLoaderConfig = {
  fileLoaderDirs?: typeof config.fileLoaderDirs;
  imgLoaderOptions?: typeof config.imgLoaderOptions;
  resourceRoot?: typeof config.resourceRoot;
};

declare module 'laravel-mix' {

  export interface Api {

    /**
     * Initializes SVG loader which uses a SVGR loader for JS and standard file loader for styles. In case of JSX/TSX
     * files or even plain JS/TS components we rather want to load SVG file inline as a React Component.
     *
     * This is handled by SVGR loader, which will import SVG files as React Component with it's contents inside. That
     * way you can use SVGs inline in your app and benefit with full SVG control (colors, animations, etc.)
     *
     * But sometimes we want to use standard stylesheets with use of for example SASS/LESS. In those files we don't
     * want to load SVG content and put it inline inside of for example `background` property. In such case if you try
     * to load SVG in your stylesheets, a standard `file-loader` and `img-loader` will be used.
     *
     * **IMPORTANT!**
     *
     * Because Laravel Mix doesn't allow to access it's config inside an extension, you have to pass some extra config
     * for the loaders when you use some custom `imagesDir`, `resourceRoot` or `imgLoaderOptions` parameters in Mix.
     *
     * @param config
     */
    useInterviSvgLoader(config?: SvgLoaderConfig): Api;

  }

}
