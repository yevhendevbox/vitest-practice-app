import { mount, RouterLinkStub } from "@vue/test-utils";
import { describe, expect, test  } from "vitest";

import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: HomeView
    }
  ]
})

import App from "@/App.vue";

describe("App.vue", () => {
  const wrapper = mount(App, {
    global: {
      stubs: {
        RouterLink: RouterLinkStub,
    },
    plugins: [router],
  }});

  test('should render', () => {
    expect(wrapper.exists()).toBeTruthy();
  })
})