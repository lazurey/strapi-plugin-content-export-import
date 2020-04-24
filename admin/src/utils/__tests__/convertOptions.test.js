import {convertModelToOption} from "../convertOptions";

describe('# Select option helpers', () => {
  it('should convert model to select options', () => {
    expect(convertModelToOption({
      uid: 'content-type',
      schema: {
        name: 'Content Type'
      }
    })).toEqual({
      value: 'content-type',
      label: 'Content Type',
    });
  });
});
