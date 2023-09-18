
// document.addEventListener('DOMContentLoaded', async (e) => {
//    //функция, которая по умолчанию ждёт загрузки объекта google, но так же может ждать загрузку любого другого элемента

//    const waitFor = async (ms = 0, target = null , type = 1) => {
//       return new Promise((resolve, reject) => {
//          let count = 0;
   
//          const interval = setInterval(() => {
//             if(type == 1 && google || type == 2 && document.querySelector(target)){
//                clearInterval(interval);
//                resolve();
//             }
   
//             if(ms >= 20_000){
//                reject();
//             }
   
//             count += ms;
//          }, ms);
//       });
//    }

//    //const wait = async ms => new Promise(resolve => setTimeout(resolve, ms));

//    //жду загрузку

//    const isSearch = location.pathname.includes('search');
//    await Promise.all([waitFor(), waitFor(0, '.gsc-cursor-box', 2)]);

//    if(!isSearch){
//       document.querySelectorAll('.gsc-tabsArea>div')[1].dispatchEvent(new Event('click'));

//       await waitFor(0, '.gsc-resultsbox-visible>.gsc-resultsRoot:last-child .gsc-cursor-box', 2);
//    }

//    //получаю рабочий контейнер, в котором у меня есть и данные и пагинация

//    const resultContainer = document.querySelectorAll('.gsc-resultsRoot')[isSearch ? 0 : 1];

//    const overlay = document.querySelector('.gsc-results-wrapper-overlay');
//    overlay.classList.remove('gsc-results-wrapper-overlay');
//    overlay.style.position = 'static !important';

//    const contentBlock = resultContainer.querySelector('.gsc-expansionArea');
//    const contentPagination = resultContainer.querySelector('.gsc-cursor-box');

//    if(contentBlock.querySelector('.gsc-imageResult')){
//       contentBlock.classList.add('image-content');
//    }

//    //удаляю дефолтный бкол, в котором находятся все данные

//    document.querySelector('#___gcse_0').remove();

//    //создаю свой блок в котором юудут находится все данные

//    const wrapper = document.createElement('div');
//    wrapper.append(contentBlock, contentPagination);
//    wrapper.classList.add('.my-wrapper');

//    const header = document.querySelector('header');
//    wrapper.style.marginTop = `${header.offsetHeight}px`;

//    //обработчик событий для пагинации, чтобы было понятно на какой странице ейчас находимся

//    contentPagination.addEventListener('click', e => {
//       const el = e.target;
//       const activeClass = 'gsc-cursor-current-page';

//       if(el.closest('.gsc-cursor-page') && !el.closest(`.gsc-cursor-page.${activeClass}`)){
//          const link = el.closest('.gsc-cursor-page');

//          document.querySelector(`.${activeClass}`).classList.remove(activeClass);
//          link.classList.add(activeClass);

//          window.scrollTo({
//             'left': 0,
//             'top': 0,
//             'behavior': 'smooth'
//          });
//       }
//    })

//    header.parentElement.after(wrapper);
// });

const isQueryPage = () => location.href.includes('/search') || location.href.includes('/images') || location.href.includes('/video');
const getQyery = () => {
   const qRegExp = /gsc\.q=[\d\D]*?(&|\s)/ig;
   const tabRegExp = /gsc\.tab=[\d\D]*?(&|\s)/ig;
   const pageRegExp = /gsc\.page=[\d\D]*?(&|\s)/ig;

   const resQ = location.hash.match(qRegExp)?.[0];
   const resTab = location.hash.match(tabRegExp)?.[0];
   const resPage = location.hash.match(pageRegExp)?.[0];

   return { 'q':  resQ ? resQ.slice(6) : '', 'tab': resTab ? resTab.slice(8) : 0, 'page': resPage ? resPage.slice(9) : 1  };
} 

const saveQyery = (qyery) => {
   localStorage.setItem('query', JSON.stringify(qyery));
}

const loadQyery = () => {
   console.log(localStorage.getItem('query'));
   return localStorage.getItem('query') ? JSON.parse(localStorage.getItem('query')) : {'q': '', 'tab': 0, 'page': 1};
}

const changeInput = () => {
   const inputSearch = document.querySelector('.gsc-input-box');
   let inputSubmit;

   if(!document.querySelector('.search-form_withoutButton__ZeHVz'))
      inputSubmit = document.querySelector('.gsc-search-button-v2');

   document.querySelector('.gsc-search-box').remove();

   if(inputSubmit)
      inputSubmit.innerHTML = document.querySelector('.search-form_button__Unuvh').textContent;

   document.addEventListener('click', e => {
      const el = e.target;

      if(inputSearch.classList.contains('_focus') && !el.closest('.search-form_wrapper__ogg9T')){
         inputSearch.classList.remove('_focus');
      }else if(el.closest('.search-form_wrapper__ogg9T')){
         inputSearch.classList.add('_focus');
      }

   });

   document.querySelector('#query').replaceWith(inputSearch);

   if(isQueryPage())
      document.querySelector('.search-form_button__Unuvh').replaceWith(inputSubmit);
}

