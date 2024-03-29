const path = require('path');
const axios = require("axios");
const { dateRange, dataNum } = require("../public/js/helper");
require('dotenv').config();

console.log(process.env);
const URL = `https://api.rawg.io/api/games?key=${process.env.API_KEY}&`;

const pug = require('pug');

exports.partials = async (req, res) => {
	try {
		const values = await axios({
			url: `${URL}page=${req.query.page}&search=${req.query.search}`,
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
				const nextPage = () => {
					return dataJSON.next !== null 
					? dataNum(dataJSON.next) 
					: 'end';
				}
				console.log(nextPage())
				let itemsArr = [];
				dataJSON.results.map((items) => {
					itemsArr.push(items);
				});
				const part = pug.renderFile('views/partials.pug', {
					items: itemsArr,
					next: nextPage(),
					search: req.query.search
				});
				res.json(part);
			});
		return values;
	} catch {
		(err) => console.error(err);
	}
};

exports.dates = async (req, res) => {

	try {
		const releasedGameUrl = `${URL}dates=${dateRange(35)}&ordering=-rating`
		const upcomingGameUrl = `${URL}dates=${dateRange(-140)}&page_size=2`
		const reqReleased = await axios.get(releasedGameUrl)
		const reqUpcoming = await axios.get(upcomingGameUrl)
		axios
			.all([reqReleased, reqUpcoming])
			.then(axios.spread((...responses) => {
				const released = responses[0].data;
				const upcoming = responses[1].data;
				return [released, upcoming];
			}))
			.then((dataJSON) => {
				let releasedArr = [];
				dataJSON[0].results.map((items) => {
					if (items.rating > 0) {
						releasedArr.push(items);
					}
				});
				let upcomingArr = [];
				dataJSON[1].results.map((items) => {
					if (items.rating > 0) {
						upcomingArr.push(items);
					}
				});

				res.render("home", {
					items: releasedArr,
					next: dataJSON.next,
					upcoming: upcomingArr
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
				const nextPage = () => {
					return dataJSON.next !== null 
					? dataNum(dataJSON.next) 
					: 'end';
				}
				console.log(nextPage())
				let itemsArr = [];

				dataJSON.results.map((items) => {
					itemsArr.push(items);
				});
				res.render("games", {
					items: itemsArr,
					next: nextPage(),
					search: req.query.search
				});
			});
		return values;
	} catch {
    (err) => console.error(err);
    
	}


};
