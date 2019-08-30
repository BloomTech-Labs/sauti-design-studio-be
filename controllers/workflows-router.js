const router = require('express').Router();

const ussdModel = require('../models/ussd-model');
const nodeModel = require('../models/nodes-models')
const projectModel = require('../models/project-models')

const db = require('../database/dbConfig');

router.post('/ussd/:id', async (req, res) => {    
    const project_id = req.params.id

    const parent_node = await projectModel.getParentNode(project_id)

    const splitText = req.body.text.split['*'][req.body.text.length-1]

    /*Africa Talks API parameters
    sessionId - A unique value generated when the session starts and sent every time a mobile subscriber response has been received.
    phoneNumber - The number of the mobile subscriber interacting with your ussd application.
    networkCode - The telco of the phoneNumber interacting with your ussd application.
    serviceCode - This is your USSD code. Please note that it doesn’t show your channel on shared USSD codes.
    text - This shows the user input. It is an empty string in the first notification of a session. After that, it concatenates all the user input within the session with a * until the session ends. */

    const session = {
        session_id: req.body.sessionId,
        phone_num: req.body.phoneNumber,
        network_code: req.body.networkCode,
        service_code: req.body.serviceCode,
        text: splitText
    }

    

    //This code begins the session with all the appropriate session to
    //keep track of who the user is and where they are accessing from.
    let service = await ussdModel.startSession(session);
    
    //Checks the text of incoming request to see what screen should be presented and returns the appropriate node id
    let screen = await newscreen(service, session.text, parent_node);
    console.log("Screen", screen);
    //Returns the node object using the node ID from the previous function
    let display = await ussdModel.getScreen(screen);
    console.log(display)

    //Converts each option into the text format for USSD usage
    let counter = 0;
    let convertedTextOptions = await display.options.map(item =>{
        counter++;
        return (`${counter})${item}\n`);
    }).join('')

    res.send(`${display.text}\n${convertedTextOptions}\n`)
})

router.post('/sim/:id', async (req, res) => {    
    const project_id = req.params.id
    const parent_node = await projectModel.getParentNode(project_id)

    if(!req.body.user_id){
        res.status(400).json({error: "Please send a request with a valid user_id that has an integer value."})
    }

    if(!parent_node){
        res.status(400).json({error: "The project you were trying to access either does not exist or does not have a designated parent node."})
    }

    console.log("REQ BODY DATA", req.body
    )
    const session = {
        session_id: req.body.user_id,
        text: req.body.text,
        workflow: project_id
    }
    console.log("SESSION AFTER OBJ", session)
    //This code begins the session with all the appropriate session to
    //keep track of who the user is and where they are accessing from.
    let service = await ussdModel.startSession(session); 
    console.log("SERVICE:" , service);
    //Checks the text of incoming request to see what screen should be presented and returns the appropriate node id
    let screen = await newscreen(service, session.text, parent_node);

    //Returns the node object using the node ID from the previous function
    let display = await ussdModel.getScreen(screen);

    //Converts each option into the text format for USSD usage
    let counter = 0;
    let convertedTextOptions = await display.options.map(item =>{
        counter++;
        return (`${counter})${item}\n`);
    }).join('')

    const responseObject = {display, convertedTextOptions
    }

    res.status(200).send(responseObject)
})


const newscreen = async(curSession, request, initial_node) => {
    if(!curSession.history)
        curSession.history = []

        console.log('SESSIOON HISTORY', curSession.history)

    if(!curSession.phone_num){
        curSession.phone_num = '';
        curSession.servicecode = '';
        curSession.network_code = '';
    }

    const newSessionInfo = {
        session_id: curSession.session_id,
        phone_num: curSession.phone_num,
        service_code: curSession.service_code,
        network_code: curSession.network_code,
        text: curSession.text,
        page: curSession.page, 
        history: curSession.history
      };
      
      console.log("curSession page contents at newscreen function", curSession)


    let newscreen = "";

    if (request == "") {

        console.log('Page on no text entry POST req: ', curSession.page);

        if (curSession.page == null){
            let respo = await nodeModel.getNode(initial_node);
            console.log(respo)
            let newscreen = respo[0]["node_id"];

            console.log('newscreen ', newscreen );

            newSessionInfo.page = respo[0]["node_id"];
            
            curSession.history.push(newscreen);
            console.log('newSessionInfo to update: ', newSessionInfo);

            let update = await ussdModel.updateSessionPage(curSession, newscreen)

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
        // PREVIOUS/GO BACK REQUEST //
        if (request == "99") {
            // console.log('curSession.page contents: ', curSession.page)
            // const choice = await db('nodes').where({node_id : curSession.page});
            
            // console.log('choice: ',choice[0]['previous'])
            // if (choice[0]['previous'] == "" || !choice[0]['previous']) {
            //     newscreen = curSession.page;
            // }
            // else {
            //     newscreen = choice[0]['previous'];
            // }
            curSession.history.pop();
            let previousPage = curSession.history[curSession.history.length - 1];
            try{
            newscreen = await nodeModel.getNode(previousPage);
            let update = await ussdModel.updateSessionPage(curSession, newscreen[0].node_id)
            console.log('HERE', newscreen)
            if(!newscreen)
                return initial_node
            return newscreen[0].node_id
            }
            catch(error){}
            //let update = await ussdModel.updateSessionPage(curSession, newscreen)

           // console.log('updated session info: ', update);

           //return newscreen;
        }

        // GO HOME REQUEST //
        else if (request == "00") {
            let respo = await nodeModel.getNode(initial_node);

            let newscreen = respo[0]["node_id"];

            console.log('newscreen ', newscreen );

            newSessionInfo.page = respo[0]["node_id"];

            console.log('newSessionInfo to update: ', newSessionInfo);

            console.log('CURSESSION HISTORY', curSession.historypush)

            curSession.history.push(newscreen);

            let update = await ussdModel.updateSessionPage(curSession, newscreen)

            console.log('updated session info: ', update);

            return newscreen;
        }

        else if (request) {
            console.log('request to number options');
            for (i = 1; i < 10; i ++) {
                let numby = i.toString();
                
                if (request === numby) {
        
                    console.log('curSession.page contents: ', curSession.page)
                    if(!curSession.page)
                        curSession.page = initial_node

                    console.log("reassigned page", curSession.page)
                    const choice = await db('nodes').where({node_id : curSession.page});
                    
                    // console.log('choice: ',choice[0]);
                    console.log('choice: ',choice[0]['connections'][`${i-1}`]);

                    if (choice[0]['connections'][`${i-1}`] == "" || !choice[0]['connections'][`${i-1}`]) {
                        newscreen = curSession.page;
                    }
                    else {
                        newscreen = choice[0]['connections'][`${i-1}`];
                    }

                    curSession.history.push(newscreen)
                    let update = await ussdModel.updateSessionPage(curSession, newscreen)

                    console.log('updated session info: ', update);

                    // current = newscreen;
                    return newscreen;
                }
            }

        }

    }
 
}


module.exports = router;