import { render, screen } from "@testing-library/react";
import { LandingPage } from "./components";
import { configure, shallow, mount } from "enzyme";

import "@testing-library/jest-dom";

describe("componente <LandingPage />", () => {
  let wrapper = shallow(<LandingPage />);
  beforeEach(() => {
    wrapper = shallow(<LandingPage />);
  });
  test("debería mostrar <LandingPage /> correctamente ", () => {
    expect(wrapper).toMatchSnapshot();
  });
  test("debería mostrar un elemento button con el texto To List Pokemons", () => {
    const wrapper = shallow(<LandingPage />);
    const counterText = wrapper.find("button").text().trim();
    expect(counterText).toBe("To List Pokemons");
  });
  test("debería mostrar un parrafo de bienvenida", () => {
    const wrapper = shallow(<LandingPage />);
    const counterText = wrapper.find("p").text().trim();
    expect(/Welcome/i.test(counterText)).toBe.true
  });
});
