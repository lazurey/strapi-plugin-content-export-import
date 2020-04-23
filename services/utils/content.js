// const _ = require('lodash');

const importItemByContentType = async (id, item) => {
  return strapi.query(id).create(item);
};
//
// const deleteAll = async (id) => {
//   const data = await strapi.query(id).find({
//     created_at: new Date()
//   });
//
// // Delete all entries fetched.
//   data.forEach((entry) => strapi.query(id).delete({
//     id: entry.id
//   }));
// };

module.exports = {
  importItemByContentType,
};
