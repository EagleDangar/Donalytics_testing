const express = require('express');
const app = express();
const path = require('path');

const app = express();

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist'))
// const stripe = require("stripe")(
//     "sk_test_xtz7vzUNDhyFM1leNDKmLLAW"
//     );
//     app.use('*', (req, res, next) => {
//         let allowedOrigins = ['http://localhost:4200', 'http://localhost:5000'];
//         let origin = req.headers.origin;
//         if (allowedOrigins.indexOf(origin) > -1) {
//         console.log(origin);
//         res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200', 'http://localhost:5000');
//         }
//         res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
//         res.set('Access-Control-Allow-Credentials', 'true');
//         res.set('Access-Control-Allow-Methods', "GET,POST,PUT,OPTIONS,DELETE");
//         next();
//         });
//     app.get('/allCharges', function (req, res) {
//     console.log('hello');
    
//     var meta_data = [];
//     var time_data = [];
//     var amount = [];
//     var last_id = undefined;
//     function paginateCharges(last_id){
//             var req_params = { limit : 100}
//             if(last_id!== undefined){
//                 req_params.starting_after = last_id
//             }
        
//             stripe.charges.list(
//             req_params,
//             function(err, charges) {
//                 // console.log(charges);
//             // res.send(charges);
//             // Do something with the returned values
//                 for (i = 0; i < charges.data.length; i++){
//                     amount.push(charges.data[i].amount/100)
//                     meta_data.push(charges.data[i].metadata);
//                     time_data.push(charges.data[i].created * 1000);
//                     console.log(charges.data[i].created * 1000);
//                 }
//                 // Check for more
//                 if (charges.has_more) {
//                     paginateCharges(charges["data"][charges["data"].length - 1].id);
//                 }
//                 else{
//                     var x = {};
//                     x.md = meta_data;
//                     x.amount = amount;
//                     x.td = time_data;
//                     res.send(x);
//                 }
//             }
//         )}
//         paginateCharges(last_id);

//     });
    app.listen(process.env.PORT || 8080, () =>
    console.log('server on port 8080')
    )