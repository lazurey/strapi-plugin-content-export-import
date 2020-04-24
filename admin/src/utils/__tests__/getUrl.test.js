import {getUrl} from "../getUrl";

describe('# Get url', () => {
  it('should create url by plugin id and path', () => {
    expect(getUrl('my-plugin', 'import')).toBe('/plugins/my-plugin/import');
    expect(getUrl('my-plugin')).toBe('/plugins/my-plugin');
  });
});
