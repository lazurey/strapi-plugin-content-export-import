import {findAll, importSingleType} from "../content";

describe('# Stripi api helpers', () => {
  const setUpStrapi = (method) => {
    global.strapi = {
      query: () => method,
    };
  };

  it('should find all content by type', async () => {
    const find = jest.fn();
    setUpStrapi({find});
    await findAll('uid');
    expect(find).toHaveBeenCalled();
  });

  it('should update existing one for single type content', async () => {
    const update = jest.fn();
    const methods = {
      find: () => [{ id: 1 }],
      update,
    };
    setUpStrapi(methods);
    await importSingleType('uid', { value: 2 });
    expect(update).toHaveBeenCalled();
  });

  it('should create a new one for single type content if not exist', async () => {
    const update = jest.fn();
    const create = jest.fn();
    const methods = {
      find: () => [],
      update,
      create,
    };
    setUpStrapi(methods);
    await importSingleType('uid', { value: 2 });
    expect(update).not.toHaveBeenCalled();
    expect(create).toHaveBeenCalled();
  });
});
