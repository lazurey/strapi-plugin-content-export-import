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
    getContentByType: async (ctx) => {
        const contentTypeUid = ctx.request.query.uid;
        var populateSchema = '*'
        const customSchemas = strapi.plugin(PLUGIN_ID).config('customSchemas');
        Object.keys(customSchemas).forEach(key => {
            if (contentTypeUid === key) {
                populateSchema = customSchemas[key];
            }
        })    
        const data = await strapi
            .plugin(PLUGIN_ID)
            .service('contentExportImportService').findAll(contentTypeUid, populateSchema);
        ctx.send({
            data,
        });
    }
};
