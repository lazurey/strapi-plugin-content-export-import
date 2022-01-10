'use strict';

const PLUGIN_ID = 'content-export-import';

const validator = require('./validations');

module.exports = {
  importContent: async (ctx) => {
    const validationResult = validator.validateImportContentRequest(
      ctx.request.body);
    if (validationResult) {
      ctx.throw(400, validationResult);
      return;
    }
    await strapi
      .plugin(PLUGIN_ID)
      .service('contentExportImportService').importData(ctx);
    ctx.send({
      message: 'ok',
    });
  },
  deleteAllContent: async (ctx) => {
    const validationResult = validator.validateDeleteRequest(ctx.request.body);
    if (validationResult) {
      ctx.throw(400, validationResult);
      return;
    }
    const count = await strapi
      .plugin(PLUGIN_ID)
      .service('contentExportImportService').deleteAllData(
      ctx.request.body.targetModelUid, ctx);
    ctx.send({
      message: 'ok',
      count,
    });
  },
  getContentByType: async (ctx) => {
    const contentTypeUid = ctx.request.query.uid;
    const data = await strapi
      .plugin(PLUGIN_ID)
      .service('contentExportImportService').findAll(contentTypeUid);
    ctx.send({
      data,
    });
  }
};
