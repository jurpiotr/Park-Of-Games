const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/', (req, res) => {
    res.render('home');
    
})
router.get('/games/:name', async (req, res) => {
    console.log('/games ...');
    try{
        const values = await axios({
            url: 'https://api.rawg.io/api/games?search=' + req.params.name,
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
            res.render('games', {
                item: itemsArr,
                count: dataJSON.count
            })
            console.log(itemsArr[0].clip.clip);
        });
        return values;
    } catch {
        err => console.error(err);
    }
    
});

module.exports = router;
