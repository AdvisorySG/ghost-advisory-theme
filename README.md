# ghost-advisory-theme ![Test and Deploy Theme](https://github.com/AdvisorySG/ghost-advisory-theme/workflows/Test%20and%20Deploy%20Theme/badge.svg)

Custom-built Ghost theme for [Advisory SG](https://advisory.sg), based on the [Starter theme](https://github.com/TryGhost/Starter).

# Introduction

Ghost uses a simple templating language called [Handlebars](http://handlebarsjs.com/) for its themes. You can access the full [theme API documentation](https://themes.ghost.org) which explains every possible Handlebars helper and template.

**The main files are:**

- `default.hbs` - The main template file
- `index.hbs` - Used for an index of posts (**deprecated**, superseded by `home.hbs`, `tag.hbs` & `author.hbs`)
- `home.hbs` - Used for the home page
- `post.hbs` - Used for individual posts
- `page.hbs` - Used for individual pages
- `tag.hbs` - Used for tag archives
- `author.hbs` - Used for author archives

The following custom page templates have been created:

- `page-stories.hbs` - Custom template for the `/stories/` page

Take note that for custom pages to be generated on Ghost, you would need to create static pages with the same slugs as indicated in their filename. For more details, please refer to the documentation for [pages](https://ghost.org/docs/api/v3/handlebars-themes/context/page/).

# Development

Styles are compiled using Gulp/PostCSS to polyfill future CSS spec. You'll need [Node](https://nodejs.org/), [Yarn](https://yarnpkg.com/) and [Gulp](https://gulpjs.com) installed globally. After that, from the theme's root directory:

```bash
# Install
yarn

# Run build & watch for changes
$ yarn dev
```

Now you can edit `*.hbs`, `assets/css/` and `assets/js/` files, which will be compiled automatically. In order to speed up development with a local instance of Ghost, you can create a shortcut/symbolic link from this repository to `content/themes/ghost-advisory-theme/` in the root directory of your Ghost installation. Take note that if you add new post templates, you may need to restart Ghost manually for the changes to take place in the Admin panel.

Alternatively (and more traditionally), the `zip` Gulp task packages the theme files into `dist/<theme-name>.zip`, which you can then upload to your site.

```bash
yarn zip
```

Should you have access to the [Admin panel of Advisory](https://beta.advisory.sg/ghost/), you may go to Settings > Labs > Migration Options > Export your content in order to obtain the posts and settings used for the actual website as a JSON file. Then, you may load up the file into your loacl instance of Ghost, at Settings > Labs > Migration Options > Import content. Take note that this will not remove existing posts/pages.

# PostCSS Features Used

- Autoprefixer - Don't worry about writing browser prefixes of any kind, it's all done automatically with support for the latest 2 major versions of every browser.
- Variables - Simple pure CSS variables
- [Color Function](https://github.com/postcss/postcss-color-function)

# Copyright & License

Copyright (c) 2013-2020 Ghost Foundation - Released under the [MIT license](LICENSE).
Copyright (c) 2020 Advisory SG - Release under the [MIT license](LICENSE).
