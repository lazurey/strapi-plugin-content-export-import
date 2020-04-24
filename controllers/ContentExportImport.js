'use strict';

const PLUGIN_ID = 'content-export-import';

const validator = require('./validations');

module.exports = {
  importContent: async (ctx) => {
    const importService = strapi.plugins[PLUGIN_ID].services['contentexportimport'];
    const validationResult = validator.validateImportContentRequest(
      ctx.request.body);
    if (validationResult) {
      ctx.throw(400, validationResult);
      return;
    }
    await importService.importData(ctx);
    ctx.send({
      message: 'ok',
    });
  },
  deleteAllContent: async (ctx) => {
    const importService = strapi.plugins[PLUGIN_ID].services['contentexportimport'];
    const validationResult = validator.validateDeleteRequest(ctx.request.body);
    if (validationResult) {
      ctx.throw(400, validationResult);
      return;
    }
    const count = await importService.deleteAllData(
      ctx.request.body.targetModelUid, ctx);
    ctx.send({
      message: 'ok',
      count,
    });
  }
};
