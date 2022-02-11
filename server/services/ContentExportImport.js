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
  deleteAllData: async (targetModelUid, ctx) => {
    try {
      const all = await utils.findAll(targetModelUid);
      const ids = (Array.isArray(all)) ? all.map(item => item.id) : [all.id];
      await utils.deleteByIds(targetModelUid, ids);
      return ids.length;
    } catch (e) {
      ctx.throw(409, e.message);
    }
  },
  findAll: async (uid) => {
    const all = await utils.findAll(uid);
    return all;
  }
};
