export const convertModelToOption = (model) => ({
  label: model.schema.displayName,
  value: model.uid,
});
