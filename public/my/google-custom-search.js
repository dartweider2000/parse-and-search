(()=>{"use strict";const e=()=>location.href.includes("/search")||location.href.includes("/images")||location.href.includes("/video"),t=()=>{const e=location.hash.match(/gsc\.q=[\d\D]*?(&|\s)/gi)?.[0],t=location.hash.match(/gsc\.tab=[\d\D]*?(&|\s)/gi)?.[0],s=location.hash.match(/gsc\.page=[\d\D]*?(&|\s)/gi)?.[0];return{q:e?e.slice(6):"",tab:t?t.slice(8):0,page:s?s.slice(9):1}},s=e=>{localStorage.setItem("query",JSON.stringify(e))};document.addEventListener("DOMContentLoaded",(async c=>{const o=async(e=0,t=null,s=1)=>new Promise(((c,o)=>{let n=0;const a=setInterval((()=>{(1==s&&google||2==s&&document.querySelector(t))&&(clearInterval(a),c()),e>=2e4&&o(),n+=e}),e)}));e()&&document.body.classList.add("_search"),await o(),(()=>{const c=document.querySelector(".gsc-input-box");let o;document.querySelector(".search-form_withoutButton__ZeHVz")||(o=document.querySelector(".gsc-search-button-v2")),document.querySelector(".gsc-search-box").remove(),o&&(o.innerHTML=document.querySelector(".search-form_button__Unuvh").textContent),document.addEventListener("click",(e=>{const t=e.target;c.classList.contains("_focus")&&!t.closest(".search-form_wrapper__ogg9T")?c.classList.remove("_focus"):t.closest(".search-form_wrapper__ogg9T")&&c.classList.add("_focus")})),document.querySelector("#query").replaceWith(c),e()&&document.querySelector(".search-form_button__Unuvh").replaceWith(o);const n=document.querySelector(".gsc-input-box input"),a=()=>n.value.trim(),r=()=>{const e=a(),{q:s,tab:c,page:o}=t();if(console.log(e),e||s)return{q:e||s,tab:c,page:o}};if(e()){const e=()=>{const{q:e,tab:t,page:c}=r();if(!e)return;console.log(t);let o="&"==t[t.length-1]?[...t].shift():t;s({q:e,tab:o,page:c});const n=location.href.slice(0,location.href.lastIndexOf("#"));console.log({q:e,newTab:o,page:c}),location.assign(`${n}#gsc.q=${e}&gsc.tab=${o}&gsc.page=${c}`),location.reload()};n.addEventListener("keydown",(t=>{"Enter"===t.code&&e()})),document.querySelector(".suggestions_suggestions__DgAt8").addEventListener("click",(t=>{t.target.closest(".gssb_a ")&&e()})),o.addEventListener("click",e),document.querySelectorAll(".navigation_link__MPiS5").forEach((e=>e.addEventListener("click",(c=>{c.preventDefault();const o=a(),{q:n,tab:r,page:i}=t();if(!o&&!n)return;const l=o||n,g=e.href.includes("/search")?0:1;let d=e.href.slice(0,e.href.lastIndexOf("?"));"/"==d[d.length-1]&&(d=d.slice(0,d.length-1));const u=`${d}#gsc.q=${l}&gsc.tab=${g}&gsc.page=1`;console.log(u),s({q:l,tab:g,page:1}),location.assign(u)}))))}else{const e=()=>{const{q:e,tab:t,page:c}=r();if(!e)return;const o=`${location.origin}${location.pathname.includes("en")?"/en":""}/search#gsc.q=${e}&gsc.tab=0&gsc.page=1`;s({q:e,tab:0,page:1}),location.assign(o)};n.addEventListener("keydown",(t=>{"Enter"===t.code&&e()})),o&&o.addEventListener("click",e),document.querySelector("suggestions_suggestions__DgAt8").addEventListener("click",(t=>{t.target.closest(".gssb_a ")&&e()}))}})();const n=document.querySelector(".gssb_e");document.querySelector(".suggestions_suggestions__DgAt8").append(n),document.querySelector(".gsib_b").addEventListener("click",(e=>{const{q:t,tab:s,page:c}=localStorage.getItem("qyery")&&JSON.parse(localStorage.getItem("qyery"))||{q:"",tab:0,page:1},o=location.href;history.pushState(null,null,`${o.slice(0,o.lastIndexOf("#"))}#gsc.q=${t}&gsc.tab=${s}&gsc.page=${c}`),console.log(t,s,c)}));const a=document.querySelector("#___gcse_0"),r=document.querySelector("header");a.style.paddingTop=r.offsetHeight+"px",await o(0,".gsc-tabdActive .gsc-results",2);const i=document.querySelector(".gsc-tabdActive .gsc-results");i.classList.add(".my-wrapper"),r.parentElement.after(i),i.style.paddingTop=r.offsetHeight+"px",a.remove();const l=r.querySelector("form"),g=document.querySelector(".gsc-expansionArea");let d=()=>{g.style.minHeight=window.innerHeight-r.offsetHeight+"px",i.style.paddingTop=r.offsetHeight+"px"};if(d(),window.addEventListener("resize",d),location.pathname.includes("/search")){const e=e=>{if(window.innerWidth<769){if(i.classList.contains("_center"))return;return i.style.width="",i.style.marginLeft="",void i.classList.add("_center")}i.classList.remove("_center"),i.style.width=l.offsetWidth+"px",i.style.marginLeft=l.offsetLeft+"px"};e(),window.addEventListener("resize",e)}}))})();