const importItemByContentType = (uid, item) => {
  return strapi.db.query(uid).create({
    data: item.attributes,
  });
};

const importSingleType = async (uid, item) => {
  const data = item.data.attributes;
  const existing = await strapi.db.query(uid).findOne({});
  if (existing.length > 0) {
    return strapi.db.query(uid).update({
      where: {
        id: existing[0].id,
      },
      data,
    })
  } else {
    return strapi.db.query(uid).create({
      data,
    });
  }
};

const findAll = (uid) => {
  return strapi.entityService.findMany(uid, {});
};

const deleteByIds = (uid, ids) => {
  return strapi.db.query(uid).deleteMany({
    where: {
      id: {
        $in: ids,
      }
    }
  });
};

module.exports = {
  importItemByContentType,
  findAll,
  deleteByIds,
  importSingleType,
};
