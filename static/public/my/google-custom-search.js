(()=>{"use strict";const e=()=>location.href.includes("/search")||location.href.includes("/images")||location.href.includes("/video"),t=()=>{const e=location.hash.match(/gsc\.q=[\d\D]*?(&|\s)*?/gi)?.[0],t=location.hash.match(/gsc\.tab=[\d\D]+?(&|\s)*?/gi)?.[0],s=location.hash.match(/gsc\.page=[\d\D]*(&|\s)*?/gi)?.[0];return localStorage.setItem("url",location.href),{q:e?e.slice(6):"",tab:t?t.slice(8):0,page:s?s.slice(9):1}},s=e=>{localStorage.setItem("query",JSON.stringify(e))},r=()=>localStorage.getItem("query")?JSON.parse(localStorage.getItem("query")):{q:"",tab:0,page:1};document.addEventListener("DOMContentLoaded",(async c=>{if(document.querySelector(".help_swiper__NBWsm")&&new Swiper(".help_swiper__NBWsm",{slidesPerView:1,navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},autoHeight:!0}),document.querySelectorAll(".navigation_list__4Sxuz a").forEach((e=>e.href.includes("/video?q=")&&e.parentElement.remove())),document.querySelector(".header__wrapper--right")){const e=document.querySelector(".header__wrapper--right"),t=document.querySelector(".drop__menu"),s=document.querySelector("html"),r=document.querySelector("header"),c=()=>{t.style.top=r.offsetHeight+"px",window.innerWidth<768?t.style.height=window.innerHeight-r.offsetHeight+"px":t.style.height="auto"};c(),e.addEventListener("click",(e=>{!t.classList.contains("drop__menu-active")&&""!==s.style.overflow&&window.innerWidth<768&&(s.style.overflow=""),t.classList.contains("drop__menu-active")&&c()})),window.addEventListener("resize",(e=>{window.innerWidth>=768?(s.style.overflow="",t.style.height="auto"):t.classList.contains("drop__menu-active")&&(s.style.overflow="hidden",c())}))}if(document.querySelector(".main-header_header__6f50p")){const e=document.querySelector(".main-header_header__6f50p"),t=t=>{scrollY>0?e.classList.add("main-header_active__9PbG5"):e.classList.remove("main-header_active__9PbG5")};t(),window.addEventListener("scroll",t)}if(document.querySelector(".main-header_burger__puk_6")||document.querySelector(".header_burger__ecWQU")){const e=document.querySelector(".main-header_burger__puk_6")||document.querySelector(".header_burger__ecWQU"),t=document.querySelector("nav.sidebar_sidebar__PMRuB");let s=e.getAttribute("area-expanded");e.addEventListener("click",(r=>{s=!s,e.setAttribute("area-expanded",s),t.classList.toggle(e.classList.contains("main-header_burger__puk_6")?"main-header_visible__QLLSQ":"header_visible__S7IMG")}))}const o=async(e=0,t=null,s=1)=>new Promise(((r,c)=>{const o=setInterval((()=>{try{(1==s&&google||2==s&&document.querySelector(t))&&(clearInterval(o),r(t))}catch{}}),e)}));e()&&document.body.classList.add("_search"),await o();const n=document.querySelector("#___gcse_0");let a;n.style.display="none",document.querySelector(".gsc-positioningWrapper")&&(document.querySelector(".gsc-positioningWrapper").style.display="none"),document.querySelector(".gsc-above-wrapper-area")&&(document.querySelector(".gsc-above-wrapper-area").style.display="none"),(()=>{const e=document.querySelector(".gsc-input-box");let t;if(document.querySelector(".search-form_withoutButton__ZeHVz")||(a=document.querySelector(".gsc-search-button-v2")),document.querySelector(".gsc-search-box").remove(),a&&(a.innerHTML=document.querySelector('header form [type="submit"]').textContent),document.querySelector(".search-form_wrapper__ogg9T")?t=".search-form_wrapper__ogg9T":document.querySelector(".input__wrap")&&(t=".input__wrap"),document.querySelector(".gsib_b"),document.addEventListener("click",(t=>{const s=t.target;e.classList.contains("_focus")&&!s.closest(".gsc-input-box .gsib_a")?e.classList.remove("_focus"):s.closest(".gsc-input-box .gsib_a")&&e.classList.add("_focus")})),document.querySelector("#query")?document.querySelector("#query")?.replaceWith(e):document.querySelector("#search")&&document.querySelector("#search")?.replaceWith(e),document.querySelector('header form [type="submit"]')){const e=document.querySelector('header form [type="submit"]');e.style.display="none",e.replaceWith(a)}})();const l=document.querySelector(".gsc-input-box input");if((()=>{const r=()=>localStorage.getItem("actualQ"),c=()=>{const e=r(),{q:s,tab:c,page:o}=t();if(e||s)return{q:e||s,tab:c,page:o}};if(l.addEventListener("input",(e=>localStorage.setItem("actualQ",l.value.trim()))),e()){const e=()=>{setTimeout((()=>{try{const{q:e,tab:t,page:r}=c();if(!e)return;let o="&"==t[t.length-1]?[...t].shift():t;s({q:e,tab:o,page:r});const n=location.href.slice(0,location.href.lastIndexOf("#"));location.assign(`${n}#gsc.q=${e}&gsc.tab=${o}&gsc.page=${r}`),location.reload()}catch{}}),0)};l.addEventListener("keydown",(t=>{"Enter"===t.code&&(localStorage.setItem("actualQ",l.value),e())}));const o=t=>{t.target.closest(".gsq_a")&&(localStorage.setItem("actualQ",l.value),e())},n=document.querySelector(".suggestions_suggestions__DgAt8");n.addEventListener("click",o),n.addEventListener("touchstart",o),a.addEventListener("click",e);const i=e=>["/search?","/images?","/video?"].some((t=>e.includes(t)));[...document.querySelectorAll("a")].filter((e=>i(e.href))).forEach((e=>{e.addEventListener("click",(c=>{c.preventDefault();const o=r(),{q:n,tab:a,page:l}=t();if(!o&&!n)return;const i=o||n,u=e.href.includes("/search")?0:1;let d=e.href.slice(0,e.href.lastIndexOf("?"));"/"==d[d.length-1]&&(d=d.slice(0,d.length-1));const g=`${d}#gsc.q=${i}&gsc.tab=${u}&gsc.page=1`;s({q:i,tab:u,page:1}),location.assign(g)}))}))}else{const e=()=>{setTimeout((()=>{try{const{q:e,tab:t,page:r}=c();if(!e)return;const o=`${location.origin}${location.pathname.includes("en")?"/en":""}/search#gsc.q=${e}&gsc.tab=0&gsc.page=1`;s({q:e,tab:0,page:1}),location.assign(o)}catch{}}),0)};let t;l.addEventListener("keydown",(t=>{"Enter"===t.code&&(localStorage.setItem("actualQ",l.value),e())})),a&&a.addEventListener("click",e),document.querySelector(".suggestions_suggestions__DgAt8")?t=document.querySelector(".suggestions_suggestions__DgAt8"):document.querySelector(".list-hints")&&(t=document.querySelector(".list-hints"));const r=t=>{t.target.closest(".gsq_a")&&(localStorage.setItem("actualQ",l.value),e())};t.addEventListener("click",r),t.addEventListener("touchstart",r)}})(),e()&&document.querySelector(".gsib_b").addEventListener("click",(e=>{const{q:s,tab:c,page:o}=r();let{q:n,page:a}=t();const l=location.href;"&"==n[n.length-1]&&(n=n.slice(0,n.length-1)),history.replaceState(null,null,`${l.slice(0,l.lastIndexOf("#"))}#gsc.q=${n||s||""}&gsc.tab=${c}&gsc.page=${o||a||"1"}`)})),(()=>{let{q:c,page:o}=r();if(e()){let{q:e,page:s}=t();"&"==e[e.length-1]&&(e=e.slice(0,e.length-1)),s>10&&(s=10);const r=location.href;location.assign(`${r.slice(0,r.lastIndexOf("#"))}#gsc.q=${e||c||""}&gsc.tab=${r.includes("/search")?0:1}&gsc.page=${s||o||"1"}`)}else{s({q:"",tab:0,page:1});const e=`${location.href.slice(0,location.href.lastIndexOf("#"))}`;l.value="",history.replaceState(null,null,e)}})(),(()=>{const e=document.querySelector(".gssb_e");let t;if(document.querySelector(".suggestions_suggestions__DgAt8")?t=document.querySelector(".suggestions_suggestions__DgAt8"):document.querySelector(".list-hints")&&(t=document.querySelector(".list-hints")),!t)return;t.append(e);const s=e=>{if(!t.parentElement.querySelector("._focus"))try{t.querySelector("tbody").innerHTML=""}catch{}};document.addEventListener("click",s),document.addEventListener("touchstart",s)})(),!e())return void(n.style.display="none");const i=await(async()=>{const e=document.querySelector("header");n.style.paddingTop=e.offsetHeight+"px";let t=await Promise.race([o(0,".gs-no-results-result",2),o(0,".gsc-tabdActive .gsc-results",2),o(0,"#recaptcha-wrapper",2)]);if(document.querySelector(".gsc-positioningWrapper")&&(document.querySelector(".gsc-positioningWrapper").style.display="none"),document.querySelector(".gsc-above-wrapper-area")&&(document.querySelector(".gsc-above-wrapper-area").style.display="none"),"#recaptcha-wrapper"==t){const e=setInterval((()=>{document.querySelector("#recaptcha-wrapper")&&document.querySelector(".gsc-tabdActive .gsc-results")&&(clearInterval(e),location.reload())}),0);return!1}document.querySelector(".gs-no-results-result")&&(t=".gs-no-results-result");const s=document.querySelector(".gsc-tabdActive .gsc-results");s.classList.add(".my-wrapper"),e.parentElement.after(s),s.style.paddingTop=e.offsetHeight+"px",n.style.display="none";const r=e.querySelector("form"),c=document.querySelector(".gsc-expansionArea");let a,l=()=>{c.style.minHeight=window.innerHeight-e.offsetHeight+"px",s.style.paddingTop=e.offsetHeight+"px"};if(l(),window.addEventListener("resize",l),location.pathname.includes("/search")&&(a=e=>{if(window.innerWidth<769){if(s.classList.contains("_center"))return;return s.style.width="",s.style.marginLeft="",void s.classList.add("_center")}s.classList.remove("_center"),s.style.width=r.offsetWidth+"px",s.style.marginLeft=r.offsetLeft+"px"},a(),window.addEventListener("resize",a)),new MutationObserver(((e,t)=>{document.querySelectorAll(".gsc-expansionArea a").forEach((e=>e.setAttribute("target","_blank"))),l(),location.pathname.includes("/search")&&a()})).observe(c,{childList:!0,subtree:!0}),".gs-no-results-result"==t){const e=document.querySelector(".gsc-expansionArea");return e.style.cssText=`\n            min-height: ${e.style.minHeight};\n            display: block !important;\n         `,!1}return!!document.querySelector(".gsc-cursor")||(document.querySelector(".gsc-expansionArea").style.paddingBottom="20px",!1)})();if(document.querySelector("#recaptcha-wrapper")&&(n.style.display="block"),!i)return;if(document.querySelectorAll(".gsc-expansionArea a").forEach((e=>e.setAttribute("target","_blank"))),!e())return;document.addEventListener("click",(e=>{const t=e.target;if(!document.querySelector(".gs-mobilePreview"))return;const s=()=>{const e=t.closest(".gsc-imageResult.gsc-imageResult-popup.gsc-result");e.classList.add("mobi");const s=document.querySelector(".gs-mobilePreview"),r=s.cloneNode(!0);s.style.display="none",r.classList.add("_active__"),document.querySelector(".gsc-cursor-box").style.display="block",r.querySelectorAll("a").forEach((e=>e.setAttribute("target","_blank"))),e.append(r)};if(t.closest(".gsc-imageResult.gsc-imageResult-popup.gsc-result"))if(document.querySelector(".gs-mobilePreview._active__")){const e=document.querySelector(".gs-mobilePreview._active__");if(e.parentElement==t.closest(".gsc-imageResult.gsc-imageResult-popup.gsc-result"))return void(t.closest(".gs-closeButton")&&e.remove());e.remove(),s()}else s()}));const u=document.querySelector(".gsc-expansionArea"),d=document.querySelector("header"),p=()=>{u.style.paddingBottom="0px",u.classList.remove("_padding")},m=(e,t)=>{setTimeout((()=>{const s=".gs-selectedImageResult"===e;if(document.querySelector(e)&&s||document.querySelector(t)&&!s){let r,c;s?(r=document.querySelector(e),c=r.querySelector(t)):(c=document.querySelector(t),r=c.closest(e));const o=c.offsetHeight,n=r.offsetTop,a=u.offsetHeight,l=d.offsetHeight,i=r.offsetHeight,g=n+(s?i:l)+o-(l+a-(u.classList.contains("_padding")?parseInt(u.style.paddingBottom):0));g>0?(u.style.paddingBottom=g+"px",u.classList.add("_padding")):p()}else p()}),20)},y=e=>{document.querySelector(".gs-mobilePreview")?m(".gsc-imageResult",".gs-mobilePreview._active__"):m(".gs-selectedImageResult",".gs-imagePreviewArea")};y(),u.addEventListener("click",y),window.addEventListener("resize",y),document.addEventListener("click",(async e=>{const c=e.target;if(c.closest(".gsc-cursor-page")||c.closest(".gsc-cursor-container-previous")||c.closest(".gsc-cursor-numbered-page")||c.closest(".gsc-cursor-container-next")||c.closest(".gsc-cursor-next-page")||c.closest(".gsc-cursor-final-page")){let e,{q:o,tab:n,page:a}=t(),{q:l,page:i}=r();e=o.length>1&&o.endsWith("&")?o.slice(0,g.length-1):o.length>1?o:l,s({q:e,tab:n,page:a||i||1}),setTimeout((()=>{window.scrollTo({left:0,top:0,behavior:"smooth"}),c.closest(".gsc-cursor-final-page")||c.closest(".gsc-cursor-numbered-page")||c.closest(".gsc-cursor-current-page")||p()}),0)}}))}))})();