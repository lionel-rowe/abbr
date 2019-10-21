import { shallowMount } from "@vue/test-utils";
import SearchBar from '@/components/search-bar.vue';

describe("SearchBar", () => {
  it("properly capitalises term on input", () => {
    // arrange
    const wrapper = shallowMount(SearchBar);
    const searchInput = wrapper.find('input[type=search]');

    // act
    (wrapper.vm as any).term = 'abc';

    searchInput.trigger('input');

    // assert
    expect((wrapper.vm as any).term).toBe('ABC');
  });
});
