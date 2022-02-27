module.exports = [
  {
    method: 'POST',
    path: '/import',
    handler: 'contentExportImportController.importContent',
    config: {
      policies: [],
    },
  },
  {
    method: 'GET',
    path: '/fetch-content',
    handler: 'contentExportImportController.getContentByType',
    config: {
      policies: [],
    }
  }
];
