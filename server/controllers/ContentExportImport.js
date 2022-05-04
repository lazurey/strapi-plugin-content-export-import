'use strict';

const PLUGIN_ID = 'content-export-import';

const { SIMULATION_POPULATE } = require('../../admin/src/constants/customPopulateSchema');
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
        if (contentTypeUid === 'api::simulation.simulation') {
            populateSchema = SIMULATION_POPULATE
        }
        const data = await strapi
            .plugin(PLUGIN_ID)
            .service('contentExportImportService').findAll(contentTypeUid, populateSchema);
        ctx.send({
            data,
        });
    }
};
