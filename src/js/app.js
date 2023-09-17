
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

   await waitFor();

   //работа со строкой поиска

   const inputSearch = document.querySelector('.gsc-input-box');
   const inputSubmit = document.querySelector('.gsc-search-button-v2');

   document.querySelector('.gsc-search-box').remove();

   inputSubmit.innerHTML = document.querySelector('.search-form_button__Unuvh').textContent;

   //const input = inputSearch.querySelector('input');

   document.addEventListener('click', e => {
      const el = e.target;

      if(inputSearch.classList.contains('_focus') && !el.closest('.gsc-input-box input')){
         inputSearch.classList.remove('_focus');
      }else if(el.closest('.gsc-input-box input')){
         inputSearch.classList.add('_focus');
      }

   });

   console.dir(inputSearch.querySelector('input'));

   document.querySelector('#query').replaceWith(inputSearch);
   document.querySelector('.search-form_button__Unuvh').replaceWith(inputSubmit);

   console.log(inputSearch, inputSubmit);

   const header = document.querySelector('header');
   const ___gcse_0 = document.querySelector('#___gcse_0');
   ___gcse_0.style.paddingTop = header.offsetHeight + 'px'; 

   //-------------------------------------


   //const content = document.querySelector('.gsc-tabdActive .gsc-expansionArea');

   await waitFor(0, '.gsc-tabdActive .gsc-results', 2);

   //const pagination = document.querySelector('.gsc-tabdActive .gsc-cursor-box');

   const result = document.querySelector('.gsc-tabdActive .gsc-results');
   //result.lastElementChild.remove();
   result.classList.add('.my-wrapper');

   header.parentElement.after(result);

   result.style.paddingTop = header.offsetHeight + 'px'; 
   ___gcse_0.remove();

   const form = header.querySelector('form');

   const resizeHandler = e => {
      if(window.innerWidth < 769){
         result.style.paddingTop = header.offsetHeight + 'px'; 

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

   //удаляю гугловский блок
   //document.querySelector('#___gcse_0').remove();

   // const wrapper = document.createElement('div');
   // wrapper.append(content, pagination);
   // wrapper.classList.add('.my-wrapper');

   // const header = document.querySelector('header');
   // header.parentElement.after(wrapper);

   // wrapper.style.paddingTop = header.offsetHeight + 'px'; 

   //console.log(content, pagination);


   const clearButton = document.querySelector('.gsib_b');

   // const changleLocation = (is = false) => {
   //    console.log(is);

   //    location.assign(`${location.origin}${location.pathname}?#gsc.tab=${0}&gsc.q=${input.value}&gsc.page=5`);
   // }


   // document.querySelector('.search-form_form__07QVG ').addEventListener('submit', e => {
   //    // if(e.code == 'Enter' && input.value.trim().length){
   //       console.log('sub');


   //       changleLocation();
   //    //}

   //    //e.stopPropagation();

   //    //console.log('submit');
   // })

   //inputSubmit.addEventListener('click', e => input.value.trim().length && changleLocation());

   // input.addEventListener('keydown', e => {
   //    if(e.code == 'Enter' && input.value.trim().length){
   //       console.log('!!!');


   //       changleLocation(true);
   //    }

   //    e.stopPropagation();
   // });

   clearButton.addEventListener('click', e => {
      block.classList.add('_visible');
   });
});
