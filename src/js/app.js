

const isQueryPage = () => location.href.includes('/search') || location.href.includes('/images') || location.href.includes('/video');
const getQyery = () => {
   const qRegExp = /gsc\.q=[\d\D]*?(&|\s)*?/ig;
   const tabRegExp = /gsc\.tab=[\d\D]+?(&|\s)*?/ig;
   const pageRegExp = /gsc\.page=[\d\D]*(&|\s)*?/ig;

   const resQ = location.hash.match(qRegExp)?.[0];
   const resTab = location.hash.match(tabRegExp)?.[0];
   const resPage = location.hash.match(pageRegExp)?.[0];

   localStorage.setItem('url', location.href);

   return { 'q':  resQ ? resQ.slice(6) : '', 'tab': resTab ? resTab.slice(8) : 0, 'page': resPage ? resPage.slice(9) : 1  };
} 

const saveQyery = (qyery) => {
   localStorage.setItem('query', JSON.stringify(qyery));
}

const loadQyery = () => {
   return localStorage.getItem('query') ? JSON.parse(localStorage.getItem('query')) : {'q': '', 'tab': 0, 'page': 1};
}

document.addEventListener('DOMContentLoaded', async e => {

   if(document.querySelector('.help_swiper__NBWsm')){
      const swiper = new Swiper('.help_swiper__NBWsm', {
         'slidesPerView': 1,
         'navigation': {
            'nextEl': '.swiper-button-next',
            'prevEl': '.swiper-button-prev'
         },
         'autoHeight': true
      });
   }

  document.querySelectorAll('.navigation_list__4Sxuz a').forEach(link => link.href.includes('/video?q=') && link.parentElement.remove());

   if(document.querySelector('.header__wrapper--right')){
      const button = document.querySelector('.header__wrapper--right');
      const nav = document.querySelector('.drop__menu');
      const html = document.querySelector('html');
      const header = document.querySelector('header');
   
      const makeMenuHeight = () => {
         nav.style.top = header.offsetHeight + 'px';

         if(window.innerWidth < 768)
            nav.style.height = window.innerHeight - header.offsetHeight + 'px';
         else
            nav.style.height = 'auto';

      }

      makeMenuHeight();

      button.addEventListener('click', e => {
         if(!nav.classList.contains('drop__menu-active') && html.style.overflow !== '' && window.innerWidth < 768){
            html.style.overflow = '';
         }

         if(nav.classList.contains('drop__menu-active'))
            makeMenuHeight();
      });

      window.addEventListener('resize', e => {
         if(window.innerWidth >= 768){
            html.style.overflow = '';
            nav.style.height = 'auto';
         }else if(nav.classList.contains('drop__menu-active')){
            html.style.overflow = 'hidden';
            makeMenuHeight();
         }
      });
   }

   if(document.querySelector('.main-header_header__6f50p')){
      const header = document.querySelector('.main-header_header__6f50p');

      const scrollHandler = e => {
         if(scrollY > 0){
            header.classList.add('main-header_active__9PbG5');
         }else{
            header.classList.remove('main-header_active__9PbG5');
         }
      }
      scrollHandler();
      window.addEventListener('scroll', scrollHandler);
   }

   if(document.querySelector('.main-header_burger__puk_6') || document.querySelector('.header_burger__ecWQU')){
      const button = document.querySelector('.main-header_burger__puk_6') || document.querySelector('.header_burger__ecWQU');
      const nav = document.querySelector('nav.sidebar_sidebar__PMRuB')
      
      let areaExp = button.getAttribute('area-expanded')

      button.addEventListener('click', e => {
         areaExp = !areaExp;
         button.setAttribute('area-expanded', areaExp);

         nav.classList.toggle(button.classList.contains('main-header_burger__puk_6') ? 'main-header_visible__QLLSQ' : 'header_visible__S7IMG');
      });

   }

   const waitFor = async (ms = 0, target = null , type = 1) => {
      return new Promise((resolve, reject) => {
         //let count = 0;
   
         const interval = setInterval(() => {
            try{
               if(type == 1 && google || type == 2 && document.querySelector(target)){
                  clearInterval(interval);
                  resolve();
               }
      
               // if(ms >= 20_000){
               //    reject();
               // }
            }catch{
               
            }
   
            //count += ms;
         }, ms);
      });
   };


   if(isQueryPage()){
      
      document.body.classList.add('_search');
   }

   await waitFor();

  // console.log('-----');

   const checkCapcha = () => {
      if(document.querySelector('#recaptcha-wrapper')){
         ___gcse_0.style.display = 'block';
      }
   }

   const ___gcse_0 = document.querySelector('#___gcse_0');

   //checkCapcha();

   let inputSubmit;

   const setSearchPlace = () => {  
      const inputSearch = document.querySelector('.gsc-input-box');
      //let inputSubmit;

      if(!document.querySelector('.search-form_withoutButton__ZeHVz'))
         inputSubmit = document.querySelector('.gsc-search-button-v2');

      document.querySelector('.gsc-search-box').remove();

      if(inputSubmit)
         inputSubmit.innerHTML = document.querySelector('header form [type="submit"]').textContent;

      let wrapperSelector;

      if(document.querySelector('.search-form_wrapper__ogg9T')){
         wrapperSelector = '.search-form_wrapper__ogg9T';
      }else if(document.querySelector('.input__wrap')){
         wrapperSelector = '.input__wrap';
      }

      document.addEventListener('click', e => {
         const el = e.target;

         if(inputSearch.classList.contains('_focus') && !el.closest('.gsc-input-box .gsib_a')){
            inputSearch.classList.remove('_focus');
         }else if(el.closest('.gsc-input-box .gsib_a')){
            inputSearch.classList.add('_focus');
         }

      });

      if(document.querySelector('#query')){
         document.querySelector('#query')?.replaceWith(inputSearch)
      }else if(document.querySelector('#search')){
         document.querySelector('#search')?.replaceWith(inputSearch);
      }


      if(document.querySelector('header form [type="submit"]')){
         const submit = document.querySelector('header form [type="submit"]');
         submit.style.display = 'none';

         submit.replaceWith(inputSubmit);
      }
   }

   setSearchPlace();

   const input = document.querySelector('.gsc-input-box input');

   const setSearchListeners = () => {

      const getInputValue = () => {
         return input.value.trim();
      }

      const getInputValueOrQ = () => {
         const inputValue = getInputValue(); 
         const {q, tab, page} = getQyery();

         //console.log(inputValue);

         if(!inputValue && !q)
            return;

         const res = inputValue ? inputValue : q;

         return {'q': res, tab, page};
      }


      if(!isQueryPage()){
         const handler = () => {
            try{
               const {q, tab, page} = getInputValueOrQ();

               if(!q)
                  return;

               const url = `${location.origin}${location.pathname.includes('en') ? '/en' : ''}/search#gsc.q=${q}&gsc.tab=0&gsc.page=1`;
               saveQyery({q, 'tab': 0, 'page': 1});

               //console.log(url);

               location.assign(url);
            }catch{
            }
         }

         input.addEventListener('keydown', e => {
            if(e.code !== 'Enter')
               return;

            handler();
         });

         if(inputSubmit){
            inputSubmit.addEventListener('click', handler);
         }

         let suggests;

         if(document.querySelector('.suggestions_suggestions__DgAt8')){
            suggests = document.querySelector('.suggestions_suggestions__DgAt8');
         }else if(document.querySelector('.list-hints')){
            suggests = document.querySelector('.list-hints');
         }
         
         suggests.addEventListener('click', e => {
            const el = e.target;

            if(!el.closest('.gsq_a'))
               return;

            handler();
         });

      }else{

         const handler = () => {
            try{
               const {q, tab, page} = getInputValueOrQ();

               if(!q)
                  return;

               let newTab = tab[tab.length - 1] == '&' ? [...tab].shift() : tab;  

               saveQyery({q, 'tab': newTab, page});

               const url = location.href.slice(0, location.href.lastIndexOf('#'))

               location.assign(`${url}#gsc.q=${q}&gsc.tab=${newTab}&gsc.page=${page}`);
               location.reload();
            }catch{

            }
         }

         input.addEventListener('keydown', e => {
            if(e.code !== 'Enter')
               return;

            handler();
         });

         document.querySelector('.suggestions_suggestions__DgAt8').addEventListener('click', e => {
            const el = e.target;

            if(!el.closest('.gsq_a'))
               return;

            handler();
         });

         inputSubmit.addEventListener('click', handler);

         const isQueryLink = url => ['/search?', '/images?', '/video?'].some(href => url.includes(href));

         [...document.querySelectorAll('a')].filter(link => isQueryLink(link.href)).forEach(link => {
            //console.log(link);

            // if(link.href.includes('/video?q=')){
            //    link.remove();
            // }else{

            link.addEventListener('click', e => {
               e.preventDefault();

               

               const isSearchLink = () => link.href.includes('/search');

               const inputValue = getInputValue(); 
               const {q, tab, page} = getQyery();

               if(!inputValue && !q)
                  return;

               const res = inputValue ? inputValue : q;
               const resTab = isSearchLink() ? 0 : 1;

               let origin = link.href.slice(0, link.href.lastIndexOf('?'));
               origin[origin.length - 1] == '/' && (origin = origin.slice(0, origin.length - 1));

               const url = `${origin}#gsc.q=${res}&gsc.tab=${resTab}&gsc.page=1`;

               saveQyery({'q': res, 'tab': resTab, 'page': 1});

               location.assign(url);
            })
         //}
         });

      }
   }

   setSearchListeners();

   const addClearButtonListener = () => {
      if(isQueryPage()){
         const clearButton = document.querySelector('.gsib_b');

         clearButton.addEventListener('click', e => {
            const {q, tab, page} = loadQyery();
            let {q: Q, page: Page} = getQyery();

            const url = location.href;

            if(Q[Q.length - 1] == '&'){
               Q = Q.slice(0, Q.length - 1);
            }

            //console.log('sdsd');

            history.replaceState(null, null, `${url.slice(0, url.lastIndexOf('#'))}#gsc.q=${Q || q || ''}&gsc.tab=${tab}&gsc.page=${page || Page || '1'}`);

           //console.log('sdsd');
         });
      }
   }

   addClearButtonListener();

   const loadWithParams = () => {

      let {q, page} = loadQyery();

      if(isQueryPage()){

         let {q: Q, page: Page} = getQyery();

   
         if(Q[Q.length - 1] == '&'){
            Q = Q.slice(0, Q.length - 1);
         }

         if(Page > 10)
            Page = 10;
   
         const url = location.href;

         location.assign(`${url.slice(0, url.lastIndexOf('#'))}#gsc.q=${Q || q || ''}&gsc.tab=${url.includes('/search') ? 0 : 1}&gsc.page=${(Page || page || '1')}`);
      }else{
         saveQyery({'q': '', 'tab': 0, 'page': 1});
         const newUrl = `${location.href.slice(0, location.href.lastIndexOf('#'))}`;

         input.value = '';
         history.replaceState(null, null, newUrl);
      }
   }

   loadWithParams();

   const relocateSuggests = () => {
      const suggests = document.querySelector('.gssb_e');

      //console.log(suggests);

      if(document.querySelector('.suggestions_suggestions__DgAt8'))
         document.querySelector('.suggestions_suggestions__DgAt8')?.append(suggests) 
      else if(document.querySelector('.list-hints')){
         document.querySelector('.list-hints').append(suggests);
      }
   }

   relocateSuggests();

   if(!isQueryPage()){
      ___gcse_0.style.display = 'none';
      return;
   }

   const makeSerpScene = async () => {

      const header = document.querySelector('header');

      ___gcse_0.style.paddingTop = header.offsetHeight + 'px'; 

      await waitFor(0, '.gsc-tabdActive .gsc-results', 2);

      const result = document.querySelector('.gsc-tabdActive .gsc-results');
      result.classList.add('.my-wrapper');

      header.parentElement.after(result);

      result.style.paddingTop = header.offsetHeight + 'px'; 
      ___gcse_0.style.display = 'none';

      const form = header.querySelector('form');
      const area = document.querySelector('.gsc-expansionArea');

      let hieghtPaddingHandler = () => {
         area.style.minHeight = window.innerHeight - header.offsetHeight + 'px';
         result.style.paddingTop = header.offsetHeight + 'px';
      }
      let resizeHandler;

      hieghtPaddingHandler();
      window.addEventListener('resize', hieghtPaddingHandler);

      if(location.pathname.includes('/search')){
         resizeHandler = e => {
            if(window.innerWidth < 769){
               if(result.classList.contains('_center')){
                  return;
               }

               result.style.width = "";
               result.style.marginLeft = "";

               result.classList.add('_center');

               return;
            }

            result.classList.remove('_center');
            result.style.width = form.offsetWidth + 'px';
            result.style.marginLeft = form.offsetLeft + 'px';
         }

         resizeHandler();
         window.addEventListener('resize', resizeHandler);
      }

      const observer = new MutationObserver((mutationList, observer) => {
         document.querySelectorAll('.gsc-expansionArea a').forEach(link => link.setAttribute('target', '_blank'));

         hieghtPaddingHandler();
         if(location.pathname.includes('/search')){
            resizeHandler();
         }

        // checkCapcha();
      });

      observer.observe(area, {
         'childList': true,
         'subtree': true,
      });
   }

   await makeSerpScene();

   document.querySelectorAll('.gsc-expansionArea a').forEach(link => link.setAttribute('target', '_blank'));

   const addPagginationListener = () => {
      document.addEventListener('click', async e => {
         const el = e.target;

         if(el.closest('.gsc-cursor-page') || el.closest('.gsc-cursor-container-previous') || el.closest('.gsc-cursor-numbered-page') || el.closest('.gsc-cursor-container-next') || el.closest('.gsc-cursor-next-page')){
            let {q: Q, tab, page: Page} = getQyery();
            let {q, page} = loadQyery();

            let res;

            if(Q.length > 1 && Q.endsWith('&')){
               res = Q.slice(0, g.length - 1);
            }else if(Q.length > 1){
               res = Q;
            }else{
               res = q;
            }

            saveQyery({'q': res, tab, 'page': Page || page || 1});

            setTimeout(() => {
               window.scrollTo({
                  'left': 0,
                  'top': 0,
                  'behavior': 'smooth'
               });
            }, 0);
         }
      });
   }

   addPagginationListener();

   //checkCapcha();

   const setImageMabilePreview = () => {
      document.addEventListener('click', e => {
         const el = e.target;

         if(!document.querySelector('.gs-mobilePreview'))
            return;

         const makeClone = () => {
            const block = el.closest('.gsc-imageResult.gsc-imageResult-popup.gsc-result'); 
            block.classList.add('mobi');

            const preview =  document.querySelector('.gs-mobilePreview');
            const clonePreview = preview.cloneNode(true);

            preview.style.display = 'none';

            clonePreview.classList.add('_active__');

            document.querySelector('.gsc-cursor-box').style.display = 'block';

            clonePreview.querySelectorAll('a').forEach(link => link.setAttribute('target', '_blank'));

            block.append(clonePreview);
         }

         if(el.closest('.gsc-imageResult.gsc-imageResult-popup.gsc-result')){

            if(!document.querySelector('.gs-mobilePreview._active__')){
               makeClone();
            }
            else{
               const clonePreview = document.querySelector('.gs-mobilePreview._active__');

               if(clonePreview.parentElement == el.closest('.gsc-imageResult.gsc-imageResult-popup.gsc-result')){
                  if(el.closest('.gs-closeButton'))
                     clonePreview.remove();

                  return;
               }
               
               clonePreview.remove();

               makeClone();
            }
         }
      });
   }

   setImageMabilePreview();
});
