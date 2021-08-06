import Express from "express";
import service from "./service.js";

const myApp = new Express();
const myPort = 3000;
const db = [];

function checkingExistId (req, res, next) {
    db.some(el => {
        if (el.id == req.query.id) {
            next("Id is already exists");
        }
    })
    next();
}

myApp.get('/allUsers', (req, res) => {
    res.send(service.readUsers(db));
})

myApp.post('/allUsers', checkingExistId, (req, res) => { // localhost:3000/addUser?firstName=Ann&lastName=Smith&id=1
    const query = req.query;
    const user = { firstName: query.firstName, lastName: query.lastName, id: query.id };
   
    service.addUser(user, db);
    res.send("user added.");
})

myApp.put('/allUsers/:id',  (req, res) => { // localhost:3000/updateUser/1?firstName=Bob&lastName=Johnson
    const query = req.query;
    const params = req.params;
    const updatedInfo = { firstName: query.firstName, lastName: query.lastName, id: params.id };

    service.updateUser(params.id, updatedInfo, db)
    res.send("user changed.");
})

myApp.delete("/allUsers/:id", (req, res) => { //localhost:3000/deleteUser/0
    service.deleteUser(req.params.id, db);
    res.send("user deleted.");
})

myApp.listen(myPort);