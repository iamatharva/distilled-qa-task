class ElementService {
  public async multipleElementSearch(elementQuery: string, searchText: string, exactMatch = true): Promise<{ index?: number, list: (string | number)[] }> {
    let index: number | undefined;
    const list: (string | number)[] = [];
    const selector = await browser.$$(elementQuery);
    await Promise.all(selector.map(async (element, currentIndex) => {
      const elementText = await element.getText();
      list.push(elementText);
      if ((exactMatch && elementText === searchText) || (!exactMatch && elementText.includes(searchText))) {
        index = currentIndex;
      }
    }));
    return { index, list };
  }
}

export default new ElementService();
