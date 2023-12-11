import { SearachResultSelector } from '../selectors/searchResult.selector'
import ElementService  from '../../service/elementService'

const SearachPageSelector = SearachResultSelector()

class searchResult {
  
  public get searchResult(): Promise<WebdriverIO.Element> {
    return $(SearachPageSelector.searchResult)
  }

  public get filterButton(): Promise<WebdriverIO.Element> {
    return $(SearachPageSelector.filterButton)
  }

  public get keywordSearch(): Promise<WebdriverIO.Element> {
    return $(SearachPageSelector.keywordSearch)
  }

  public get filterModelShowResult(): Promise<WebdriverIO.Element>{
    return $(SearachPageSelector.filterModelShowResultButton)
  }

  public get resultCardBody(): Promise<WebdriverIO.Element>{
    return $(SearachPageSelector.resultCardBody)
  }

  public get getDescription(): Promise<WebdriverIO.Element>{
    return $(SearachPageSelector.propertyDescription)
  }

  public get closeFilter(): Promise<WebdriverIO.Element>{
    return $(SearachPageSelector.closeFilter)
  }

  public async addressSearch(city: string): Promise<string[]> {
    const selector = SearachPageSelector.addressSearchResult;
    const value = await ElementService.multipleElementSearch(selector, city) as { index?: number, list: string[] };
    return value.list;
  }
  
  public async verifyEachResult(city: string): Promise<boolean> {
    await browser.waitUntil(async () => {
      const searchResult = await this.searchResult;
      return await searchResult.isDisplayed();
    });
    const addressSearchList = await this.addressSearch(city);
    if (!addressSearchList.every(item => item.includes(city))) {
      throw new Error(`City '${city}' not found in every address in the list.`);
    }
    return true;
  }

  public async applyFilterWithKeyword(keyword: string, attribute: string): Promise<string> {
    await (await this.filterButton).click();
    await (await this.keywordSearch).setValue(keyword);
    await (await this.filterModelShowResult).click();
    await browser.waitUntil(async () => (await browser.getUrl()).includes(keyword));
    await (await this.filterButton).click();
    const attributeValue = await (await this.keywordSearch).getAttribute(attribute);
    await (await this.closeFilter).click();
    return attributeValue;
  }

  public async openAnyResult(): Promise<void> {
    await browser.waitUntil(async () => (await this.resultCardBody).isDisplayed());
    const resultCardBodyElement = await this.resultCardBody;
    await resultCardBodyElement.scrollIntoView();
    await resultCardBodyElement.click();
  }

  public async verifyDescriptionKeyword(keyword: string): Promise<boolean> {
    await browser.waitUntil(async () => (await this.getDescription).isDisplayed());
    const descriptionText = await (await this.getDescription).getText();
    return descriptionText.toLowerCase().includes(keyword);
  }
}
export default new searchResult()