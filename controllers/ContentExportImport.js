'use strict';

const PLUGIN_ID = 'content-export-import';

const validator = require('./validations');
const csvHelpers = require("./csvHelpers");

module.exports = {
  importContent: async (ctx) => {
    const importService = strapi.plugins[PLUGIN_ID].services['contentexportimport'];

    let body = ctx.request.body;

    try {
      // Check if request has files
      if (ctx.request.files) {
        // Get files['source']
        const sourceFile = ctx.request.files["source"].path;
        const type = ctx.request.files["source"].type;

        // Read and parse file['source']
        const source = csvHelpers.readFile(
          sourceFile,
          type === "text/csv" ? csvHelpers.csvParser : JSON.parse
        );

        body = {
          ...body,
          source,
        };

        ctx.request.body = body;

        console.log(body);
      }
    } catch (err) {
      console.error("err", err, ctx.request.files);
    }

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
