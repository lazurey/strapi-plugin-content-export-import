import {readLocalFile} from "../file";

describe('# Filer reader', () => {
  it('should read local file and parse it', async () => {
    const file = new Blob();
    const parser = jest.fn();
    await readLocalFile(file, parser);
    expect(parser).toHaveBeenCalledTimes(1);
  });
  it('should read local file and return if no parser', async () => {
    const file = new Blob();
    const spy = jest.spyOn(FileReader.prototype, 'readAsText');
    await readLocalFile(file);
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
