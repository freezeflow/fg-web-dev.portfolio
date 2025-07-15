import { ref, onMounted, mergeProps, createVNode, resolveDynamicComponent, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderVNode, ssrInterpolate } from "vue/server-renderer";
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main = {
  __name: "info.cards",
  __ssrInlineRender: true,
  props: {
    title: {
      type: String
    },
    description: {
      type: String
    },
    icon: {
      type: [Object, Function]
    },
    colorClass: {
      type: String
    }
  },
  setup(__props) {
    const cardRef = ref(null);
    onMounted(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            cardRef.value.classList.add("card-fade-in");
            observer.disconnect();
          }
        },
        { threshold: 0.1 }
      );
      if (cardRef.value) observer.observe(cardRef.value);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({
        class: ["info-card", __props.colorClass],
        "aria-labelledby": "card-title",
        ref_key: "cardRef",
        ref: cardRef
      }, _attrs))} data-v-6e28408e>`);
      if (__props.icon) {
        ssrRenderVNode(_push, createVNode(resolveDynamicComponent(__props.icon), {
          class: "info-card-icon",
          "aria-hidden": "true"
        }, null), _parent);
      } else {
        _push(`<!---->`);
      }
      _push(`<h3 class="card-title" id="card-title" data-v-6e28408e>${ssrInterpolate(_ctx.$props.title)}</h3><p class="card-description" data-v-6e28408e>${ssrInterpolate(_ctx.$props.description)}</p></section>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/info.cards.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const InfoCards = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-6e28408e"]]);
export {
  InfoCards as I,
  _export_sfc as _
};
