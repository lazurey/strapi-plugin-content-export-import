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
    method: 'POST',
    path: '/delete-all',
    handler: 'contentExportImportController.deleteAllContent',
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
