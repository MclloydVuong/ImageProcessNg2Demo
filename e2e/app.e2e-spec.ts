import { ImageProcessPage } from './app.po';

describe('image-process App', function() {
  let page: ImageProcessPage;

  beforeEach(() => {
    page = new ImageProcessPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
