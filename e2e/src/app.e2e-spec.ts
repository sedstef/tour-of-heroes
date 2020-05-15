import { AppPage } from './app.po';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(trim(page.getParagraphText())).toEqual('Welcome to angular-tour-of-heroes!');
  });
});

function trim(toTrim) {
  return toTrim.then(function(val) {
      return val.trim();
  });
}
