export const getUrl = (pluginId, to) =>
  to ? `/plugins/${pluginId}/${to}` : `/plugins/${pluginId}`;