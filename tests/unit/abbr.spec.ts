import fetchMock from 'jest-fetch-mock';

import { SAFE_getAbbrsHtmlAsync } from '@/utils/abbr';
import * as getTextFromHtmlModule from '@/utils/get-text-from-html';

const getTextFromHtmlSpy = jest.spyOn(getTextFromHtmlModule, 'getTextFromHtml');

const jsonResponseWithHtml = JSON.stringify({"parse":{"title":"ABC","pageid":23784,"text":{"*":"<span class=\"form-of-definition use-with-mention\">Initialism of <span class=\"form-of-definition-link\"><i class=\"Latn mention\" lang=\"en\"><a href=\"/wiki/airway#English\" title=\"airway\">airway</a>, <a href=\"/wiki/breathing#English\" title=\"breathing\">breathing</a> and <a href=\"/wiki/circulation#English\" title=\"circulation\">circulation</a></i></span></span>: a <a href=\"/wiki/mnemonic\" title=\"mnemonic\">mnemonic</a> for the <a href=\"/wiki/systematic\" title=\"systematic\">systematic</a> approach to the immediate <a href=\"/wiki/treatment\" title=\"treatment\">treatment</a> of critically ill or injured <a href=\"/wiki/patient\" title=\"patient\">patients</a>."}}});

const textResult = 'Initialism of airway, breathing and circulation';

const abridgedResult = 'airway, breathing and circulation';

describe("SAFE_getAbbrsHtmlAsync", () => {
  it("abc", async done => {
    // arrange
    (fetchMock as any).mockResponseOnce(jsonResponseWithHtml);
    getTextFromHtmlSpy.mockReturnValueOnce(textResult);

    // act
    const result = await SAFE_getAbbrsHtmlAsync('ABC');

    // assert
    expect(result[0]).toContain(abridgedResult);

    done();
  });
});
