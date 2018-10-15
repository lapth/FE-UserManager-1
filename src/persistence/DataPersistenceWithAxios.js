var axios = require('axios');
const API_URL = "https://radiant-earth-41346.herokuapp.com/users";

class DataPersistenceWithAxios {
    constructor() {
        console.log("DataPersistenceWithAxios init");
    }
    
    addUser = (user, callBack) => {
        axios.post(API_URL, user)
        .then((res) => {
            callBack(res.data);
        })
        .catch((err) => {
            console.error(err);
        })
        .then(() => {
            // finally
        })
    }

    getAllUser = (callBack) => {
        axios.get(API_URL)
        .then((res) => {
            callBack(res.data);
        })
        .catch((err) => {
            console.error(err);
        })
        .then(() => {
            // finally
        })
    }

    getUser = (userId, callBack) => {
        axios.get(API_URL + '/' + userId)
        .then((res) => {
            callBack(res.data);
        })
        .catch((err) => {
            console.error(err);
        })
        .then(() => {
            // finally
        })
    }

    updateUser = (user, callBack) => {
        axios.put(API_URL, user)
        .then((res) => {
            callBack(res.data);
        })
        .catch((err) => {
            console.error(err);
        })
        .then(() => {
            // finally
        })
    }

    deleteUser = (userId, callBack) => {
        axios.delete(API_URL + '/' + userId)
        .then((res) => {
            callBack(res.data);
        })
        .catch((err) => {
            console.error(err);
        })
        .then(() => {
            // finally
        })
    }
}

// var user = {
//     _id: "1bb5fa30-cf59-11e8-878f-2d21cfe9c580",
//     hoTen: "Update User from UI",
//     tel: "11111",
//     quyen: 4
// };
// 
// dataPersAPI.addUser(user, (data) => {
//     console.log("call back with data: " + JSON.stringify(data));
// });
// dataPersAPI.getAllUser((data) => {
//     console.log("call back with data: " + JSON.stringify(data));
// });
// dataPersAPI.updateUser(user, (data) => {
//     console.log("call back with data: " + JSON.stringify(data));
// });
// dataPersAPI.deleteUser("d0bc62d0-d09d-11e8-b014-5d2f608c7ab5", (data) => {
//     console.log("call back with data: " + JSON.stringify(data));
// });

var dataPersAPI = new DataPersistenceWithAxios();
export default dataPersAPI;