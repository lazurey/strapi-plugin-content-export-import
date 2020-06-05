const importItemByContentType = async (id, item) => {
  // Get the model definition - Maybe there's a more elegant way?
  const modelName = id.split('.').reverse()[0];
  const {attributes} = strapi.models[modelName];
  // Get which fields are unique indexes
  const uniqueIndexes = Object.keys(attributes).filter(
    (aName) => attributes[aName].index && attributes[aName].unique
  );
  // Unique fields present in the inserted item will be used to search for existing items
  const search = [];
  uniqueIndexes.forEach((i) => {
    if (item[i]) {
      search.push({
        [i]: item[i],
      });
    }
  });

  if (search.length > 0) {
    const existingItem = await strapi.query(id).model.findOne({$or: search});
    if (existingItem) {
      return strapi.query(id).update({id: existingItem.id}, item);
    }
  }
  return strapi.query(id).create(item);
};

const importSingleType = async (uid, item) => {
  const existing = await strapi.query(uid).find({});
  if (existing.length > 0) {
    return strapi.query(uid).update(
      {
        id: existing[0].id,
      },
      item
    );
  } else {
    return strapi.query(uid).create(item);
  }
};

const findAll = (uid) => {
  return strapi.query(uid).find({});
};

const deleteByIds = (uid, ids) => {
  return strapi.query(uid).delete({
    id_in: ids,
  });
};

module.exports = {
  importItemByContentType,
  findAll,
  deleteByIds,
  importSingleType,
};
