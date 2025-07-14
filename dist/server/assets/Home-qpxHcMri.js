import { mergeProps, useSSRContext, unref, createVNode, resolveDynamicComponent, ref, onMounted, onUnmounted, onBeforeUnmount, watch, resolveDirective } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrRenderVNode, ssrGetDirectiveProps } from "vue/server-renderer";
import { _ as _export_sfc, I as InfoCards } from "./info.cards-w4tPfDad.js";
import { MonitorSmartphone, LayoutTemplate, Rocket, TrendingUp, UserRoundSearch, Palette, Code2, Mail, Phone, Facebook, Github } from "lucide-vue-next";
const _imports_0$1 = "/fg-web-dev.portfolio/FG-web-dev-img/Asset-2100-mobile.svg";
const _imports_1 = "/fg-web-dev.portfolio/FG-web-dev-img/Asset-2100.svg";
const _sfc_main$9 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "home-container" }, _attrs))}><section class="home-content"><h1 class="h1-white" id="hero"> FG WEB <span>DEVELOPMENT</span></h1><p class="lg-text-white" id="hero"> We build <span class="secondary-text">fast</span>, <span class="secondary-text">secure</span> and <span class="secondary-text">modern</span> websites guaranteed to get you results </p><a href="/projects" class="projectsBtn" aria-label="View our projects">Projects</a></section><section class="hero-img"><div class="image-container" id="hero-img"><picture><source${ssrRenderAttr("srcset", _imports_0$1)} media="(max-width: 1023px)"><img${ssrRenderAttr("src", _imports_1)} loading="eager" alt="Illustration representing FG Web Development"></picture></div></section></div>`);
}
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/Hero.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const Hero = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["ssrRender", _sfc_ssrRender]]);
const _sfc_main$8 = {
  __name: "WhyUs",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "why-us-container" }, _attrs))}><section class="why-us-content" aria-labelledby="why-us-title"><h2 class="h2-white" id="why-us-title">The qualities you can expect from our websites</h2></section><section class="info-cards-container" aria-label="Website Qualities">`);
      _push(ssrRenderComponent(InfoCards, {
        icon: unref(MonitorSmartphone),
        "color-class": "blue",
        title: "Built For Every Screen",
        description: "From mobile to desktop, your website will feel native on any device. We design and build interfaces that adapt smoothly ensuring your users get the same freate experience no matter where they're browsing from."
      }, null, _parent));
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
        icon: unref(TrendingUp),
        "color-class": "purple",
        title: "Ready To Grow With You",
        description: "Whether it's v1 or v10, we build with growth in mind. Our systems are modular, extendable, and built to evolve as your business scales - so you never have to start from scratch again."
      }, null, _parent));
      _push(`</section><section class="more-info"><a href="/more-info" aria-label="Learn more about our web development qualities">More info</a></section></div>`);
    };
  }
};
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/WhyUs.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const _sfc_main$7 = {
  __name: "process.info",
  __ssrInlineRender: true,
  props: {
    processes: {
      type: Array,
      default: () => []
    },
    activeIndex: {
      type: Number,
      default: 0
    }
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      ssrRenderList(props.processes, (process, index) => {
        _push(`<section class="${ssrRenderClass([{ "active": index === props.activeIndex }, "process-info-section"])}" data-v-6abb1c75><article class="process-info" aria-label="Process information for {{ process.title }}" data-v-6abb1c75><header class="process-info-header" data-v-6abb1c75><h3 data-v-6abb1c75>${ssrInterpolate(process.title)}</h3></header><p class="process-info-description" data-v-6abb1c75>${ssrInterpolate(process.description)}</p></article></section>`);
      });
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/process.info.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const processInfo = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["__scopeId", "data-v-6abb1c75"]]);
const _sfc_main$6 = {
  __name: "process.nav",
  __ssrInlineRender: true,
  props: {
    icons: {
      type: Array
    },
    activeIndex: {
      type: Number,
      default: 0
    }
  },
  emits: [
    "icon1",
    "icon2",
    "icon3",
    "icon4"
  ],
  setup(__props) {
    const props = __props;
    const [
      UserRoundSearch2,
      Palette2,
      Code22,
      Rocket2
    ] = [...props.icons];
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "process-nav",
        "aria-label": "Process navigation"
      }, _attrs))} data-v-3f65bd37><div class="${ssrRenderClass([{ active: props.activeIndex === 0 }, "icon-wrapper"])}" data-v-3f65bd37>`);
      if (props.icons.length) {
        ssrRenderVNode(_push, createVNode(resolveDynamicComponent(unref(UserRoundSearch2)), {
          class: "info-card-icon",
          "aria-hidden": "true",
          onClick: ($event) => _ctx.$emit("icon1")
        }, null), _parent);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><span data-v-3f65bd37></span><div class="${ssrRenderClass([{ active: props.activeIndex === 1 }, "icon-wrapper"])}" data-v-3f65bd37>`);
      if (props.icons.length) {
        ssrRenderVNode(_push, createVNode(resolveDynamicComponent(unref(Palette2)), {
          class: "info-card-icon",
          "aria-hidden": "true",
          onClick: ($event) => _ctx.$emit("icon2")
        }, null), _parent);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><span data-v-3f65bd37></span><div class="${ssrRenderClass([{ active: props.activeIndex === 2 }, "icon-wrapper"])}" data-v-3f65bd37>`);
      if (props.icons.length) {
        ssrRenderVNode(_push, createVNode(resolveDynamicComponent(unref(Code22)), {
          class: "info-card-icon",
          "aria-hidden": "true",
          onClick: ($event) => _ctx.$emit("icon3")
        }, null), _parent);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><span data-v-3f65bd37></span><div class="${ssrRenderClass([{ active: props.activeIndex === 3 }, "icon-wrapper"])}" data-v-3f65bd37>`);
      if (props.icons.length) {
        ssrRenderVNode(_push, createVNode(resolveDynamicComponent(unref(Rocket2)), {
          class: "info-card-icon",
          "aria-hidden": "true",
          onClick: ($event) => _ctx.$emit("icon4")
        }, null), _parent);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/process.nav.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const processNav = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["__scopeId", "data-v-3f65bd37"]]);
