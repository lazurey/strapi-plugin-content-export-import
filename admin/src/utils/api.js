import {request} from "strapi-helper-plugin";
import pluginId from '../pluginId';

export const importData = (body) => {
  return request(`/${pluginId}/import`, {
    method: 'POST',
    body,
  });
};

export const deleteAll = (targetModelUid) => {
  return request(`/${pluginId}/delete-all`, {
      method: 'POST',
      body: {
        targetModelUid,
      },
    }
  );
};