const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/', (req, res) => {
    res.render('home');
    
})
router.get('/api', async (req, res) => {
    console.log('/api ...');
    try{

        const values = await axios({
            url: "https://api.rawg.io/api/games?page_size=1",
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            },
})
        .then(response => {
            const dataJSON = response.data;
            return dataJSON;
        })
        .then(dataJSON => {
            let itemsArr = [];
            dataJSON.results.map((items) => {
                itemsArr.push(items);
            });
            res.render('api', {
                items: itemsArr,
                count: dataJSON.count
            })
            console.log(itemsArr);
        });
        return values;
    } catch {
        err => console.error(err);
    }
    
});

module.exports = router;
