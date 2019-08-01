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
    //   page: body.page, 
    };

    // if (!body.page) {
    //     session.page = "";
    // }

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

        if (curSession.page == null){
            let respo = await homesesh();

            let newscreen = respo[0]["name"];

            console.log('newscreen ', newscreen );

            newSessionInfo.page = respo[0]["name"];

            console.log('newSessionInfo to update: ', newSessionInfo);

            let update = await UssdModel.updateSessionPage(curSession.session_id, newscreen)

            console.log('updated session info: ', update);

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
            
            console.log('curSession.page contents: ', curSession.page)
            const choice = await db('graphTable').where({name : curSession.page});
            
            
            console.log('choice: ',choice[0]['Con1'])

            if (choice[0]['Con1'] == "" || !choice[0]['Con1']) {
                newscreen = curSession.page;
            }
            else {
                newscreen = choice[0]['Con1'];
            }

            let update = await UssdModel.updateSessionPage(curSession.session_id, newscreen)

            console.log('updated session info: ', update);

            // current = newscreen;
            return newscreen;
        }

        else if (request == "2") {
            console.log('curSession.page contents: ', curSession.page)
            const choice = await db('graphTable').where({name : curSession.page});
            
            
            console.log('choice: ',choice[0]['Con2'])

            if (choice[0]['Con2'] == "" || !choice[0]['Con2']) {
                newscreen = curSession.page;
            }
            else {
                newscreen = choice[0]['Con2'];
            }

            let update = await UssdModel.updateSessionPage(curSession.session_id, newscreen)

            console.log('updated session info: ', update);

            // current = newscreen;
            return newscreen;
        }

        else if (request == "3") {
            console.log('curSession.page contents: ', curSession.page)
            const choice = await db('graphTable').where({name : curSession.page});
            
            
            console.log('choice: ',choice[0]['Con3'])

            if (choice[0]['Con3'] == "" || !choice[0]['Con3']) {
                newscreen = curSession.page;
            }
            else {
                newscreen = choice[0]['Con3'];
            }

            let update = await UssdModel.updateSessionPage(curSession.session_id, newscreen)

            console.log('updated session info: ', update);

            // current = newscreen;
            return newscreen;
        }

        else if (request == "4") {
            console.log('curSession.page contents: ', curSession.page)
            const choice = await db('graphTable').where({name : curSession.page});
            
            
            console.log('choice: ',choice[0]['Con4'])

            if (choice[0]['Con4'] == "" || !choice[0]['Con4']) {
                newscreen = curSession.page;
            }
            else {
                newscreen = choice[0]['Con4'];
                
            }

            let update = await UssdModel.updateSessionPage(curSession.session_id, newscreen);

            console.log('updated session info: ', update);

            // current = newscreen;
            return newscreen;
        }

        else if (request == "5") {
            console.log('curSession.page contents: ', curSession.page)
            const choice = await db('graphTable').where({name : curSession.page});
            
            
            console.log('choice: ',choice[0]['Con5'])

            if (choice[0]['Con5'] == "" || !choice[0]['Con5']) {
                newscreen = curSession.page;
            }
            else {
                newscreen = choice[0]['Con5'];
            }

            let update = await UssdModel.updateSessionPage(curSession.session_id, newscreen)

            console.log('updated session info: ', update);

            // current = newscreen;
            return newscreen;
        }

        else if (request == "6") {
            console.log('curSession.page contents: ', curSession.page)
            const choice = await db('graphTable').where({name : curSession.page});
            
            
            console.log('choice: ',choice[0]['Con6'])

            if (choice[0]['Con6'] == "" || !choice[0]['Con6']) {
                newscreen = curSession.page;
            }
            else {
                newscreen = choice[0]['Con6'];
            }

            let update = await UssdModel.updateSessionPage(curSession.session_id, newscreen)

            console.log('updated session info: ', update);

            // current = newscreen;
            return newscreen;
        }

        else if (request == "7") {
            console.log('curSession.page contents: ', curSession.page)
            const choice = await db('graphTable').where({name : curSession.page});
            
            
            console.log('choice: ',choice[0]['Con7'])

            if (choice[0]['Con7'] == "" || !choice[0]['Con7']) {
                newscreen = curSession.page;
            }
            else {
                newscreen = choice[0]['Con7'];
            }

            let update = await UssdModel.updateSessionPage(curSession.session_id, newscreen)

            console.log('updated session info: ', update);

            // current = newscreen;
            return newscreen;
        }

        else if (request == "8") {
            console.log('curSession.page contents: ', curSession.page)
            const choice = await db('graphTable').where({name : curSession.page});
            
            
            console.log('choice: ',choice[0]['Con8'])

            if (choice[0]['Con8'] == "" || !choice[0]['Con8']) {
                newscreen = curSession.page;
            }
            else {
                newscreen = choice[0]['Con8'];
            }

            let update = await UssdModel.updateSessionPage(curSession.session_id, newscreen)

            console.log('updated session info: ', update);

            // current = newscreen;
            return newscreen;
        }

        else if (request == "9") {
            console.log('curSession.page contents: ', curSession.page)
            const choice = await db('graphTable').where({name : curSession.page});
            
            
            console.log('choice: ',choice[0]['Con9'])

            if (choice[0]['Con9'] == "" || !choice[0]['Con9']) {
                newscreen = curSession.page;
            }
            else {
                newscreen = choice[0]['Con9'];
            }

            let update = await UssdModel.updateSessionPage(curSession.session_id, newscreen)

            console.log('updated session info: ', update);

            // current = newscreen;
            return newscreen;
        }

        // GO BACK REQUEST //
        else if (request == "99") {
            console.log('curSession.page contents: ', curSession.page)
            const choice = await db('graphTable').where({name : curSession.page});
            
            console.log('choice: ',choice[0]['previous'])
            newscreen = choice[0]['previous'];

            let update = await UssdModel.updateSessionPage(curSession.session_id, newscreen)

            console.log('updated session info: ', update);

            return newscreen;
        }

        // GO HOME REQUEST //
        else if (request == "00") {
            let respo = await homesesh();

            let newscreen = respo[0]["name"];

            console.log('newscreen ', newscreen );

            newSessionInfo.page = respo[0]["name"];

            console.log('newSessionInfo to update: ', newSessionInfo);

            let update = await UssdModel.updateSessionPage(curSession.session_id, newscreen)

            console.log('updated session info: ', update);

            return newscreen;
        }

    }
 
}


router.post('/', async (req, res) => {

    // const clean = cleanSessions();

    const session = getSessionInfo(req.body);

    console.log('session info: ', session);
    
    // if (!session.session_id) {
    //     console.log('NO EXISTING ID...')
    //     session = getSessionInfo(req.body);
    // }
    
    const service = await UssdModel.startSession(session);

    console.log("texted number ", session.text);
    console.log("service ", service[0]);
    
    let screen = await newscreen(service[0], session.text);

    //page = screen;

    console.log('current screen ', screen);
    //console.log('page ', page);

    res.send(`testoutput for a new screen with input ${session.text}`)
})


module.exports = router;


// need to account for connections (Con1, etc) not existing...
// need to add options for Con1-Con9
// need to rework migrations and seeds for sessions, and for graphtable
// work out how to delete session data every X amount of minutes
