import { mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { I as InfoCards } from "./info.cards-w4tPfDad.js";
import { LayoutTemplate, Rocket, Globe, Shield, FileCode, TrendingUp } from "lucide-vue-next";
const _sfc_main = {
  __name: "MoreInfo",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "more-info-container" }, _attrs))}><section class="more-info-content"><a href="/" aria-label="Back to home">←</a></section><section class="info-cards-container" id="more-info-cards" aria-labelledby="more-info-title">`);
      _push(ssrRenderComponent(InfoCards, {
        icon: unref(LayoutTemplate),
        "color-class": "purple",
        title: "Design That Makes Sense",
        description: "No clutter, no fluff. Just thoughtful, clean design built around your goals. Every element serves a purpose to guide user, express your brand, and help your product stand out without distractions."
      }, null, _parent));
      _push(ssrRenderComponent(InfoCards, {
        icon: unref(Rocket),
        "color-class": "blue",
        title: "Blazing Fast, Always Optimized",
        description: "We obsess over performance. From optimized assets to clean code, your site will load fast, feel smooth, and work like it should - even on slower networks. Because speed isn't just a feature, its trust."
      }, null, _parent));
      _push(ssrRenderComponent(InfoCards, {
        icon: unref(Globe),
        "color-class": "purple",
        title: "SEO Friendly",
        description: "We build websites with search engines in mind. Our SEO-friendly practices ensure that your site is easily discoverable, helping you reach a wider audience and achieve your business goals."
      }, null, _parent));
      _push(ssrRenderComponent(InfoCards, {
        icon: unref(Shield),
        "color-class": "blue",
        title: "Secure & Fututre-Proof",
        description: "We bake in security and scalibility from day one, so your website is safe, reliable and ready to grow with your vission."
      }, null, _parent));
      _push(ssrRenderComponent(InfoCards, {
        icon: unref(FileCode),
        "color-class": "purple",
        title: "Clean Code Philosophy",
        description: "Every line of code we write can be explained in one sentence. From front-end logic to database design, our approach keeps things simple, maintainable and scalable."
      }, null, _parent));
      _push(ssrRenderComponent(InfoCards, {
        icon: unref(TrendingUp),
        "color-class": "blue",
        title: "Ready To Grow With You",
        description: "Whether it's v1 or v10, we build with growth in mind. Our systems are modular, extendable, and built to evolve as your business scales - so you never have to start from scratch again."
      }, null, _parent));
      _push(`</section></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/MoreInfo.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
