const Express = require("express");

const myApp = new Express();
const myPort = 3000;

const db = [
    { firstName: 'Ann', lastName: 'Smith', id: 1 }
];

function checkingExistId(req, res, next) {
    db.some(el => {
        if (el.id == req.query.id) {
            next("Id is already exists");
        }
    })
    next();
}
myApp.get('/', (req, res) => {                            // localhost:3000/
    res.send(`Users: ${db.map(val => JSON.stringify(val))} `);
})

myApp.get('/getUser/:id', (req, res) => {                 // localhost:3000/getUser/3
    db.forEach(element => {
        if(req.params.id == element.id) {
            res.send(`User ${JSON.stringify(element)}`);
        }
    });
    res.send("Nothing Found.");
})

myApp.post('/addUser', checkingExistId, (req, res) => {   // localhost:3311/addUser?firstName=Bob&lastName=Johnson&id=5
    const query = req.query;
    const user = { firstName: query.firstName, lastName: query.lastName, id: Number(query.id) };
    db.push(user);
    res.send("User added.");
})

myApp.put('/updateUser/:id', checkingExistId, (req, res) => { // localhost:3311/updateUser/0?firstName=Alex&lastName=Johnson&id=5
    const query = req.query;
    const params = req.params;
    const updatedInfo = { firstName: query.firstName, lastName: query.lastName, id: query.id };
    db.forEach(element => {
        if(params.id == element.id) {
            db.splice(params.id, 1, updatedInfo);
        }
     });
    res.send("user changed.");
})

myApp.delete("/deleteUser/:id", (req, res) => { // localhost:3311/deleteUser/0
    db.forEach(element => {
        if(req.params.id == element.id) db.splice(element.id, 1);
    })
    res.send("User deleted.");
})

myApp.listen(myPort);