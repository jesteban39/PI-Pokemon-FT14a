import { LandingPage } from "./components";
import { shallow } from "enzyme";

import "@testing-library/jest-dom";

describe("componente <LandingPage />", () => {
  let wrapper = shallow(<LandingPage />);
  beforeEach(() => {
    wrapper = shallow(<LandingPage />);
  });
  test("should show <LandingPage /> correctly ", () => {
    expect(wrapper).toMatchSnapshot();
  });
  test("should show a button element with the text To List Pokemons", () => {
    const wrapper = shallow(<LandingPage />);
    const counterText = wrapper.find("button").text().trim();
    expect(counterText).toBe("To List Pokemons");
  });
  test("should show a welcome paragraph", () => {
    const wrapper = shallow(<LandingPage />);
    const counterText = wrapper.find("p").text().trim();
    expect(/Welcome/i.test(counterText)).toBe.true;
  });
});
