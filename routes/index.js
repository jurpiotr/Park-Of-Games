const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/', (req, res) => {
    res.render('home');
    
})
//  router.get('/games', async (req, res) => {
//      return res.send(req.query.search);
//  });
router.get('/games', async (req, res) => {
    console.log('/games ...');
    try{
        const values = await axios({
            url: 'https://api.rawg.io/api/games?search=' + req.query.search,
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
                items: itemsArr,
                count: dataJSON.count
            })
        });
        return values;
    } catch {
        err => console.error(err);
    }
    
});

module.exports = router;
