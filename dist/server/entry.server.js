import { unref, useSSRContext, createApp as createApp$1, createSSRApp } from "vue";
import { createPinia } from "pinia";
import { createRouter as createRouter$1, createMemoryHistory, RouterView } from "vue-router";
import { ssrRenderComponent } from "vue/server-renderer";
const vFadeIn = {
  mounted(el) {
    el.classList.add("fade-in");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          observer.unobserve(el);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
  }
};
function createRouter() {
  return createRouter$1({
    history: createMemoryHistory(),
    routes: [
      {
        path: "/",
        name: "home",
        component: () => import("./assets/Home-qpxHcMri.js")
      },
      {
        path: "/more-info",
        name: "more-info",
        component: () => import("./assets/MoreInfo-optYttE1.js")
      }
    ]
  });
}
const _sfc_main = {
  __name: "App",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(RouterView), _attrs, null, _parent));
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/App.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const app = createApp$1(_sfc_main);
const router = createRouter();
app.use(createPinia());
app.use(router);
app.directive("fade-in", vFadeIn);
router.isReady().then(() => {
  app.mount("#app");
});
function createApp(url = "/") {
  const app2 = createSSRApp(_sfc_main);
  const router2 = createRouter();
  app2.use(createPinia());
  app2.directive("fade-in", vFadeIn);
  app2.use(router2);
  return { app: app2, router: router2 };
}
async function render(url) {
  const { app: app2, router: router2 } = createApp();
  router2.push(url);
  await router2.isReady();
  return app2;
}
export {
  render as default
};
