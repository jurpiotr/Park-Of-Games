// px = parallax
document.addEventListener("DOMContentLoaded", function(){
  const pxBackgroundAll = document.querySelectorAll('.parallax-background');

  document.addEventListener('scroll', function(){
    pxBackgroundAll.forEach((pxBackground, index) => {
      const pxContainer = pxBackground.parentElement.parentElement;
      pxContainer.style.zIndex =  (-index) -10;
      coordinate(pxContainer, pxBackground);
    })
  });
})

const coordinate = (pxContainer, pxBackground) =>{
  const parCon = pxContainer.getBoundingClientRect();
  let visibleTop = parCon.top - window.innerHeight;
  let visibleFull = parCon.top;

  // Visible parallax on the screen
  if(visibleTop < 0 ){
    pxBackground.style.transform = `translate3d(0px, ${-visibleFull/2}px, 0px) scale3d(1, 1, 1)`;
  }
}
