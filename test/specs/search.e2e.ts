import HomePage from '../pageObejct/page/home.page'
import SearchResult from '../pageObejct/page/searchResult.page'
import { envVariable } from '../../env'

const env = envVariable()
const city = 'Dublin', filterKeyword = 'garage'

describe('User is viewing sell advert', function () {
  beforeEach(async () => {
    await HomePage.open(env.URL_UNDER_TEST);
  });
  
  it(`Verify the sell advert details of ${city} with filter keyword ${filterKeyword} is displayed correctly`, async () => {
    await HomePage.invokeSearchItem(city);
    await SearchResult.verifyEachResult(city);
    const dublinResults = await SearchResult.verifyEachResult(city);
    expect(dublinResults).toBeTruthy();

    const filterValue = await SearchResult.applyFilterWithKeyword(filterKeyword, 'value');
    expect(filterValue).toEqual(filterKeyword);

    await SearchResult.openAnyResult();
    const descriptionKeywordVerified = await SearchResult.verifyDescriptionKeyword(filterKeyword);
    expect(descriptionKeywordVerified).toBeTruthy();
  })
})