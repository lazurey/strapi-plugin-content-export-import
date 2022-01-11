import { convertToCsv } from "../csvHelper";

describe("# CSV Helper", () => {
  it("should return empty if given data is null", () => {
    expect(convertToCsv()).toBe("");
    expect(convertToCsv(null)).toBe("");
  });
  it("should return empty if given data is not object", () => {
    expect(convertToCsv(1)).toBe("");
    expect(convertToCsv("string")).toBe("");
  });
  it("should convert object to csv string", () => {
    const obj = {
      id: 1,
      title: 'test',
    };
    expect(convertToCsv(obj)).toBe(
`id,title
1,test`);
  });
  it("should convert array to csv string", () => {
    const obj = {
      id: 1,
      title: 'test',
    };
    expect(convertToCsv([obj, obj, obj])).toBe(
`id,title
1,test
1,test
1,test`);
  });
});
