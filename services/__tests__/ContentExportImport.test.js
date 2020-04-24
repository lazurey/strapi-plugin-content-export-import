import utils from '../utils/content';
import service from '../ContentExportImport';
jest.mock('../utils/content');

describe('# Service', () => {
  const mockCxt = (body) => ({
    request: { body },
  });

  it('should import collection type content one by one', async () => {
    const importItemByContentType = jest.fn();
    const collectionCxt = mockCxt({
      targetModel: 'uid',
      source: [{
        id: 1,
      }, {
        id: 2
      }],
      kind: 'collectionType',
    });
    utils.importItemByContentType.mockImplementation(importItemByContentType);
    await service.importData(collectionCxt);
    expect(importItemByContentType).toHaveBeenCalledTimes(2);
  });

  it('should use update for single type content', async () => {
    const importSingleType = jest.fn();
    const singleCxt = mockCxt({
      targetModel: 'uid',
      source: { id: 1 },
      kind: 'singleType',
    });
    utils.importSingleType.mockImplementation(importSingleType);
    await service.importData(singleCxt);
    expect(importSingleType).toHaveBeenCalledTimes(1);
  });

  it('should delete content by ids and return deleted count', async () => {
    const deleteAll = jest.fn();
    const deleteCtx = mockCxt({});
    utils.findAll.mockImplementation(() => [{ id: 1 }, {id: 13 }]);
    utils.deleteByIds.mockImplementation(deleteAll);
    await service.deleteAllData('uid', deleteCtx);
    expect(deleteAll).toBeCalledTimes(1);
    expect(deleteAll).toBeCalledWith('uid', [1, 13]);
  });
});
