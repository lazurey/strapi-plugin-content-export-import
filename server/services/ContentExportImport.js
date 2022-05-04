'use strict';

const utils  = require('./utils/content');

/**
 * ContentExportImport.js service
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 */

module.exports = {
  importData: async (ctx) => {
    const { targetModel, source, kind } = ctx.request.body;
    try {
      if (kind === 'collectionType' && source) {
        const items = source.data;
        for (let i = 0; i < items.length; i++) {
          await utils.importItemByContentType(targetModel, items[i])
        }
      } else {
        await utils.importSingleType(targetModel, source);
      }
    } catch (e) {
      ctx.throw(409, e.message);
    }
  },
  findAll: async (uid, populateSchema) => {
    const all = await utils.findAll(uid, populateSchema);
    return all;
  }
};
