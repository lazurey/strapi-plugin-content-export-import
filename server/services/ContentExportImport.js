'use strict';

const utils  = require('./utils/content');
const _ = require('lodash');

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
        for (let i = 0; i < source.length; i++) {
          await utils.importItemByContentType(targetModel, source[i])
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
      const ids = _.map(all, (item) => item.id);
      await utils.deleteByIds(targetModelUid, ids);
      return all.length;
    } catch (e) {
      ctx.throw(409, e.message);
    }
  }
};
