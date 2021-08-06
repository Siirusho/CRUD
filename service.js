class service{
    readUsers = arr => {
        return `USERS:
        ${ arr.length === 0 ? "" : arr.map(val => JSON.stringify(val)) }`;
    }
     addUser=(user ,arr)=> arr.push(user);

     updateUser=(id, updatedInfo, arr)=> {
        arr.forEach(element => {
            if(id == element.id) arr.splice(id-1, 1, updatedInfo);
        });
    }
     deleteUser=(id, arr)=> {
        arr.forEach(element => {
            if(id == element.id) arr.splice(id, 1);
        });
    }
}
const myservice = new service()
export default myservice ;