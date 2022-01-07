const validateImportContentRequest = (body) => {
  const { targetModel, source, kind } = body;
  if (!targetModel || !source || !kind) {
    return 'Required parameters missing';
  }
  return undefined;
};

const validateDeleteRequest = (body) => {
  const { targetModelUid } = body;
  return (targetModelUid) ? undefined : 'Target content type undefined';
};

module.exports = {
  validateImportContentRequest,
  validateDeleteRequest,
};
