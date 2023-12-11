import { HomePageSelector } from '../selectors/home.selector'
import ElementService  from '../../service/elementService'

const homePageSelector = HomePageSelector()

class HomePage {

  public get searchInputBox(): Promise<WebdriverIO.Element> {
    return $(homePageSelector.searchInputBox)
  }

  public async open(path: string): Promise<void> {
    await browser.navigateTo(path)
    await browser.waitUntil(async() => {
      const url = await browser.getUrl()
      return !!url.includes(path)
    })
  }

  public async selectValueFromDropDown(city: string): Promise<WebdriverIO.Element> {
    const selector = homePageSelector.searchItems;
    const result = await ElementService.multipleElementSearch(selector, city, false) as { index?: number, list: number[] };
    const index = result.index;
    const element = await browser.$$(selector);
    return element[index];
  }

  public async invokeSearchItem(city: string): Promise<void> {
    await browser.waitUntil(async () => (await this.searchInputBox).isDisplayed());
    await (await this.searchInputBox).doubleClick();
    await browser.waitUntil(async () => (await this.selectValueFromDropDown(city)).isDisplayed());
    await (await this.selectValueFromDropDown(city)).click();
  } 
}
export default new HomePage()