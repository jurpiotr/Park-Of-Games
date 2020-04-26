const parallax = function() {
    const sticky = document.querySelector('.sticky');
    const logo = document.querySelector('.logo');
    const nextEl = sticky.nextElementSibling;

    window.addEventListener('scroll', () => {
        const top = this.pageYOffset;
        if(top === 0){
            sticky.classList.remove('sticky-short');
            sticky.classList.add('sticky');
            nextEl.style.opacity = 1;
            logo.classList.remove('logo--scrolling');


        } else {
            sticky.classList.remove('sticky');
            sticky.classList.add('sticky-short');
            nextEl.style.opacity = 1;
            logo.classList.add('logo--scrolling');
        }
    })
}

module.exports = parallax;