"use strict";(self["webpackChunktainacan_mobile"]=self["webpackChunktainacan_mobile"]||[]).push([[990],{8990:function(t,e,n){n.r(e),n.d(e,{createSwipeBackGesture:function(){return c}});var r=n(6587),a=n(545),i=n(6515);
/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
const c=(t,e,n,c,o)=>{const s=t.ownerDocument.defaultView,u=(0,a.i)(t),l=t=>{const e=50,{startX:n}=t;return u?n>=s.innerWidth-e:n<=e},h=t=>u?-t.deltaX:t.deltaX,d=t=>u?-t.velocityX:t.velocityX,b=t=>l(t)&&e(),f=t=>{const e=h(t),n=e/s.innerWidth;c(n)},k=t=>{const e=h(t),n=s.innerWidth,a=e/n,i=d(t),c=n/2,u=i>=0&&(i>.2||e>c),l=u?1-a:a,b=l*n;let f=0;if(b>5){const t=b/Math.abs(i);f=Math.min(t,540)}o(u,a<=0?.01:(0,r.j)(0,a,.9999),f)};return(0,i.createGesture)({el:t,gestureName:"goback-swipe",gesturePriority:40,threshold:10,canStart:b,onStart:n,onMove:f,onEnd:k})}}}]);
//# sourceMappingURL=990.cdf4956e.js.map