
import { request } from "strapi-helper-plugin";
import { filter } from 'lodash';

export const getModels = () => {
  return request("/content-type-builder/content-types", {
    method: "GET",
  }).then((response) => {
    if (response.data) {
      return filter(response.data, (model) => !model.plugin);
    } else {
      return [];
    }
  }).catch((error) => {
    return [];
  });
};

export const getCollectionEntriesByApiId = (apiId) => {
  return request(`/${apiId}s`, {
    method: 'GET'
  });
};

export const getSingleEntryByApiId = (apiId) => {
  return request(`/${apiId}`, {
    method: 'GET'
  });
};