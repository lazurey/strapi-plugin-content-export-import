'use strict';

const importItemByContentType = require('./utils/content').importItemByContentType;

/**
 * ContentExportImport.js service
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 */

module.exports = {
  importData: async (ctx) => {
    const { targetModel, source, kind } = ctx.request.body;
    try {
      if (kind === 'collectionType' && Array.isArray(source)) {
        // await deleteAll(id);
        for (let i = 0; i < source.length; i++) {
          await importItemByContentType(targetModel, source[i])
        }
      } else {
        await importItemByContentType(targetModel, source);
      }
    } catch (e) {
      ctx.throw(409, e.message);
    }
    // return importContentByContentType(targetModel, source, kind);
  }
};
