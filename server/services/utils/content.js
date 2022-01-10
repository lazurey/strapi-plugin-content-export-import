const importItemByContentType = (uid, data) => {
  return strapi.db.query(uid).create({
    data,
  });
};

const importSingleType = async (uid, { data }) => {
  const existing = await strapi.db.query(uid).findOne({});
  if (existing) {
    return strapi.db.query(uid).update({
      where: {
        id: existing.id,
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
  console.log(ids);
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
