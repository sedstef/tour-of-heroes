import { browser, by, element } from 'protractor';

// see https://www.toolsqa.com/protractor/protractor-browser-commands/
export class AppPage {

  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }
}
