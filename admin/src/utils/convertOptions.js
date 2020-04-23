export const convertModelToOption = (model) => ({
  label: model.schema.name,
  value: model.uid,
});
