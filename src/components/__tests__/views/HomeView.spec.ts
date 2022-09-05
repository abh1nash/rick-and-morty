import {
  describe,
  it,
  expect,
  vi,
  beforeAll,
  afterAll,
  afterEach,
} from "vitest";
import { flushPromises, mount } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";
import HomeView from "@/views/HomeView.vue";
import { server } from "../mocks/server";
import { nextTick } from "vue";
import { useCharacterStore } from "@/stores/character";
import { fetch } from "cross-fetch";
import router from "@/router";

global.fetch = fetch;

describe("Main page", () => {
  beforeAll(() => server.listen({ onUnhandledRequest: "warn" }));
  afterAll(() => server.close());
  afterEach(() => server.resetHandlers());

  const wrapper = mount(HomeView, {
    global: {
      plugins: [createTestingPinia({ createSpy: vi.fn, stubActions: false })],
    },
  });

  it("has placeholder displayed on load", () => {
    expect(wrapper.text()).toContain("Nobody exists on purpose.");
  });

  it("loads character data if valid ID is supplied", async () => {
    const characterStore = useCharacterStore();

    // valid ID in mock data
    wrapper.setProps({ characterId: "1" });
    await nextTick();
    expect(characterStore.fetchData).toHaveBeenCalledOnce();
    expect(characterStore.fetchData).toHaveBeenCalledWith(1);
    await flushPromises();
    expect(characterStore.isLoading).toBeFalsy();
    expect(wrapper.html()).toContain("Rick Sanchez");
    expect(wrapper.html()).toContain("Episode #3");
  });

  it("redirects to placeholder page if invalid ID supplied", async () => {
    const push = vi.spyOn(router, "push");
    expect(push.getMockName()).toBe("push");

    wrapper.setProps({ characterId: "123456789" });
    await flushPromises();
    expect(push).toHaveBeenCalledOnce();
    expect(push).toHaveBeenCalledWith({ name: "home" });
  });
});
