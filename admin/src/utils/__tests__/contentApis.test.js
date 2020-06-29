import {fetchEntries, getModels} from "../contentApis";
import * as strapiHelper from "strapi-helper-plugin";

jest.mock("strapi-helper-plugin");

describe('# Strapi content api helpers', () => {
  it('should get all customised content types', async () => {
    strapiHelper.request.mockResolvedValue({
      data: [{
        uid: 'content-type-1',
      }, {
        uid: 'content-type-2',
      }, {
        uid: 'aha',
        plugin: 'user-permission',
      }]
    });
    const models = await getModels();
    expect(models).toHaveLength(2);
  });

  it('should handle 2xx response but without data', async () => {
    strapiHelper.request.mockResolvedValue({
      something: 'else'
    });
    const models = await getModels();
    expect(models).toHaveLength(0);
  });
  it('should return empty array if content type api throw an error', async () => {
    strapiHelper.request.mockRejectedValue({
      message: 'some errors',
    });
    const models = await getModels();
    expect(models).toHaveLength(0);
  });

  it('should call collection api if content type is a collection', async () => {
    const request = jest.fn();
    strapiHelper.request.mockImplementation(request);
    await fetchEntries('content-type', 'collectionType');
    expect(request).toBeCalledTimes(1);
    expect(request).toHaveBeenCalledWith('/content-types', { method: 'GET'});
  });

  it('should handle irregular plural collection name', async () => {
    const request = jest.fn();
    strapiHelper.request.mockImplementation(request);
    await fetchEntries('company', 'collectionType');
    expect(request).toBeCalledTimes(1);
    expect(request).toHaveBeenCalledWith('/companies', { method: 'GET'});
  });

  it('should call single api if content type is a single', async () => {
    const request = jest.fn();
    strapiHelper.request.mockImplementation(request);
    await fetchEntries('content-type', 'singleType');
    expect(request).toBeCalledTimes(1);
    expect(request).toHaveBeenCalledWith('/content-type', { method: 'GET'});
  });
});
