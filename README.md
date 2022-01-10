# Strapi plugin content-export-import

![](https://github.com/lazurey/strapi-plugin-content-export-import/workflows/Run-Tests/badge.svg)

Working on Strapi version: v4.0.3

## First Setup

1. Clone the plugin into your Strapi project

```bash
cd /<path-to-your-strapi-project>/src

# create plugins folder if not exists
# mkdir plugins

# go to plugins folder
cd plugins

# clone the plugin code into a folder and skip the prefix
git clone git@github.com:lazurey/strapi-plugin-content-export-import.git content-export-import
# install dependencies
cd content-export-import && yarn install
```

2. Enable the plugin in `<root>/config/plugins.js` .

```javascript
module.exports = {
  // ...
  'content-export-import': {
    enabled: true,
    resolve: './src/plugins/content-export-import' // path to plugin folder
  },
  // ...
}
```

3. Build the plugin

```bash
# back to project root and build the plugin
yarn build
# start
yarn develop
```

Note:
> it's important to clone the repo into a target folder named `content-export-import`, the prefix has to be omitted.

## Plugin development
```bash
yarn develop --watch-admin
```
Running at http://localhost:8080/

## Features

- Support JSON export & import
- Delete all content of a type

**Not supported**

- Media fields, e.g. image, video, etc.
- Any other file type, e.g. csv, etc.

## References

- [Component List - Strapi Helper Plugin](https://github.com/strapi/strapi/tree/master/packages/strapi-helper-plugin/lib/src/components)
- [Strapi Content Import Plugin](https://github.com/strapi/community-content/tree/master/tutorials/code/import-content-plugin-tutorial/plugins/import-content)
- [Guide to Strapi Content Import Plugin](https://strapi.io/blog/how-to-create-an-import-content-plugin-part-1-4?redirectPage=3)
- [Strapi Styled Component](https://design-system-git-develop-strapijs.vercel.app/)
