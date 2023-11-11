# @mahpooya/intervi-mix

This package contains laravel mix extensions and in future maybe other mix and webpack related stuff.

## Extensions

### SVG Loader For React + SCSS/LESS/CSS

This extension replaces default mix behavior of processing SVG files. This might be especially useful when you want to
use SVG images inline inside your code as a React Components. This is impossible by default, as mix treats SVGs as
standard images, and loads them using just a simple `file-loader` and `img-loader`. When your SVGs are inside `fonts`
directory, they're treated as a font, and loaded using only a `file-loader`. Because mix's rules catches all SVGs within
your app, it's impossible to simply add your custom loader as it won't take effect because of default mix rules.

The way this extension works, is defining some new rule for `.svg` files, with two different loaders used depending on
the issuer. For `tsx`, `jsx`, `ts`, `js` files it will load SVG as a React Component using SVGR loader. For `sass`,
`scss`, `less`, `css` files it will behave the same as originally in the mix, so will resolve SVG into file path.
Finally, we override default mix rules to prevent them catching SVG files. That way only our custom rule will be used,
and you can now import your SVG files like below:

**JS/TS/JSX/TSX**

```tsx
import React    from "react";
import SomeIcon from "../assets/some-icon-path.svg";

const ExampleComponent: React.FunctionComponent = () => (
  <div className="some-icon-wrapper">
    <SomeIcon/>
  </div>
);

export default ExampleComponent;
```

Above code will result into this when rendered:

```html

<div class="some-icon-wrapper">
  <svg role="img" viewBox="0 0 16 16">
    <!-- Your SVG content here -->
  </svg>
</div>
```

**SCSS/SASS/LESS/CSS**

```scss
.button {
    background-image: url("../assets/some-button-icon.svg");
}
```

Just like default when using mix, above code will result into this when compiled to CSS:

```css
.button {
    background-image: url("/images/some-button-icon.svg?86fa50164b5f5197fb5647a1dea78b48");
}
```

#### Installation

```shell
yarn add --dev @mahpooya/intervi-mix

# or when using npm

npm install --save-dev @mahpooya/intervi-mix
```

#### Usage

Simply require a package in your `webpack.mix.js` file and use a loader extensions like in example below:

```js
const mix = require('@mahpooya/laravel-mix');

require('@mahpooya/intervi-mix');

// ...

mix.ts('resources/js/app.tsx', 'public/js/app.js');
mix.useInterviSvgLoader();

// ...
```

#### Configuration

Because we use some standard loaders that mix comes with, we might need to provide some extra parameters for these
loaders. The `useInterviSvgLoader` method accepts a config parameters which you can use to provide some custom options.
These are the configs that are used by mix internally. Because mix doesn't allow to read its config outside, we had to
create a copy of its default config parameters in our extension. You don't have to provide any configuration, unless you
need to override any of the below default parameters:

```js
mix.useInterviSvgLoader({
  fileLoaderDirs: {
    images: "images",
    fonts:  "fonts",
  },

  imgLoaderOptions: {
    enabled:  true,
    gifsicle: {},
    mozjpeg:  {},
    optipng:  {},
    svgo:     {},
  },

  resourceRoot: "/",
});
```

#### TypeScript Support

When you use TypeScript you will have to define proper modules to import images and SVG files as react components. You
can simply create a declaration file somewhere in the path which is included in your type script compiler. Here is
example declaration that we use in our apps:

**resources/js/assets.d.ts**

```ts
declare module "*.svg" {
  import React = require("react");
  const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  export default ReactComponent;
}

declare module "*.jpg" {
  const content: string;
  export default content;
}

declare module "*.jpeg" {
  const content: string;
  export default content;
}

declare module "*.png" {
  const content: string;
  export default content;
}

declare module "*.gif" {
  const content: string;
  export default content;
}

declare module "*.webp" {
  const content: string;
  export default content;
}
```
