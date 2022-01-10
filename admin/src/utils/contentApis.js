import { request } from "@strapi/helper-plugin";
import { filter } from 'lodash';
import pluginId from "../pluginId";

export const getModels = () => {
  return request("/content-type-builder/content-types", {
    method: "GET",
  }).then((response) => {
    return filter(response.data, (model) => !model.plugin)
  }).catch(() => {
    return [];
  });
};

export const fetchAll = (apiId) => {
  return request(`/${pluginId}/fetch-content?uid=${apiId}`);
}
