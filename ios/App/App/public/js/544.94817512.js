"use strict";(self["webpackChunktainacan_mobile"]=self["webpackChunktainacan_mobile"]||[]).push([[544],{8544:function(e,t,o){o.r(t),o.d(t,{startFocusVisible:function(){return c}});
/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
const n="ion-focused",s="ion-focusable",r=["Tab","ArrowDown","Space","Escape"," ","Shift","Enter","ArrowLeft","ArrowRight","ArrowUp","Home","End"],c=e=>{let t=[],o=!0;const c=e?e.shadowRoot:document,i=e||document.body,a=e=>{t.forEach((e=>e.classList.remove(n))),e.forEach((e=>e.classList.add(n))),t=e},d=()=>{o=!1,a([])},u=e=>{o=r.includes(e.key),o||a([])},v=e=>{if(o&&e.composedPath){const t=e.composedPath().filter((e=>!!e.classList&&e.classList.contains(s)));a(t)}},f=()=>{c.activeElement===i&&a([])};c.addEventListener("keydown",u),c.addEventListener("focusin",v),c.addEventListener("focusout",f),c.addEventListener("touchstart",d),c.addEventListener("mousedown",d);const m=()=>{c.removeEventListener("keydown",u),c.removeEventListener("focusin",v),c.removeEventListener("focusout",f),c.removeEventListener("touchstart",d),c.removeEventListener("mousedown",d)};return{destroy:m,setFocus:a}}}}]);
//# sourceMappingURL=544.94817512.js.map