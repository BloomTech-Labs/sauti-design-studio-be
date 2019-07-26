const router = require('express').Router();




const db = require('../database/dbConfig');

const homesesh = () => {
    return db('graphTable').where({id:1});
}

let page = "string";


router.get('/', async(req, res) =>{
    
    let homeText = await homesesh();

    page = "pogo";

    console.log(homeText[0]["text"]);
    console.log('page ', page);
    
    res.send(homeText[0]["text"]);

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

const newpagehold = async(request, current) => {
    console.log('newpagehold');
}

const curscreen = async(current, request) => {

    let newscreen = "blank";

    if (page == "string" || "pogo") {
        newscreen = await homesesh();

        return newscreen;
    }
    else {
        // newscreen = await newpage();


    }
 
}


router.post('/', async (req, res) => {

    let textnum = req.body.text;

    let screen = curscreen(page, textnum);

    console.log(textnum.text);
    console.log('page ', page);

    res.send(`testoutput for a new screen with input ${textnum}`)
})


module.exports = router;