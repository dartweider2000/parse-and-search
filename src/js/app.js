//console.log('!!!');
document.addEventListener('DOMContentLoaded', async (e) => {
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

   const wait = async ms => new Promise(resolve => setTimeout(resolve, ms));

   const isSearch = location.pathname.includes('search');
   await Promise.all([waitFor(), waitFor(0, '.gsc-cursor-box', 2)]);

   if(!isSearch){
      document.querySelectorAll('.gsc-tabsArea>div')[1].dispatchEvent(new Event('click'));

      await waitFor(0, '.gsc-resultsbox-visible>.gsc-resultsRoot:last-child .gsc-cursor-box', 2);


      // document.querySelector()
      // console.log(document.querySelector('.gsc-resultsbox-visible>.gsc-resultsRoot:last-child .gsc-cursor-box'));
   }

   const resultContainer = document.querySelectorAll('.gsc-resultsRoot')[isSearch ? 0 : 1];

   const overlay = document.querySelector('.gsc-results-wrapper-overlay');
   overlay.classList.remove('gsc-results-wrapper-overlay');
   overlay.style.position = 'static !important';

   const contentBlock = resultContainer.querySelector('.gsc-expansionArea');
   const contentPagination = resultContainer.querySelector('.gsc-cursor-box');

   if(contentBlock.querySelector('.gsc-imageResult')){
      contentBlock.classList.add('image-content');
   }

   document.querySelector('#___gcse_0').remove();

   const wrapper = document.createElement('div');
   wrapper.append(contentBlock, contentPagination);
   wrapper.classList.add('.my-wrapper');

   const header = document.querySelector('header');
   wrapper.style.marginTop = `${header.offsetHeight}px`;


   contentPagination.addEventListener('click', e => {
      const el = e.target;
      const activeClass = 'gsc-cursor-current-page';

      if(el.closest('.gsc-cursor-page') && !el.closest(`.gsc-cursor-page.${activeClass}`)){
         const link = el.closest('.gsc-cursor-page');

         document.querySelector(`.${activeClass}`).classList.remove(activeClass);
         link.classList.add(activeClass);

         window.scrollTo({
            'left': 0,
            'top': 0,
            'behavior': 'smooth'
         });
      }
   })


   header.parentElement.after(wrapper);
});


