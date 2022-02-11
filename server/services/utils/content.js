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

const removeCreatorAndUpdaterInfo = (item) => {
  delete item.createdBy;
  delete item.updatedBy;
}

const findAll = async (uid) => {
  const result = await strapi.entityService.findMany(uid, {
    populate: '*',
  });
  if (Array.isArray(result)) {
    result.forEach((value) => {
      removeCreatorAndUpdaterInfo(value);
    });
  } else {
    removeCreatorAndUpdaterInfo(result);
  }
  return result;
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
