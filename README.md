# ghost-advisory-theme ![Test and Deploy Theme](https://github.com/AdvisorySG/ghost-advisory-theme/workflows/Build%20and%20Deploy%20Theme/badge.svg)

Custom-built Ghost theme for [Advisory SG](https://advisory.sg), based on the [Starter theme](https://github.com/TryGhost/Starter).

# Introduction

Ghost uses a simple templating language called [Handlebars](http://handlebarsjs.com/) for its themes. You can access the full [theme API documentation](https://themes.ghost.org) which explains every possible Handlebars helper and template.

**The main files are:**

-   `default.hbs` - The main template file
-   `index.hbs` - Used for an index of posts (**deprecated**, superseded by `home.hbs`, `tag.hbs` & `author.hbs`)
-   `home.hbs` - Used for the home page
-   `post.hbs` - Used for individual posts
-   `page.hbs` - Used for individual pages
-   `tag.hbs` - Used for tag archives
-   `author.hbs` - Used for author archives

The following custom page templates have been created:

-   `page-stories.hbs` - Custom template for the `/stories/` page
-   `page-impact.hbs` - Custom template for the `/impact/` page

Take note that for custom pages to be generated on Ghost, you would need to create static pages with the same slugs as indicated in their filename. For more details, please refer to the documentation for [pages](https://ghost.org/docs/api/v3/handlebars-themes/context/page/).

# Development

Styles are compiled using Gulp/PostCSS to polyfill future CSS spec. You'll need [Node](https://nodejs.org/), [Yarn](https://yarnpkg.com/) and [Gulp](https://gulpjs.com) installed globally. After that, from the theme's root directory:

```bash
# Install
yarn

# Run build & watch for changes
yarn dev
```

Now you can edit `*.hbs`, `assets/css/` and `assets/js/` files, which will be compiled automatically. The `zip` Gulp task packages the theme files into `dist/<theme-name>.zip`, which you can then upload to your site.

```bash
yarn zip
```

Should you have access to the [Admin panel of Advisory](https://beta.advisory.sg/ghost/), you may go to Settings > Labs > Migration Options > Export your content in order to obtain the posts and settings used for the actual website as a JSON file. Then, you may load up the file into your local instance of Ghost, at Settings > Labs > Migration Options > Import content. Take note that this will not remove existing posts/pages.

## Speedy Development (Advanced)

To speed up development with a local instance of Ghost, you may use an alternative procedure to directly place the theme directory in the `content/themes/` directory of Ghost.

Firstly, use the earlier mentioned process with `yarn zip` and upload the theme. This is important, as **Ghost will not recognise your new theme directory if you do not perform this import first**. In the `content/themes/` directory from the root directory of your Ghost installation, you should see the `ghost-advisory-theme` directory. (**Do not perform this step by importing a zipfile directly from the GitHub Actions builds; as the zipfile has an appended hash, Ghost will not recognise your new `ghost-advisory-theme` directory. Make sure to rename the zipfile to `ghost-advisory-theme.zip` before importing.**)

Once you have verified that the `content/themes/ghost-advisory-theme/` directory is in place and Ghost recognises the directory as a theme, remove the `ghost-advisory-theme` directory and clone this repository into the `content/themes/` directory under the same directory name `ghost-advisory-theme`. (Alternatively, if you use an Unix-based system, you may create a symbolic link instead. Windows users may wish to create a shortcut from the Ghost directory instead.)

Finally, run `yarn dev` in the `content/themes/ghost-advisory-theme/` directory and refresh the Ghost admin panel. You should see the correct theme appear. Upon making changes to theme files, `yarn dev` should build the changed files and the changes should be reflected upon refresh.

This method is not officially supported by Ghost and might break any time (though the theme handling logic is unlikely to be modified in the foreseeable future). Take note that if you add new post templates, you may need to restart Ghost manually for the changes to take place in the Admin panel.

# PostCSS Plugins Used

-   [Autoprefixer](https://github.com/postcss/autoprefixer)
-   [Color Mod Function](https://github.com/jonathantneal/postcss-color-mod-function)
-   [cssnano](https://github.com/cssnano/cssnano)
-   [Custom Properties](https://github.com/postcss/postcss-custom-properties)
-   [Easy Import](https://github.com/trysound/postcss-easy-import)

# Search

We use [SearchInGhostEasy](https://github.com/gmfmi/searchinghost-easy) to implement a client-side full-text search for articles. If you want search to be functional on your local machine, you'll need to update [default.hbs](./default.hbs) with a new local content API key. See the [SearchInGhostEasy documentation for more information](https://github.com/gmfmi/searchinghost-easy).

# Copyright & License

Copyright (c) 2013-2020 Ghost Foundation - Released under the [MIT license](LICENSE).

Copyright (c) 2020 Advisory SG - Released under the [MIT license](LICENSE).
