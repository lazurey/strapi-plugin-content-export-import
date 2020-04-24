'use strict';

const PLUGIN_ID = 'content-export-import';

module.exports = {
  index: async (ctx) => {
    ctx.send({
      message: 'ok',
    });
  },
  importContent: async (ctx) => {
    const importService = strapi.plugins[PLUGIN_ID].services['contentexportimport'];
    const { targetModel, source, kind } = ctx.request.body;
    if (!targetModel || !source || !kind) {
      ctx.response.status = 400;
      ctx.response.message = "Required parameters not sent!";
      return;
    }
    await importService.importData(ctx);
    ctx.send({
      message: 'ok',
    });
  },
  deleteAllContent: async (ctx) => {
    const importService = strapi.plugins[PLUGIN_ID].services['contentexportimport'];
    const { targetModelUid } = ctx.request.body;
    if (!targetModelUid) {
      ctx.response.status = 400;
      ctx.response.message = "Required parameters not sent!";
      return;
    }
    const count = await importService.deleteAllData(targetModelUid, ctx);
    ctx.send({
      message: 'ok',
      count,
    });
  }
};
