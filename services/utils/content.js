const importItemByContentType = async (id, item) => {
  const modelName = id.split('.').reverse()[0];
  const model = strapi.models[modelName];
  const uniqueIndexes = Object.keys(model.attributes).filter(
    (aName) => model.attributes[aName].index && model.attributes[aName].unique
  );
  const search = [];
  uniqueIndexes.forEach((i) => {
    if (item[i]) {
      search.push({
        [i]: item[i],
      });
    }
  });

  if (search.length > 0) {
    const existingItem = await strapi.query(id).model.findOne({ $or: search });
    if (existingItem) {
      return strapi.query(id).update({ id: existingItem.id }, item);
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