const _sfc_main$5 = {
  __name: "Process",
  __ssrInlineRender: true,
  setup(__props) {
    const processSteps = ref([
      {
        title: "We get to know you",
        description: "We begin with a discovery call or brief to understand your goals, audience, and product vision. The better we know you, the better we can build."
      },
      {
        title: "Crafting your digital identity",
        description: "From wireframes to full mockups, we create a visual language thats minimal, clear, and tailord to your brand. Feedback is part of the process."
      },
      {
        title: "Bringing design to life",
        description: "Using clean, scalable code, we build out the front and back end, ensuring everything performs smoothly accross devices and browsers."
      },
      {
        title: "Launch, monitor, and iterate",
        description: "We handle deployment, basic SEO, and site performance. Once live, we're here to adapt and improve as your business evolves."
      }
    ]);
    const icons = [
      UserRoundSearch,
      Palette,
      Code2,
      Rocket
    ];
    const activeIndex = ref(0);
    const isLocked = ref(false);
    const wrapperRef = ref(null);
    const isWrapperInView = ref(false);
    let observer;
    const handleProcessScroll = (e) => {
      if (!isWrapperInView.value) return;
      if (e.deltaY < 0 && activeIndex.value <= 0) return;
      if (e.deltaY > 0 && activeIndex.value >= 3) return;
      e.preventDefault();
      if (isLocked.value) return;
      const delta = e.deltaY;
      if (delta > 0 && activeIndex.value < 3) {
        activeIndex.value++;
        isLocked.value = true;
        setTimeout(() => {
          isLocked.value = false;
        }, 1e3);
      } else if (delta < 0 && activeIndex.value > 0) {
        activeIndex.value--;
        isLocked.value = true;
        setTimeout(() => {
          isLocked.value = false;
        }, 1e3);
      }
    };
    onMounted(() => {
      observer = new window.IntersectionObserver(
        ([entry]) => {
          isWrapperInView.value = entry.intersectionRatio >= 0.9;
        },
        { threshold: [0, 0.9, 1] }
      );
      if (wrapperRef.value) {
        observer.observe(wrapperRef.value);
      }
      window.addEventListener("wheel", handleProcessScroll, { passive: false });
    });
    onUnmounted(() => {
      if (observer && wrapperRef.value) observer.unobserve(wrapperRef.value);
      window.removeEventListener("wheel", handleProcessScroll);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><header><h2>Our process</h2><p>A collaborative, proven path from idea to launch</p></header><div class="process-wrapper" tabindex="0"><main class="process-container">`);
      _push(ssrRenderComponent(processInfo, {
        processes: processSteps.value,
        activeIndex: activeIndex.value
      }, null, _parent));
      _push(`</main><aside>`);
      _push(ssrRenderComponent(processNav, {
        icons,
        activeIndex: activeIndex.value,
        onIcon1: ($event) => activeIndex.value = 0,
        onIcon2: ($event) => activeIndex.value = 1,
        onIcon3: ($event) => activeIndex.value = 2,
        onIcon4: ($event) => activeIndex.value = 3
      }, null, _parent));
      _push(`</aside></div><!--]-->`);
    };
  }
};
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/Process.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const _sfc_main$4 = {
  __name: "featured-projects",
  __ssrInlineRender: true,
  props: {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    imageUrl: {
      type: String,
      required: true
    },
    link: {
      type: String,
      required: true
    },
    dateAdded: {
      type: String,
      required: true
    },
    summary: {
      type: String,
      required: true
    },
    tech: {
      type: Array,
      required: true
    }
  },
  emits: ["edit", "delete"],
  setup(__props, { emit: __emit }) {
    let isMoreInfoVisible = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "project-container" }, _attrs))} data-v-6b4dd66b>`);
      if (!unref(isMoreInfoVisible)) {
        _push(`<img${ssrRenderAttr("src", __props.imageUrl)} alt="Project image" data-v-6b4dd66b>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="${ssrRenderClass(["project-info", unref(isMoreInfoVisible) ? "more-info" : ""])}" data-v-6b4dd66b><div class="project-title" data-v-6b4dd66b>`);
      if (unref(isMoreInfoVisible)) {
        _push(`<button class="back" data-v-6b4dd66b>←</button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<p class="" data-v-6b4dd66b>${ssrInterpolate(__props.title)}</p></div>`);
      if (unref(isMoreInfoVisible)) {
        _push(`<div class="info" data-v-6b4dd66b><p class="desc" data-v-6b4dd66b>${ssrInterpolate(__props.description)}</p><div class="tech-container" data-v-6b4dd66b><p data-v-6b4dd66b>Tech used:</p><div class="tech-wrapper" data-v-6b4dd66b><!--[-->`);
        ssrRenderList(__props.tech, (tec) => {
          _push(`<p class="tech" data-v-6b4dd66b>${ssrInterpolate(tec)}</p>`);
        });
        _push(`<!--]--></div></div><div class="feedback-contianer" data-v-6b4dd66b><p data-v-6b4dd66b>Feedback:</p><div class="feedback-content" data-v-6b4dd66b><div class="feedback-wrapper" data-v-6b4dd66b><span class="client-image" data-v-6b4dd66b></span><p class="feedback" data-v-6b4dd66b>${ssrInterpolate(__props.summary)}</p></div></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (!unref(isMoreInfoVisible)) {
        _push(`<div class="summary" data-v-6b4dd66b><p data-v-6b4dd66b>${ssrInterpolate(__props.summary)}</p></div>`);
      } else {
        _push(`<!---->`);
      }
      if (!unref(isMoreInfoVisible)) {
        _push(`<div class="project-controls" data-v-6b4dd66b><button data-v-6b4dd66b>More info</button></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(isMoreInfoVisible)) {
        _push(`<p class="date" data-v-6b4dd66b><span data-v-6b4dd66b>Launch date:</span> ${ssrInterpolate(__props.dateAdded)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/featured-projects.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const featuredProjects = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-6b4dd66b"]]);
const _sfc_main$3 = {
  __name: "ProjectsView",
  __ssrInlineRender: true,
  setup(__props) {
    const projects = ref([
      {
        title: "TechHub.io",
        description: "TechHub.io is a cutting-edge platform that connects tech enthusiasts with the latest trends in technology. It features articles, tutorials, and community discussions.",
        imageUrl: "/src/assets/Desktop dashboard.jpg",
        link: "/projects/techhub",
        dateAdded: "2023-10-01",
        summary: "A platform for tech enthusiasts to explore the latest trends and technologies.",
        tech: ["Vue.js", "Node.js", "Tailwind CSS"]
      },
      {
        title: "Greenline.com",
        description: "Greenline.com is a project management tool designed to help teams collaborate effectively and track their progress in real-time. It offers features like task management, team collaboration, and progress tracking.",
        imageUrl: "something.jpg",
        link: "/projects/greenline",
        dateAdded: "2023-10-01",
        summary: "A project management tool for teams to collaborate and track progress.",
        tech: ["Vue.js", "Node.js", "Tailwind CSS"]
      }
    ]);
    const isEditing = ref(false);
    const isDeleting = ref(false);
    const projectRef = ref(null);
    let touchStartX = 0;
    let touchEndX = 0;
    function handleTouchStart(e) {
      touchStartX = e.changedTouches[0].screenX;
    }
    function handleTouchEnd(e) {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }
    function handleSwipe() {
      const minSwipeDistance = 50;
      if (touchEndX < touchStartX - minSwipeDistance) {
        nextProject();
      } else if (touchEndX > touchStartX + minSwipeDistance) {
        prevProject();
      }
    }
    onMounted(() => {
      if (projectRef.value && projectRef.value.$el) {
        const el = projectRef.value.$el;
        el.addEventListener("touchstart", handleTouchStart);
        el.addEventListener("touchend", handleTouchEnd);
        el.addEventListener("wheel", handleWheel);
      } else if (projectRef.value && projectRef.value instanceof HTMLElement) {
        projectRef.value.addEventListener("touchstart", handleTouchStart);
        projectRef.value.addEventListener("touchend", handleTouchEnd);
        projectRef.value.addEventListener("wheel", handleWheel);
      }
    });
    onBeforeUnmount(() => {
      if (projectRef.value && projectRef.value.$el) {
        const el = projectRef.value.$el;
        el.removeEventListener("touchstart", handleTouchStart);
        el.removeEventListener("touchend", handleTouchEnd);
        el.removeEventListener("wheel", handleWheel);
      } else if (projectRef.value && projectRef.value instanceof HTMLElement) {
        projectRef.value.removeEventListener("touchstart", handleTouchStart);
        projectRef.value.removeEventListener("touchend", handleTouchEnd);
        projectRef.value.removeEventListener("wheel", handleWheel);
      }
    });
    function handleWheel(e) {
      e.preventDefault();
      if (e.deltaX > 0) {
        nextProject();
      } else {
        prevProject();
      }
    }
    const currentProjectIndex = ref(0);
    const nextProject = () => {
      currentProjectIndex.value = (currentProjectIndex.value + 1) % projects.value.length;
    };
    const prevProject = () => {
      currentProjectIndex.value = (currentProjectIndex.value - 1 + projects.value.length) % projects.value.length;
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "projects-view" }, _attrs))}><h1 class="h2-white">Some of our best projects</h1><div class="projects-container"><button class="carousel-controls" aria-label="Previous">←</button><div>`);
      if (projects.value.length) {
        _push(ssrRenderComponent(featuredProjects, {
          ref_key: "projectRef",
          ref: projectRef,
          title: projects.value[currentProjectIndex.value].title,
          description: projects.value[currentProjectIndex.value].description,
          imageUrl: projects.value[currentProjectIndex.value].imageUrl,
          link: projects.value[currentProjectIndex.value].link,
          dateAdded: projects.value[currentProjectIndex.value].dateAdded,
          summary: projects.value[currentProjectIndex.value].summary,
          tech: projects.value[currentProjectIndex.value].tech,
          onEdit: ($event) => isEditing.value = true,
          onDelete: ($event) => isDeleting.value = true
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (!projects.value.length) {
        _push(`<p>No projects available. Please add some projects.</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><button class="carousel-controls" aria-label="Next">→</button></div><div class="project-indicators"><!--[-->`);
      ssrRenderList(projects.value, (project, index) => {
        _push(`<span class="${ssrRenderClass({ active: currentProjectIndex.value === index })}"></span>`);
      });
      _push(`<!--]--></div></div>`);
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/ProjectsView.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = {
  __name: "Footer",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<footer${ssrRenderAttrs(mergeProps({ class: "footer" }, _attrs))}><div class="footer-header"><h2>Your thoughts, our inbox, lets talk</h2></div><div class="footer-content"><h3>Contact us at:</h3><div><div>`);
      _push(ssrRenderComponent(unref(Mail), { class: "contact-icons" }, null, _parent));
      _push(` <a href="mailto:gfloriaan616@gmail.com">gfloriaan616@gmail.com</a></div><div>`);
      _push(ssrRenderComponent(unref(Phone), { class: "contact-icons" }, null, _parent));
      _push(` <a href="tel:+264 81 737 6386">+264 81 737 6386</a></div></div><div class="socials"><a>`);
      _push(ssrRenderComponent(unref(Facebook), { class: "social-icons" }, null, _parent));
      _push(`</a><a>`);
      _push(ssrRenderComponent(unref(Github), { class: "social-icons" }, null, _parent));
      _push(`</a></div></div><p class="copy">© 2025 FG Web Development. All rights reserved.</p></footer>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/Footer.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _imports_0 = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20id='Layer_2'%20data-name='Layer%202'%20viewBox='0%200%20150.51%20112.54'%3e%3cdefs%3e%3clinearGradient%20id='linear-gradient'%20x1='53.27'%20x2='93.27'%20y1='10935.02'%20y2='10935.02'%20gradientTransform='matrix(1%200%200%20-1%200%2010979.37)'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20offset='0'%20stop-color='%2329abe2'/%3e%3cstop%20offset='1'%20stop-color='%232e3192'/%3e%3c/linearGradient%3e%3clinearGradient%20xlink:href='%23linear-gradient'%20id='linear-gradient-2'%20x1='33.3'%20x2='91.3'%20y1='10908.88'%20y2='10908.88'/%3e%3clinearGradient%20xlink:href='%23linear-gradient'%20id='linear-gradient-3'%20x1='17.61'%20x2='150.51'%20y1='10931.64'%20y2='10931.64'/%3e%3cstyle%3e.cls-6{fill:%2329abe2}%3c/style%3e%3c/defs%3e%3cg%20id='Layer_1-2'%20data-name='Layer%201'%3e%3cpath%20d='M56.12%2087v-.01'%20style='fill:none;stroke:%23ed1c24;stroke-miterlimit:10'/%3e%3ccircle%20cx='25.3'%20cy='83.99'%20r='5.09'%20style='fill:%230071bc'/%3e%3cpath%20d='M93.27%2058.35a8%208%200%200%201-8%208c-3.72%200-6-1-8-4l-9%204.68v.32c-1%203-3.21%205-6.5%205a6.5%206.5%200%201%201%205.44-10.06l10.06-3.94a8%208%200%200%201%202.56-5.87L65.08%2031.39a8%208%200%201%201%203.48-3.76l15.21%2022.18.5.54h1a8%208%200%200%201%208%208Z'%20style='fill:url(%23linear-gradient)'/%3e%3ccircle%20cx='34.3'%20cy='29.99'%20r='6.5'%20class='cls-6'/%3e%3cellipse%20cx='25.42'%20cy='56.03'%20class='cls-6'%20rx='7.03'%20ry='7.15'%20transform='rotate(-75.93%2025.43%2056.03)'/%3e%3cellipse%20cx='5.81'%20cy='39.99'%20class='cls-6'%20rx='4.97'%20ry='4.61'%20transform='rotate(-75.93%205.8%2040)'/%3e%3cellipse%20cx='5.71'%20cy='68.84'%20class='cls-6'%20rx='5.82'%20ry='5.7'%20transform='rotate(-75.93%205.7%2068.84)'/%3e%3cellipse%20cx='27.16'%20cy='106.59'%20class='cls-6'%20rx='5.94'%20ry='6.06'%20transform='rotate(-75.93%2027.16%20106.6)'/%3e%3cpath%20d='M91.3%2081.99a6%206%200%200%201-11.89%201.15l-.11%201.22H68.03a6.5%206.5%200%200%201-6.23%204.63l-4.5%208c.89.97%201%202.08%201%203.5a5.5%205.5%200%201%201-5.5-5.5L57.12%2087a6.45%206.45%200%200%201-1.82-4.51l-10.65-6.02a7%207%200%201%201-4.35-12.48l5.09-11.22a9.43%209.43%200%200%201-5.09-8.28c0-5.25%204.48-9.5%2010-9.5s10%204.25%2010%209.5-4.48%209.5-10%209.5l-5.46%2011.68a6.95%206.95%200%200%201%202.46%205.32v2.18l9.81%204.82a6.5%206.5%200%200%201%2010.61%201.82h11.99a6.01%206.01%200%200%201%2011.59%202.18Z'%20style='fill:url(%23linear-gradient-2)'/%3e%3cpath%20d='M128.18%2035.26v-.6C128.18%2015.52%20113.64%200%2095.7%200%2083.17%200%2072.3%207.57%2066.88%2018.66a7.96%207.96%200%200%201%201.67%208.97l15.21%2022.18.5.54h1a8%208%200%201%201%200%2016c-3.72%200-6-1-8-4l-9%204.68v.32c-1%203-3.21%205-6.5%205a6.5%206.5%200%201%201%205.44-10.06l10.06-3.94a8%208%200%200%201%202.56-5.87L65.07%2031.39a8%208%200%200%201-11.81-7.04v-.25c-4.93.1-9.44%201.99-13%205.08l.02.31a6.5%206.5%200%200%201-5.23%206.37%2023.78%2023.78%200%200%200-2.55%2012.38%2022.01%2022.01%200%200%200-3.46%201.75%207.05%207.05%200%200%201%203.3%207.76%207.1%207.1%200%200%201-8.65%205.08%207.23%207.23%200%200%201-3.79-2.38%2025.55%2025.55%200%200%200-2.3%2010.64c0%204.2%201%208.15%202.75%2011.6A5.09%205.09%200%201%201%2025%2089.05a22.03%2022.03%200%200%200%2015.45%206.42h10.04c.7-.32%201.47-.5%202.28-.5l4.32-7.99a6.45%206.45%200%200%201-1.82-4.51l-10.65-6.02a7%207%200%201%201-4.35-12.48l5.09-11.22a9.43%209.43%200%200%201-5.09-8.28c0-5.25%204.48-9.5%2010-9.5s10%204.25%2010%209.5-4.48%209.5-10%209.5l-5.46%2011.68a6.95%206.95%200%200%201%202.46%205.32v2.18l9.81%204.82a6.5%206.5%200%200%201%2010.61%201.82h11.99a6.01%206.01%200%200%201%2011.59%202.18%206%206%200%200%201-11.89%201.15l-.11%201.22H68a6.5%206.5%200%200%201-6.23%204.63l-3.66%206.5h63.83c15.78%200%2028.56-13.65%2028.56-30.48%200-14.56-9.57-26.73-22.36-29.76l.03.03Z'%20style='fill:url(%23linear-gradient-3)'/%3e%3c/g%3e%3c/svg%3e";
const _sfc_main$1 = {
  __name: "navbar",
  __ssrInlineRender: true,
  props: {
    isNavVisible: {
      type: Boolean,
      default: false
    },
    activeSection: {
      type: String,
      default: ""
    },
    hero: {
      type: String
    },
    whyUs: {
      type: String
    },
    projects: {
      type: String
    },
    process: {
      type: String
    },
    contact: {
      type: String
    }
  },
  setup(__props) {
    const isMenuOpen = ref(false);
    const showLinks = ref(false);
    const props = __props;
    watch(isMenuOpen, (val) => {
      if (val) {
        setTimeout(() => {
          showLinks.value = true;
        }, 300);
      } else {
        showLinks.value = false;
      }
    });
    watch(props.isNavVisible, (newValue) => {
      if (!newValue) {
        isMenuOpen.value = false;
      }
    });
    document.addEventListener("scroll", () => {
      if (isMenuOpen.value) {
        isMenuOpen.value = false;
      }
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && isMenuOpen.value) {
        isMenuOpen.value = false;
      }
    });
    document.addEventListener("click", (event) => {
      const navbar2 = document.querySelector(".navbar");
      if (navbar2 && !navbar2.contains(event.target) && isMenuOpen.value) {
        isMenuOpen.value = false;
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<nav${ssrRenderAttrs(mergeProps({
        class: ["navbar", [{ "navOpen": isMenuOpen.value }, __props.isNavVisible ? "showNav" : "hideNav"]]
      }, _attrs))} data-v-6d3129d3><div class="navbar-header" data-v-6d3129d3><div class="logo" data-v-6d3129d3><img${ssrRenderAttr("src", _imports_0)} alt="Logo" data-v-6d3129d3><p class="logo-name" data-v-6d3129d3>FG WEB DEVELOPMENT</p></div><div class="${ssrRenderClass([{ "cross": isMenuOpen.value }, "hamburger-container"])}" aria-label="Toggle navigation menu" data-v-6d3129d3><span class="lOne" data-v-6d3129d3></span><span class="lTwo" data-v-6d3129d3></span><span class="lThree" data-v-6d3129d3></span></div></div><ul class="${ssrRenderClass([{ "open": showLinks.value }, "nav-links"])}" data-v-6d3129d3><li data-v-6d3129d3><a${ssrRenderAttr("href", `#${props.hero}`)} class="${ssrRenderClass({ active: props.activeSection === props.hero })}" data-v-6d3129d3>Home</a></li><li data-v-6d3129d3><a${ssrRenderAttr("href", `#${props.whyUs}`)} class="${ssrRenderClass({ active: props.activeSection === props.whyUs })}" data-v-6d3129d3>What To Expect From Us</a></li><li data-v-6d3129d3><a${ssrRenderAttr("href", `#${props.projects}`)} class="${ssrRenderClass({ active: props.activeSection === props.projects })}" data-v-6d3129d3>Projects</a></li><li data-v-6d3129d3><a${ssrRenderAttr("href", `#${props.process}`)} class="${ssrRenderClass({ active: props.activeSection === props.process })}" data-v-6d3129d3>Our Process</a></li><li data-v-6d3129d3><a${ssrRenderAttr("href", `#${props.contact}`)} class="${ssrRenderClass({ active: props.activeSection === props.contact })}" data-v-6d3129d3>Contact Us</a></li></ul></nav>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/navbar.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const navbar = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-6d3129d3"]]);
const _sfc_main = {
  __name: "Home",
  __ssrInlineRender: true,
  setup(__props) {
    const isNavVisible = ref(false);
    const activeSection = ref("hero");
    const handleScroll = () => {
      isNavVisible.value = window.scrollY > 0;
    };
    let observer;
    onMounted(() => {
      window.addEventListener("scroll", handleScroll);
      const sections = [
        document.getElementById("hero"),
        document.getElementById("whyUs"),
        document.getElementById("projects"),
        document.getElementById("process"),
        document.getElementById("contact")
      ];
      observer = new window.IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              activeSection.value = entry.target.id;
            }
          });
        },
        { threshold: 0.2 }
      );
      sections.forEach((section) => {
        if (section) observer.observe(section);
      });
    });
    onUnmounted(() => {
      window.removeEventListener("scroll", handleScroll);
      if (observer) observer.disconnect();
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _directive_fade_in = resolveDirective("fade-in");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(navbar, {
        class: "navbar",
        isNavVisible: isNavVisible.value,
        activeSection: activeSection.value,
        hero: "hero",
        "why-us": "whyUs",
        projects: "projects",
        process: "process",
        contact: "contact"
      }, null, _parent));
      _push(`<main class="home"><section${ssrRenderAttrs(mergeProps({
        class: "home-section",
        "aria-label": "Hero section",
        id: "hero"
      }, ssrGetDirectiveProps(_ctx, _directive_fade_in)))}>`);
      _push(ssrRenderComponent(Hero, { class: "hero" }, null, _parent));
      _push(`</section><section${ssrRenderAttrs(mergeProps({
        class: "why-us-section",
        "aria-label": "Why Choose FG Web Development",
        id: "whyUs"
      }, ssrGetDirectiveProps(_ctx, _directive_fade_in)))}>`);
      _push(ssrRenderComponent(_sfc_main$8, null, null, _parent));
      _push(`</section><section${ssrRenderAttrs(mergeProps({
        class: "projects-section",
        "aria-label": "Featured projects",
        id: "projects"
      }, ssrGetDirectiveProps(_ctx, _directive_fade_in)))}>`);
      _push(ssrRenderComponent(_sfc_main$3, null, null, _parent));
      _push(`</section><section${ssrRenderAttrs(mergeProps({
        class: "process-section",
        "aria-label": "Our process",
        id: "process"
      }, ssrGetDirectiveProps(_ctx, _directive_fade_in)))}>`);
      _push(ssrRenderComponent(_sfc_main$5, null, null, _parent));
      _push(`</section><section class="footer-section" aria-label="Footer" id="contact">`);
      _push(ssrRenderComponent(_sfc_main$2, null, null, _parent));
      _push(`</section></main><!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/Home.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
