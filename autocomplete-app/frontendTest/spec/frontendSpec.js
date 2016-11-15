/* global describe, it, expect, beforeEach, afterEach, jasmine, getData */
describe('testing the testing environment', () => {
  it('tests that the test are working', () => {
    const hello = 'hello';
    const again = 'again';
    expect(hello).not.toEqual(again);
  });
});

describe('testing that getData', () => {
  beforeEach(() => {
    jasmine.Ajax.install();
  });

  afterEach(() => {
    jasmine.Ajax.uninstall();
  });

  it('returns a response', () => {
    const onDone = jasmine.createSpy('success');
    getData({ value: 'abc' }, onDone)();

    const request = jasmine.Ajax.requests.mostRecent();
    request.respondWith({
      status: 200,
      contentType: 'text/plain',
      responseText: 'aab\naac\naad',
    });

    expect(onDone).toHaveBeenCalled();
    expect(onDone).toHaveBeenCalledWith(['aab', 'aac', 'aad']);
  });

  it('sends a url', () => {
    const onDone = jasmine.createSpy('success');
    getData({ value: 'abc' }, onDone)();

    expect(jasmine.Ajax.requests.mostRecent().url).toBe(`/api/words?match=abc`);
  });
});
