export const slideWheel = async (testID, xPosition) =>
  await element(by.id(testID)).longPressAndDrag(
    1000,
    0.1,
    0,
    element(by.id(testID)),
    xPosition,
    0,
  );
export const waitAndTap = async testID => {
  await waitFor(element(by.id(testID)))
    .toExist()
    .withTimeout(5000);
  await element(by.id(testID)).tap();
};

export const testArticleSection = async index_chipScroll => {
  await element(by.id('chip_scroll_section_' + index_chipScroll)).tap();
  if (index_chipScroll !== '2') {
    await element(by.id('articles_web_view')).swipe('up');
    await element(by.id('articles_web_view')).swipe('up');
    await element(by.id('articles_web_view')).tap();
    await element(by.id('go_back_articles')).tap();
  }
};
