'use strict';

/**
 * ContentExportImport.js controller
 *
 * @description: A set of functions called "actions" of the `content-export-import` plugin.
 */

/*
# POC TODO:
## Export
* list out possible export content
  * Dashboard widgets
  * Layout
* Export to some format, sql, json, csv?

## Import

*/
module.exports = {

  /**
   * Default action.
   *
   * @return {Object}
   */

  index: async (ctx) => {
    // Add your own logic here.

    // Send 200 `ok`
    ctx.send({
      message: 'ok'
    });
  }
};
