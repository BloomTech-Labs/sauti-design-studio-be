// const options = {
//     apiKey: '3df078f60548ec5e6ab8771f574554920c620960aa46ca30808aef55ca4e92b2',         // use your sandbox app API key for development in the test environment
//     username: 'sandbox',      // use 'sandbox' for development in the test environment
// };
// const AfricasTalking = require('africastalking')(options);

// // Initialize a service e.g. SMS
// sms = africastalking.SMS

// // Use the service
// const options = {
//     to: ['+254711XXXYYY', '+254733YYYZZZ'],
//     message: "I'm a lumberjack and its ok, I work all night and sleep all day"
// }

// // Send message and capture the response or error
// sms.send(options)
//     .then( response => {
//         console.log(response);
//     })
//     .catch( error => {
//         console.log(error);
//     });

    module.exports = {
        AT:{
            apiKey: '3df078f60548ec5e6ab8771f574554920c620960aa46ca30808aef55ca4e92b2',         // use your sandbox app API key for development in the test environment
            username: 'sandbox',
            format: 'json'
        },
        pusher:{
            appId: '808353',
            key: '5f2f3ae5e4171e326f3f',
            secret: 'a3c402f0a3e3d243701f',
            cluster: 'us2',
            encrypted: true
        }
       }