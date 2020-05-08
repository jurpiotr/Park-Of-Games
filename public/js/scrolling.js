   const sticky = document.querySelector('.sticky');
    const logo = document.querySelector('.sticky__logo');
    const input = document.querySelector('.bar__input');
    const nextEl = sticky.nextElementSibling;

    window.addEventListener('scroll', () => {
        const top = this.pageYOffset;
        if(top === 0){
            sticky.classList.remove('sticky--short');
        //    sticky.classList.add('sticky');
            nextEl.style.opacity = 1;
            logo.classList.remove('logo__name--scrolling');
            console.log(input)
            input.classList.remove('bar__input--scroll0');

        } else {
          //  sticky.classList.remove('sticky');
            sticky.classList.add('sticky--short');
            nextEl.style.opacity = 1;
            logo.classList.add('logo__name--scrolling');
            input.classList.add('bar__input--scroll0');
        }
    })
