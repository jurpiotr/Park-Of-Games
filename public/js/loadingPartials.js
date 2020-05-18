console.log('loadingPartials')

window.addEventListener('DOMContentLoaded', () => {
	const sandbox = document.querySelector('.sandbox');
	sandbox.addEventListener('click', logSubmit = (event) => {
		if(event.target.id === "lm"){
			const lm = document.querySelector('.lm');
			const dataNum = event.target.getAttribute('data-num');
			const dataSearch = event.target.getAttribute('data-search');
			const prnt = document.querySelector('.prnt');
			console.log('SHOW MORE');
			fetch(`/partials?page=${dataNum}&search=${dataSearch}`)
			.then((response) => response.json())
			.then(data => {
				lmParent = lm.parentElement;
				lm.remove(lmParent.lastElementChild);
				lmParent.innerHTML += data;
			})
		}
	});
});


