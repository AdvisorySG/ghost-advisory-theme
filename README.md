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

First, [setup a local Ghost instance](https://ghost.org/docs/install/local/).

Should you have access to the [Admin panel of Advisory](https://beta.advisory.sg/ghost/), you may go to Settings > Labs > Migration Options > Export your content in order to obtain the posts and settings used for the actual website as a JSON file. Then, you may load up the file into your local instance of Ghost, at Settings > Labs > Migration Options > Import content. Take note that this will not remove existing posts/pages.

To build the theme, you'll need [Node](https://nodejs.org/), [Yarn](https://yarnpkg.com/) and [Gulp](https://gulpjs.com) installed globally. From the root directory, you can execute the `zip` Gulp task:

```bash
# Install dependencies
yarn

# Package the theme into a zip archive
yarn zip
```

The theme files are packaged into `dist/<theme-name>.zip`, which you can then upload to your site, at Settings > Design > Installed Themes > Upload a theme.

## Speedy Development

To speed up development with a local instance of Ghost, you may use an alternative procedure to directly place the theme directory in the `content/themes/` directory of Ghost.

Firstly, use the earlier mentioned process with `yarn zip` and upload the theme. This is important, as **Ghost will not recognise your new theme directory if you do not perform this import first**. In the `content/themes/` directory from the root directory of your Ghost installation, you should see the `ghost-advisory-theme` directory. (**Do not perform this step by importing a zipfile directly from the GitHub Actions builds; as the zipfile has an appended hash, Ghost will not recognise your new `ghost-advisory-theme` directory. Make sure to rename the zipfile to `ghost-advisory-theme.zip` before importing.**)

Once you have verified that the `content/themes/ghost-advisory-theme/` directory is in place and Ghost recognises the directory as a theme, remove the `ghost-advisory-theme` directory and clone this repository into the `content/themes/` directory under the same directory name `ghost-advisory-theme`. (Alternatively, if you use an Unix-based system, you may create a symbolic link instead. Windows users may wish to create a shortcut from the Ghost directory instead.)

Finally, run `yarn dev` in the `content/themes/ghost-advisory-theme/` directory and refresh the Ghost admin panel. You should see the correct theme appear. Upon making changes to theme files, `yarn dev` should build the changed files and the changes should be reflected upon refresh.

This method is not officially supported by Ghost and might break any time (though the theme handling logic is unlikely to be modified in the foreseeable future). Take note that if you add new post templates, you may need to restart Ghost manually for the changes to take place in the Admin panel.

# Content API Key

We have two features which make use of Ghost's content API:

1. [SearchInGhostEasy](https://github.com/gmfmi/searchinghost-easy), which adds a client-side full-text search for articles.
1. Population of event cards in the homepage

If you want these features to be functional on your local machine, you'll need to update [default.hbs](./default.hbs) with a new local content API key. To add a new key, go to Integrations > Custom Integrations > Add custom integration and copy the content API key.

# Copyright & License

Copyright (c) 2013-2020 Ghost Foundation - Released under the [MIT license](LICENSE).

Copyright (c) 2020 Advisory SG - Released under the [MIT license](LICENSE).
