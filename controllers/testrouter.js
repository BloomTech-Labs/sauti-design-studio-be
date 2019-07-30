const router = require('express').Router();




const db = require('../database/dbConfig');

const homesesh = () => {
    return db('graphTable').where({id:1});
}

let page = db('graphTable').select('name').where({id:1});


function getSessionInfo(body) {
    const session = {
      session_id: body.sessionId,
      phone_num: body.phoneNumber,
      service_code: body.serviceCode,
      text: body.text,
      page: db('graphTable').select('name').where({id:1}),
    };
    return session;
  }




router.get('/', async(req, res) =>{

    const session = getSessionInfo(req.body);
    
    let homeText = await homesesh();

    // page = "string";

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

const newscreen = async(current, request) => {

    let newscreen =  page;

    if (request == "") {

        console.log('Page on no text entry POST req: ', page);

        newscreen = page;

        return newscreen;
    }
    else {
        if (request == "1") {
            const choice = await db('graphTable').where({name:current});
            
            console.log('choice: ',choice[0]['Con1'])

            newscreen = choice[0]['Con1'];

            page = newscreen;
            return newscreen;
        }

        else if (request == "2") {
            const choice = await db('graphTable').where({name:current});
            
            console.log('choice: ',choice[0]['Con2'])

            newscreen = choice[0]['Con2'];

            page = newscreen;
            return newscreen;
        }

    }
 
}


router.post('/', async (req, res) => {

    const session = getSessionInfo(req.body);

    let textnum = req.body.text;

    console.log("texted number ", textnum);
    
    let screen = await newscreen(page, textnum);

    console.log(screen);
    console.log('page ', page);

    res.send(`testoutput for a new screen with input ${textnum}`)
})


module.exports = router;