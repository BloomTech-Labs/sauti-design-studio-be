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



// Post receives data like the following from AfricaTalks

// {
// 	"sessionId": "135351351351",
// 	"phoneNumber": "8675309",
// 	"networkCode": "Verizon or Something...",
// 	"serviceCode": "+44454545?",
// 	"text": "1"
// }


router.post('/', async (req, res) => {

    let textnum = req.body;
    console.log(textnum.text);

    res.send(`testoutput for a new screen with input ${textnum.text}`)
})


module.exports = router;