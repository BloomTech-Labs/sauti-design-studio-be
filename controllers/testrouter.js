const router = require('express').Router();

const UssdModel = require('../models/ussd-model');


const db = require('../database/dbConfig');

const homesesh = () => {
    return db('graphTable').where({id:1});
}


// let page = db('graphTable').select('name').where({id:1});
let page = "";

function getSessionInfo(body) {

    //let page = await db('graphTable').select('name').where({id:1});

    const session = {
      session_id: body.sessionId,
      phone_num: body.phoneNumber,
      service_code: body.serviceCode,
      text: body.text,
      page: "", 
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

const newscreen = async(curSession, request) => {

    const newSessionInfo = {
        session_id: curSession.session_id,
        phone_num: curSession.phone_num,
        service_code: curSession.service_code,
        text: curSession.text,
        page: curSession.page, 
      };    

    let newscreen = "";

    if (request == "") {

        console.log('Page on no text entry POST req: ', curSession.page);

        if (curSession.page == ""){
            let respo = await homesesh();

            let newscreen = respo[0]["name"];

            console.log('newscreen ', newscreen );

            newSessionInfo.page = respo[0]["name"];

            console.log('newSessionInfo to update: ', newSessionInfo);

            // NOW CURRENT THING - update function from modal to update the actual
            //session table with the new 'page' data before returning and displaying

            return newscreen;
        }
        else {
            newscreen = curSession.page;

            console.log('newscreen ', newscreen );

            return newscreen;
        }
        
        
    }
    else {
        if (request == "1") {
            const choice = await db('graphTable').where({name:current});
            
            console.log('choice: ',choice[0]['Con1'])

            newscreen = choice[0]['Con1'];

            current = newscreen;
            return newscreen;
        }

        else if (request == "2") {
            const choice = await db('graphTable').where({name:current});
            
            console.log('choice: ',choice[0]['Con2'])

            newscreen = choice[0]['Con2'];

            current = newscreen;
            return newscreen;
        }

    }
 
}


router.post('/', async (req, res) => {

    const session = getSessionInfo(req.body);

    console.log('session info: ', session);
    
    // if (!session.session_id) {
    //     console.log('NO EXISTING ID...')
    //     session = getSessionInfo(req.body);
    // }
    
    const service_code = await UssdModel.startSession(session);

    console.log("texted number ", session.text);
    console.log("service code", service_code);
    
    let screen = await newscreen(session, session.text);

    //page = screen;

    console.log('current screen ', screen);
    //console.log('page ', page);

    res.send(`testoutput for a new screen with input ${session.text}`)
})


module.exports = router;