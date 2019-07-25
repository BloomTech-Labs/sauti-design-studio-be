const router = require('express').Router();




const db = require('../database/dbConfig');

const homesesh = () => {
    return db('graphTable').where({id:1});
}




router.get('/', async(req, res) =>{
    
    let homeText = await homesesh();

    console.log(homeText[0]["text"])
    
    res.send(homeText[0]["text"])

    // res.send('test output home page')
})

router.post('/', async (req, res) => {
    res.send('testoutput for a new screen')
})


module.exports = router;