const forAll = () => {

   const inputSearch = document.querySelector('.gsc-input-box');
   let inputSubmit;

   if(!document.querySelector('.search-form_withoutButton__ZeHVz'))
      inputSubmit = document.querySelector('.gsc-search-button-v2');

   document.querySelector('.gsc-search-box').remove();

   if(inputSubmit)
      inputSubmit.innerHTML = document.querySelector('.search-form_button__Unuvh').textContent;

   document.addEventListener('click', e => {
      const el = e.target;

      if(inputSearch.classList.contains('_focus') && !el.closest('.search-form_wrapper__ogg9T')){
         inputSearch.classList.remove('_focus');
      }else if(el.closest('.search-form_wrapper__ogg9T')){
         inputSearch.classList.add('_focus');
      }

   });

   document.querySelector('#query').replaceWith(inputSearch);

   if(isQueryPage())
      document.querySelector('.search-form_button__Unuvh').replaceWith(inputSubmit);

   //changeInput();

   const input = document.querySelector('.gsc-input-box input');

   const getInputValue = () => {
      return input.value.trim();
   }

   const getInputValueOrQ = () => {
      const inputValue = getInputValue(); 
      const {q, tab, page} = getQyery();

      console.log(inputValue);

      if(!inputValue && !q)
         return;

      const res = inputValue ? inputValue : q;

      return {'q': res, tab, page};
   }

   if(!isQueryPage()){
      const handler = () => {
         const {q, tab, page} = getInputValueOrQ();

         if(!q)
            return;

         const url = `${location.origin}${location.pathname.includes('en') ? '/en' : ''}/search#gsc.q=${q}&gsc.tab=0&gsc.page=1`;
         saveQyery({q, 'tab': 0, 'page': 1});

         location.assign(url);
      }

      input.addEventListener('keydown', e => {
         if(e.code !== 'Enter')
            return;

         handler();
      });

      if(inputSubmit){

         inputSubmit.addEventListener('click', handler);
      }

      document.querySelector('suggestions_suggestions__DgAt8').addEventListener('click', e => {
         const el = e.target;

         if(!el.closest('.gssb_a '))
            return;

         handler();
      });

   }else{

      const handler = () => {
         const {q, tab, page} = getInputValueOrQ();

         if(!q)
            return;

         console.log(tab);

         let newTab = tab[tab.length - 1] == '&' ? [...tab].shift() : tab;  

         saveQyery({q, 'tab': newTab, page});

         const url = location.href.slice(0, location.href.lastIndexOf('#'))

         //console.log(url);

         console.log({q, newTab, page});

         location.assign(`${url}#gsc.q=${q}&gsc.tab=${newTab}&gsc.page=${page}`);
         location.reload();
         //location.assign();
      }

      input.addEventListener('keydown', e => {
         if(e.code !== 'Enter')
            return;

         handler();
      });

      document.querySelector('.suggestions_suggestions__DgAt8').addEventListener('click', e => {
         const el = e.target;

         if(!el.closest('.gssb_a '))
            return;

         handler();
      });

      inputSubmit.addEventListener('click', handler)

      document.querySelectorAll('.navigation_link__MPiS5').forEach(link => link.addEventListener('click', e => {
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

         console.log(url);
         //debugger;

         saveQyery({'q': res, 'tab': resTab, 'page': 1});

         location.assign(url);
      }));


   }
}

document.addEventListener('DOMContentLoaded', async e => {
   const waitFor = async (ms = 0, target = null , type = 1) => {
      return new Promise((resolve, reject) => {
         let count = 0;
   
         const interval = setInterval(() => {
            if(type == 1 && google || type == 2 && document.querySelector(target)){
               clearInterval(interval);
               resolve();
            }
   
            if(ms >= 20_000){
               reject();
            }
   
            count += ms;
         }, ms);
      });
   }

   if(isQueryPage()){
      
      document.body.classList.add('_search');
   }

   await waitFor();

   forAll();

   const {q: Q} = getQyery();
   const {q, tab, page} = loadQyery();
   //debugger;

   //console.log(Q);

   if(Q == '&' && q !== ''){
      console.log(Q);
      //debugger;
      console.log(q, tab, page);
      location.assign(`${location.href.slice(0, location.href.lastIndexOf('#'))}#gsc.q=${q}&gsc.tab=${tab}&gsc.page=${page}`);
   }
   // location.assign(`${location.href.slice(0, location.href.lastIndexOf('#'))}#gsc.q=${q}&gsc.tab=${tab}&gsc.page=${page}`);

   //console.log('****');

   const suggests = document.querySelector('.gssb_e');

   document.querySelector('.suggestions_suggestions__DgAt8').append(suggests);

   const clearButton = document.querySelector('.gsib_b');

   clearButton.addEventListener('click', e => {
      const {q, tab, page} = loadQyery();

      const url = location.href;

      history.pushState(null, null, `${url.slice(0, url.lastIndexOf('#'))}#gsc.q=${q}&gsc.tab=${tab}&gsc.page=${page}`);

      console.log(q, tab, page);
   });

   const ___gcse_0 = document.querySelector('#___gcse_0');
   const header = document.querySelector('header');

   ___gcse_0.style.paddingTop = header.offsetHeight + 'px'; 

   await waitFor(0, '.gsc-tabdActive .gsc-results', 2);

   // const {q, tab, page} = getQyery();
   // location.assign(`${url}#gsc.q=${q}&gsc.tab=${tab}&gsc.page=${page}`);

   const result = document.querySelector('.gsc-tabdActive .gsc-results');
   result.classList.add('.my-wrapper');

   header.parentElement.after(result);

   result.style.paddingTop = header.offsetHeight + 'px'; 
   ___gcse_0.remove();

   const form = header.querySelector('form');
   const area = document.querySelector('.gsc-expansionArea');

   let hieghtPaddingHandler = () => {
      area.style.minHeight = window.innerHeight - header.offsetHeight + 'px';
      result.style.paddingTop = header.offsetHeight + 'px'; 
   }

   hieghtPaddingHandler();
   window.addEventListener('resize', hieghtPaddingHandler);

   if(location.pathname.includes('/search')){
      const resizeHandler = e => {
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
});
