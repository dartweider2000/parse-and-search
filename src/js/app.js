

const isQueryPage = () => location.pathname.includes('/search') || location.pathname.includes('/images');
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
                  // console.log(gsce, '!!!');
                  // console.log(google);
                  // console.log(gsce, '!!!');
                  resolve(target);
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

   const clearUselessParthsGSC = () => {
      if(document.querySelector('.gsc-positioningWrapper')){
         document.querySelector('.gsc-positioningWrapper').style.display = 'none';
      }

      if(document.querySelector('.gsc-above-wrapper-area')){
         document.querySelector('.gsc-above-wrapper-area').style.display = 'none';
      }
   } 

   await waitFor();

   const ___gcse_0 = document.querySelector('#___gcse_0');
   ___gcse_0.style.display = 'none';

   clearUselessParthsGSC();

   const checkCapcha = () => {
      if(document.querySelector('#recaptcha-wrapper')){
         ___gcse_0.style.display = 'block';
      }
   }

   let inputSubmit;

   const input = document.querySelector('.gsc-input-box input');

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

      const clearButton = document.querySelector('.gsib_b');

      // document.addEventListener('click', e => {
      //    const el = e.target;

      //    if(inputSearch.classList.contains('_focus') && !el.closest('.gsc-input-box .gsib_a')){
      //       inputSearch.classList.remove('_focus');
      //    }else if(el.closest('.gsc-input-box .gsib_a')){
      //       inputSearch.classList.add('_focus');
      //    }

      // });

      input.addEventListener('focusin', e => {
         inputSearch.classList.add('_focus');
      });

      input.addEventListener('focusout', e => {
         inputSearch.classList.remove('_focus');
      });

      //input.dispatchEvent(new Event('focusin'));

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

   // const input = document.querySelector('.gsc-input-box input');

   const setSearchListeners = () => {

      const getInputValue = () => {
         return localStorage.getItem('actualQ');
      }

      const getInputValueOrQ = () => {
         const inputValue = getInputValue(); 
         const {q, tab, page} = getQyery();

         if(!inputValue && !q)
            return;

         const res = inputValue ? inputValue : q;

         return {'q': res, tab, page};
      }

      input.addEventListener('input', e => localStorage.setItem('actualQ', input.value.trim()));


      if(!isQueryPage()){
         const handler = () => {
            setTimeout(() => {
               try{
                  const {q, tab, page} = getInputValueOrQ();

                  if(!q)
                     return;

                  const url = `${location.origin}${location.pathname.includes('en') ? '/en' : ''}/search#gsc.q=${q}&gsc.tab=0&gsc.page=1`;
                  saveQyery({q, 'tab': 0, 'page': 1});

                  location.assign(url);
               }catch{
               }
            }, 0);
         }

         input.addEventListener('keydown', e => {
            if(e.code !== 'Enter')
               return;

            localStorage.setItem('actualQ', input.value);

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

         const suggestsClickHandler = e => {
            const el = e.target;

            if(!el.closest('.gsq_a'))
               return;

            e.stopPropagation();

            localStorage.setItem('actualQ', input.value);

            handler();
         }
         
         suggests.addEventListener('click', suggestsClickHandler);
         //suggests.addEventListener('touchstart', suggestsClickHandler);
      }else{
         const handler = () => {
            setTimeout(() => {
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
            }, 0);
         }

         input.addEventListener('keydown', e => {
            if(e.code !== 'Enter')
               return;

            localStorage.setItem('actualQ', input.value);

            handler();
         });

         const clickHandler = e => {
            const el = e.target;

            if(!el.closest('.gsq_a'))
               return;

            localStorage.setItem('actualQ', input.value);

            handler();
         }

         const suggestWrapper = document.querySelector('.suggestions_suggestions__DgAt8');
          
         suggestWrapper.addEventListener('click', clickHandler);
         suggestWrapper.addEventListener('touchstart', clickHandler);

         inputSubmit.addEventListener('click', handler);

         const isQueryLink = url => ['/search?', '/images?', '/video?'].some(href => url.includes(href));

         [...document.querySelectorAll('a')].filter(link => isQueryLink(link.href)).forEach(link => {

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
         });

      }
   }

   //console.log('1');

   setSearchListeners();

   //console.log('2');

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

   //console.log('3');

   addClearButtonListener();

   const loadWithParams = () => {

      let {q, page} = loadQyery();

      let url = location.href;
      const pathName = location.pathname;

     // console.log(pathName, 'pathName');

      const withOutHashUrl = `${url.slice(0, url.indexOf(pathName))}${pathName}`;

      if(isQueryPage()){

         //console.log('not');

         let {q: Q, page: Page} = getQyery();

   
         if(Q[Q.length - 1] == '&'){
            Q = Q.slice(0, Q.length - 1);
         }

         if(Page > 10)
            Page = 10;

         url = `${url.slice(0, url.indexOf(pathName))}${pathName}`;

         location.assign(`${withOutHashUrl}#gsc.q=${Q || q || ''}&gsc.tab=${location.pathname.includes('/search') ? 0 : 1}&gsc.page=${(Page || page || '1')}`);
      }else{
         //console.log('else');
         saveQyery({'q': '', 'tab': 0, 'page': 1});

         input.value = '';

         try{
            //console.log(withOutHashUrl);
            //console.log(history);
            history.replaceState(null, null, withOutHashUrl);
         }
         catch(err){
            //console.log(err.message, 'err');
         }
      }
   }

   //console.log('4');

   loadWithParams();

   const relocateSuggests = () => {
      //console.log('++++');
      const suggests = document.querySelector('.gssb_e');

      //console.log('!!');
      //console.log(suggests);
      //console.log('--');

      let ulWrap;

      if(document.querySelector('.suggestions_suggestions__DgAt8'))
         ulWrap = document.querySelector('.suggestions_suggestions__DgAt8')
      else if(document.querySelector('.list-hints')){
         ulWrap = document.querySelector('.list-hints');
      }

      if(!ulWrap)
         return;

      ulWrap.append(suggests);

      const clickHandler = e => {
         if(!ulWrap.parentElement.querySelector('._focus')){
            try{
               const tbody = ulWrap.querySelector('tbody');
               tbody.innerHTML = '';
            }
            catch{

            }
         }
      }

      document.addEventListener('click', clickHandler);
      document.addEventListener('touchstart', clickHandler);
   }

   //console.log('5');

   relocateSuggests();

   //console.log('6');

   if(!isQueryPage()){
      ___gcse_0.style.display = 'none';
      return;
   }

   const makeSerpScene = async () => {
      const header = document.querySelector('header');

      ___gcse_0.style.paddingTop = header.offsetHeight + 'px'; 

      clearUselessParthsGSC();

      let res = await Promise.race([waitFor(0, '.gs-no-results-result', 2), waitFor(0, '.gsc-tabdActive .gsc-results', 2), waitFor(0, '#recaptcha-wrapper', 2)]);

      clearUselessParthsGSC();

      if(res == '#recaptcha-wrapper'){

         const interval = setInterval(() => {
            if(document.querySelector('#recaptcha-wrapper') && document.querySelector('.gsc-tabdActive .gsc-results')){
               clearInterval(interval);
               location.reload();
            }
         }, 0);

         return false;
      }

      if(document.querySelector('.gs-no-results-result')){
         res = '.gs-no-results-result'
      }

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
      });

      observer.observe(area, {
         'childList': true,
         'subtree': true,
      });

      if(res == '.gs-no-results-result'){
         const area = document.querySelector('.gsc-expansionArea');

         area.style.cssText = `
            min-height: ${area.style.minHeight};
            display: block !important;
         `;

         return false;
      }

      if(!document.querySelector('.gsc-cursor')){
         const area = document.querySelector('.gsc-expansionArea');
         area.style.paddingBottom = '20px';
         return false;
      }

      return true;
   }

   const bool = await makeSerpScene();

   checkCapcha();

   if(!bool)
      return;

   document.querySelectorAll('.gsc-expansionArea a').forEach(link => link.setAttribute('target', '_blank'));

   if(!isQueryPage())
      return;

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

   const area = document.querySelector('.gsc-expansionArea');
   const header = document.querySelector('header');
      
   const clearPadding = () => {
      area.style.paddingBottom = '0px';
      area.classList.remove('_padding');
   }

   const execute = (resSelector, activeSelector) => {
      setTimeout(() => {
         const isDesk = resSelector === '.gs-selectedImageResult';
         if(document.querySelector(resSelector) && isDesk || document.querySelector(activeSelector) && !isDesk){
            let result, active;
            if(isDesk){
               result = document.querySelector(resSelector);
               active = result.querySelector(activeSelector);
            }else{
               active = document.querySelector(activeSelector);
               result = active.closest(resSelector);
            }

            const activePreviewHeight = active.offsetHeight;
            const resultTop = result.offsetTop;
            const areaHeight = area.offsetHeight;
            const headerHeight = header.offsetHeight;
            const resultHeight = result.offsetHeight;

            const alreadyPadding = area.classList.contains('_padding') ? parseInt(area.style.paddingBottom) : 0;

            const heihgtWidthOutActive = headerHeight + areaHeight - alreadyPadding;
            const heightWidthActive = resultTop +  (isDesk ? resultHeight : headerHeight) + activePreviewHeight;

            const paddingBottom = heightWidthActive - heihgtWidthOutActive;

            if(paddingBottom > 0){
               area.style.paddingBottom = paddingBottom + 'px';

               area.classList.add('_padding');
            }else{
               clearPadding();
            }
         }else{
            clearPadding();
         }
      }, 20);
   }

   const setAreaPaddingBottom = (e) => {
      if(document.querySelector('.gs-mobilePreview')){
         execute('.gsc-imageResult', '.gs-mobilePreview._active__');
      }else{
         execute('.gs-selectedImageResult', '.gs-imagePreviewArea');
      }
   }

   setAreaPaddingBottom();
   area.addEventListener('click', setAreaPaddingBottom);
   window.addEventListener('resize', setAreaPaddingBottom);

   const addPagginationListener = () => {
      document.addEventListener('click', async e => {
         const el = e.target;

         if(el.closest('.gsc-cursor-page') || el.closest('.gsc-cursor-container-previous') || 
         el.closest('.gsc-cursor-numbered-page') || el.closest('.gsc-cursor-container-next') || 
         el.closest('.gsc-cursor-next-page') || el.closest('.gsc-cursor-final-page')){
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

               if(!el.closest('.gsc-cursor-final-page') && !el.closest('.gsc-cursor-numbered-page') && !el.closest('.gsc-cursor-current-page'))
                  clearPadding();
            }, 0);
         }
      });
   }

   addPagginationListener();
});
