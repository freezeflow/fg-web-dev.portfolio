import{h as y,i as k,c as g,o as d,e as v,f as w,b as h,g as C,t as p,n as b,q as n}from"./index-CwXKdKaw.js";const _=(e,t)=>{const s=e.__vccOpts||e;for(const[a,r]of t)s[a]=r;return s},x={class:"card-title",id:"card-title"},I={class:"card-description"},L={__name:"info.cards",props:{title:{type:String},description:{type:String},icon:{type:[Object,Function]},colorClass:{type:String}},setup(e){const t=y(null);return k(()=>{const s=new IntersectionObserver(([a])=>{a.isIntersecting&&(t.value.classList.add("card-fade-in"),s.disconnect())},{threshold:.1});t.value&&s.observe(t.value)}),(s,a)=>(d(),g("section",{class:b(["info-card",e.colorClass]),"aria-labelledby":"card-title",ref_key:"cardRef",ref:t},[e.icon?(d(),v(C(e.icon),{key:0,class:"info-card-icon","aria-hidden":"true"})):w("",!0),h("h3",x,p(s.$props.title),1),h("p",I,p(s.$props.description),1)],2))}},z=_(L,[["__scopeId","data-v-6e28408e"]]);/**
 * @license lucide-vue-next v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const u=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),B=e=>e.replace(/^([A-Z])|[\s-_]+(\w)/g,(t,s,a)=>a?a.toUpperCase():s.toLowerCase()),$=e=>{const t=B(e);return t.charAt(0).toUpperCase()+t.slice(1)},j=(...e)=>e.filter((t,s,a)=>!!t&&t.trim()!==""&&a.indexOf(t)===s).join(" ").trim();/**
 * @license lucide-vue-next v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var o={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"};/**
 * @license lucide-vue-next v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const A=({size:e,strokeWidth:t=2,absoluteStrokeWidth:s,color:a,iconNode:r,name:c,class:M,...f},{slots:l})=>n("svg",{...o,width:e||o.width,height:e||o.height,stroke:a||o.stroke,"stroke-width":s?Number(t)*24/Number(e):t,class:j("lucide",...c?[`lucide-${u($(c))}-icon`,`lucide-${u(c)}`]:["lucide-icon"]),...f},[...r.map(m=>n(...m)),...l.default?[l.default()]:[]]);/**
 * @license lucide-vue-next v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const i=(e,t)=>(s,{slots:a})=>n(A,{...s,iconNode:t,name:e},a);/**
 * @license lucide-vue-next v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const O=i("layout-template",[["rect",{width:"18",height:"7",x:"3",y:"3",rx:"1",key:"f1a2em"}],["rect",{width:"9",height:"7",x:"3",y:"14",rx:"1",key:"jqznyg"}],["rect",{width:"5",height:"7",x:"16",y:"14",rx:"1",key:"q5h2i8"}]]);/**
 * @license lucide-vue-next v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const R=i("rocket",[["path",{d:"M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z",key:"m3kijz"}],["path",{d:"m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z",key:"1fmvmk"}],["path",{d:"M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0",key:"1f8sc4"}],["path",{d:"M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5",key:"qeys4"}]]);/**
 * @license lucide-vue-next v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const S=i("trending-up",[["path",{d:"M16 7h6v6",key:"box55l"}],["path",{d:"m22 7-8.5 8.5-5-5L2 17",key:"1t1m79"}]]);export{z as I,O as L,R,S as T,_,i as c};
