import getTrad from "../getTrad";

describe('# Get Translation', () => {
  it('should get translations for label', () => {
    expect(getTrad('aha')).toBe('content-export-import.aha')
  });
});
