const router = require('express').Router();

const ussdModel = require('../models/ussd-model');
const nodeModel = require('../models/nodes-models')
const projectModel = require('../models/project-models')

const db = require('../database/dbConfig');

router.post('/:id', async (req, res) => {
    const project_id = req.params.id
    console.log(project_id)
    const parent_node = await projectModel.getParentNode(project_id)
    console.log(parent_node)//remove

    const session = {
        session_id: req.body.session_id,
        phone_num: req.body.phone_num,
        service_code: req.body.service_code,
        text: req.body.text
    }

    //This code begins the session with all the appropriate session to
    //keep track of who the user is and where they are accessing from.
    const service = await ussdModel.startSession(session); //TODO: change this so that it returns the first value instead of an array

    let screen = await newscreen(service[0], session.text, parent_node);

    let display = await ussdModel.getScreen(screen);
    console.log(display);
    let options1 = [];
    let options2 = await display.map(ops => {
        for(i = 0; i < ops.options.length; i++){
            options1.push(ops.options[i]);
        }
    })

    let opsyNew = await options1.forEach(function(oppy) {
        console.log('oppy:',oppy);
        let popsicle = "";
        popsicle = oppy;
        return `${popsicle}`;
    })
    let counter = 0;
    let opsyNew2 = await options1.map(thing =>{
        // console.log(thing);
        counter++
        return (`${counter})${thing}\n`);
    }).join('')

    res.send(`${display[0].text}\n${opsyNew2}\n`)

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