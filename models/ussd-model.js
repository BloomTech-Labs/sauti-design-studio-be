
/* eslint-disable no-shadow */
const db = require('../database/dbConfig');
const _ = require('lodash');
const Promise = require('bluebird');



const startSession = async session => {

  const [active] = await db('sessions')
    .where({ session_id: session.session_id })
    .catch(error => error.message);

  if(active && active.workflow != session.workflow){
    await db('session')
          .update({workflow: session.workflow, page: null})
          .catch(error => error.message)
     active.workflow = session.workflow
     active.page = null     
  }

  if (!active || active.length === 0) {
    const [newSession] = await db('sessions').returning("*")
      .insert({ ...session })
      .catch(error => error.message);
      return newSession
  }
  // might have errors updating here, testing to find out...
  return active;
};


const getScreen = async page => {
  const [screen] = await db('nodes')
  .where({ node_id : page})
    return screen
}



const updateSessionPage = (session, value) =>
  db('sessions')
    .where({ session_id : session.session_id })
    .update({ 
      previous : session.page,
      page : value
      
     })
    .catch(error => error.message);




const updateSession = (session_id, key, value) =>
  db('sessions')
    .where({ session_id })
    .update({ [key]: Number(value) })
    .catch(error => error.message);





const getSession = (session_id, key) =>
  db('sessions')
    .select(key)
    .where({ session_id })
    .first()
    .catch(error => error.message);






const endSession = session_id =>
  db('sessions')
    .where({ session_id })
    .delete();

const getWorkflow = id =>
  db('workflows')
    .select('id', 'name')
    .where({ id })
    .first();

const getResponses = filter =>
  db('responses')
    .where(filter)
    .orderBy('index')
    .catch(error => error.message);

const getScreenData = async (workflow, input = null) => {
  const workflowData = db('workflows')
    .select('name')
    .where({ id: workflow })
    .first()
    .then(({ name }) => name);

  const subtitle = input
    ? db('responses')
        .select('title')
        .where({ workflow, id: input })
        .first()
        .then(({ title }) => title)
    : null;

  const options = db('responses')
    .select('id', 'title')
    .where({ workflow, parent: input });

  return Promise.join(workflowData, subtitle, options);
};

module.exports = {
  startSession,
  getSession,
  endSession,
  updateSession,
  getWorkflow,
  getResponses,
  getScreenData,
  updateSessionPage,
  getScreen,
  
};
