//console.log('!!!');
document.addEventListener('DOMContentLoaded', async (e) => {
   const waitForGoogle = async (ms) => {
      return new Promise((resolve, reject) => {
         let count = 0;
   
         const interval = setInterval(() => {
            if(google){
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

   await waitForGoogle(10);

   const header = document.querySelector('header');
   const googleContainer = header.parentElement.nextElementSibling;
   googleContainer.style.background = 'inherit';
   //googleContainer.style.overflow = 'auto';
   // gsc-wrapper
   //document.querySelector('.gsc-wrapper').style.overflow = 'auto';
   //gsc-resultsbox-visible
   //document.querySelector('.gsc-control-wrapper-cse').style.overflow = 'auto';
   //document.querySelector('.gsc-results-wrapper-visible').style.overflow = 'auto';
   console.log(googleContainer);

   //document.querySelector('.gsc-control-cse').style.overflow = 'auto';
   //gsc-expansionArea
   //document.querySelector('.gsc-expansionArea').style.overflow = 'auto';
   googleContainer.style.marginTop = `${header.offsetHeight}px`;

   const content = document.querySelector('.gsc-results-wrapper-overlay');
   content.classList.remove('gsc-results-wrapper-overlay');
   content.style.position = 'static !important';
   //content.style.overflow = 'auto';

   // if(google){
   //    console.log(google);
   // }
   //const google = document.querySelector('#___gcse_0');
   
   //google.style.marginTop = `${header.offsetHeight}px`;
   
   //console.log(google.search.element.getElement());

   // console.log('!!!');
   // console.log(document.body.children[1]);
   // console.log(document.body.children['___gcse_0']);
   // console.log(document.body.querySelector('#___gcse_0'));

//gsc-results-wrapper-overlay gsc-results-wrapper-visible
});

//console.log(document.body.querySelector('.gsc-results-wrapper-overlay'));
// console.log(document.body.children['___gcse_0']);
// console.log(document.body.querySelector('#___gcse_0'));

