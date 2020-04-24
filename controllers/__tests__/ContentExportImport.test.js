import {deleteAllContent, importContent} from "../ContentExportImport";

describe('# Controller', () => {
  const setUpStrapi = (serviceMock) => {
    global.strapi = {
      plugins: {
        ['content-export-import']: {
          services: {
            contentexportimport: serviceMock
          }
        }
      }
    }
  };

  it('should throw 400 if required parameters not exist', async () => {
    const importData = jest.fn();
    const throwFn = jest.fn();
    setUpStrapi({
      importData,
    });
    const cxt = {
      throw: throwFn,
      request: {
        body: {}
      }
    };
    await importContent(cxt);
    expect(importData).not.toHaveBeenCalled();
    expect(throwFn).toHaveBeenCalledTimes(1);
    expect(throwFn).toHaveBeenCalledWith(400, expect.anything());
  });

  it('should import data', async () => {
    const importData = jest.fn();
    const throwFn = jest.fn();
    const sendFn = jest.fn();
    setUpStrapi({
      importData,
    });
    const cxt = {
      throw: throwFn,
      send: sendFn,
      request: {
        body: {
          targetModel: 'uid',
          source: { id: 1 },
          kind: 'singleType',
        }
      }
    };
    await importContent(cxt);
    expect(throwFn).not.toHaveBeenCalled();
    expect(importData).toHaveBeenCalledTimes(1);
    expect(importData).toHaveBeenCalledWith(cxt);
    expect(sendFn).toHaveBeenCalled();
  });

  it('should throw 400 if required parameters not exist', async () => {
    const deleteAllData = jest.fn();
    const throwFn = jest.fn();
    setUpStrapi({
      deleteAllData,
    });
    const cxt = {
      throw: throwFn,
      request: {
        body: {}
      }
    };
    await deleteAllContent(cxt);
    expect(deleteAllData).not.toHaveBeenCalled();
    expect(throwFn).toHaveBeenCalledTimes(1);
    expect(throwFn).toHaveBeenCalledWith(400, expect.anything());
  });
  it('should delete data by content type', async () => {
    const deleteAllData = jest.fn();
    const throwFn = jest.fn();
    const sendFn = jest.fn();
    setUpStrapi({
      deleteAllData,
    });
    const cxt = {
      throw: throwFn,
      send: sendFn,
      request: {
        body: {
          targetModelUid: 'uid',
        }
      }
    };
    await deleteAllContent(cxt);
    expect(throwFn).not.toHaveBeenCalled();
    expect(deleteAllData).toHaveBeenCalledTimes(1);
    expect(sendFn).toHaveBeenCalled();
  });
});
