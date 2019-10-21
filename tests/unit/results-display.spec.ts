import { shallowMount } from "@vue/test-utils";
import ResultsDisplay from '@/components/results-display.vue';

describe("ResultsDisplay", () => {
  it("initially displays blank", () => {
    // arrange & act
    const wrapper = shallowMount(ResultsDisplay);

    // assert
    expect(wrapper.text().trim()).toBeFalsy();
  });

  it("while loading displays loading msg", () => {
    // arrange
    const wrapper = shallowMount(ResultsDisplay);

    // act
    wrapper.setProps({
      SAFE_abbrsHtmlPromise: Promise.resolve([])
    });

    // assert
    expect(wrapper.text()).toContain('LOADING');
  });

  it("on error displays error msg", done => {
    // arrange
    const wrapper = shallowMount(ResultsDisplay);

    // act
    wrapper.setProps({
      SAFE_abbrsHtmlPromise: Promise.reject('promise failed')
    });

    // assert
    setTimeout(() => {
      expect(wrapper.text()).toContain('ERROR');
      done();
    }, 0);
  });

  it("no results displays no results message", done => {
    // arrange
    const wrapper = shallowMount(ResultsDisplay);

    // act
    wrapper.setProps({
      SAFE_abbrsHtmlPromise: Promise.resolve([])
    });

    // assert
    setTimeout(() => {
      expect(wrapper.text()).toContain('NO RESULTS');
      done();
    }, 0);
  });

  it("with results displays result html as text", done => {
    // arrange
    const wrapper = shallowMount(ResultsDisplay);

    // act
    wrapper.setProps({
      SAFE_abbrsHtmlPromise: Promise.resolve([
        { SAFE_html: '<div>abc</div>' }
      ])
    });

    // assert
    setTimeout(() => {
      expect(wrapper.text()).toContain('<div>abc</div>');
      done();
    }, 0);
  });
});
