window.addEventListener('DOMContentLoaded', () => {
	const sandbox = document.querySelector('.sandbox');
	sandbox.addEventListener('click', logSubmit = (event) => {

		if(event.target.id === "lm"){
			const lm = document.getElementById('lm');
			const dataNum = lm.getAttribute('data-num');
			const dataSearch = lm.getAttribute('data-search');
			fetch(`/partials?page=${dataNum}&search=${dataSearch}`)
			.then((response) => response.json())
			.then(data => {
				sandbox.removeChild(lm.parentElement)
				sandbox.innerHTML += data;
			})
		}
	});
});


