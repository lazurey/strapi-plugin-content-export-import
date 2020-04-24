import {
  validateDeleteRequest,
  validateImportContentRequest
} from "../validations";

describe('# Request body validation', () => {
  it('should validate all required parameters appear', () => {
    expect(validateImportContentRequest({})).not.toBeUndefined();
    expect(validateDeleteRequest({})).not.toBeUndefined();
  });
  it('should pass when all required parameters appear', () => {
    expect(validateImportContentRequest({
      targetModel: 'uid',
      source: [{ id: 1 }],
      kind: 'collectionType',
    })).toBeUndefined();
    expect(validateDeleteRequest({
      targetModelUid: 'test-id'
    })).toBeUndefined();
  })
});
