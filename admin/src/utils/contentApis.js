import { request } from "strapi-helper-plugin";
import { filter } from 'lodash';
import {MODEL_KIND} from "../constants/model-kind";

export const getModels = () => {
  return request("/content-type-builder/content-types", {
    method: "GET",
  }).then((response) => {
    if (response.data) {
      return filter(response.data, (model) => !model.plugin);
    } else {
      return [];
    }
  }).catch(() => {
    return [];
  });
};

export const fetchEntries = (apiId, kind) => {
  const url = (kind === MODEL_KIND.collection) ? `/${apiId}s` : `/${apiId}`;
  return request(url, { method: 'GET' });
};
