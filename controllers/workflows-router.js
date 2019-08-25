const router = require('express').Router();

const ussdModel = require('../models/ussd-model');
const nodeModel = require('../models/nodes-models')
const projectModel = require('../models/project-models')

const db = require('../database/dbConfig');

router.post('/:id', async (req, res) => {
    const project_id = req.params.id
    const parent_node = await projectModel.getParentNode(project_id)
  

    const session = {
        session_id: req.body.session_id,
        phone_num: req.body.phone_num,
        service_code: req.body.service_code,
        text: req.body.text
    }

    console.log("SESSSIONNNN######################", session)

    //This code begins the session with all the appropriate session to
    //keep track of who the user is and where they are accessing from.
    let service = await ussdModel.startSession(session); //TODO: change this so that it returns the first value instead of an array
    if(service.text)
        service = service[0]
    console.log('SERVICEEEEEEEEEEEE###############', service)
    
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

    res.send(`${display.text}\n${convertedTextOptions}\n`)

})


const newscreen = async(curSession, request, initial_node) => {

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
            let respo = await nodeModel.getNode(initial_node);
            console.log(respo)
            let newscreen = respo[0]["node_id"];

            console.log('newscreen ', newscreen );

            newSessionInfo.page = respo[0]["node_id"];

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
            console.log('curSession.page contents: ', curSession.page)
            const choice = await db('nodes').where({node_id : curSession.page});
            
            console.log('choice: ',choice[0]['previous'])
            if (choice[0]['previous'] == "" || !choice[0]['previous']) {
                newscreen = curSession.page;
            }
            else {
                newscreen = choice[0]['previous'];
            }

            let update = await ussdModel.updateSessionPage(curSession, newscreen)

            console.log('updated session info: ', update);

            return newscreen;
        }

        // GO HOME REQUEST //
        else if (request == "00") {
            let respo = await nodeModel.getNode(initial_node);

            let newscreen = respo[0]["node_id"];

            console.log('newscreen ', newscreen );

            newSessionInfo.page = respo[0]["node_id"];

            console.log('newSessionInfo to update: ', newSessionInfo);

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
                    const choice = await db('nodes').where({node_id : curSession.page});
                    
                    // console.log('choice: ',choice[0]);
                    console.log('choice: ',choice[0]['connections'][`${i-1}`]);

                    if (choice[0]['connections'][`${i-1}`] == "" || !choice[0]['connections'][`${i-1}`]) {
                        newscreen = curSession.page;
                    }
                    else {
                        newscreen = choice[0]['connections'][`${i-1}`];
                    }

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