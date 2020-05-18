const path = require('path');
const axios = require("axios");
const { dateRange, dataNum } = require("../public/js/helper");
const URL = "https://api.rawg.io/api/games?";
const pug = require('pug');

exports.partials = async (req, res) => {
	try {
		const url = `${URL}page=${req.query.page}&search=${req.query.search}`;
		console.log(url)
		const values = await axios({
			url: `${URL}page=${req.query.page}&search=${req.query.search}`,
			method: "GET",
			headers: {
				Accept: "application/json"
			}
		})
			.then((response) => {
        const dataJSON = response.data;
				console.log(dataJSON.count);
				return dataJSON;
			})
			.then((dataJSON) => {
				let itemsArr = [];

				dataJSON.results.map((items) => {
					itemsArr.push(items);
				});
				const part = pug.renderFile('views/partials.pug', {
					items: itemsArr,
					next: dataNum(dataJSON.next),
					search: req.query.search
				});
				res.json(part);
				console.log('part');
			});
		return values;
	} catch {
		(err) => console.error(err);
	}
};


exports.dates = async (req, res) => {
	console.log("/home ...");

	try {
		const values = await axios({
			url: `${URL}dates=${dateRange(35)}&ordering=-rating`,
			method: "GET",
			headers: {
				Accept: "application/json"
			}
		})
			.then((response) => {
				const dataJSON = response.data;
				return dataJSON;
			})
			.then((dataJSON) => {
				let itemsArr = [];
				dataJSON.results.map((items) => {
					if (items.rating > 0) {
						itemsArr.push(items);
					}
				});
				res.render("home", {
					items: itemsArr,
					next: dataJSON.next
				});
			});
		return values;
	} catch {
		(err) => console.error(err);
	}
};

exports.search = async (req, res) => {
	try {
		const values = await axios({
			url: `${URL}search=${req.query.search}`,
			method: "GET",
			headers: {
				Accept: "application/json"
			}
		})
			.then((response) => {
				const dataJSON = response.data;
				return dataJSON;
			})
			.then((dataJSON) => {
				let itemsArr = [];

				dataJSON.results.map((items) => {
					itemsArr.push(items);
				});
				res.render("games", {
					items: itemsArr,
					next: dataNum(dataJSON.next),
					search: req.query.search
				});
			});
		return values;
	} catch {
    (err) => console.error(err);
    
	}


};
