# Strapi plugin content-export-import

![](https://github.com/lazurey/strapi-plugin-content-export-import/workflows/Run-Tests/badge.svg)

## First Setup
```bash
cd /<path-to-your-strapi-project

# create plugins folder if not exists
# mkdir plugins

# go to plugins folder
cd plugins

# clone the plugin code into a folder and skip the prefix
git clone git@github.com:lazurey/strapi-plugin-content-export-import.git content-export-import
# install dependencies
cd conetnt-export-import && yarn install
# build the plugin
cd ../..
yarn build

# start
yarn develop
```

## Plugin development
```bash
yarn develop --watch-admin
```
Running at http://localhost:8000/

## Todo

- [x] How to install in an existing Strapi
- [x] Permission issues in normal mode
- [x] Update or clean & insert

## References

- [Component List - Strapi Helper Plugin](https://github.com/strapi/strapi/tree/master/packages/strapi-helper-plugin/lib/src/components)
- [Strapi Content Import Plugin](https://github.com/strapi/community-content/tree/master/tutorials/code/import-content-plugin-tutorial/plugins/import-content)
- [Guide to Strapi Content Import Plugin](https://strapi.io/blog/how-to-create-an-import-content-plugin-part-1-4?redirectPage=3)
- [Strapi Styled Component](https://buffetjs.io/storybook/?path=/story/components--button)
