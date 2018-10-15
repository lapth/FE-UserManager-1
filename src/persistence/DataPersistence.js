import {appDB} from './FirebaseConnect' ;

class DataPersistence {
    constructor() {   
        console.log('create DataPersistence');
    }

    registerDataChange = (callBack) => {
        // Auto call ON function when have data change in DB
        appDB.on('value', (datas) => {
            var appData = [];

            datas.forEach(element => {
                var tmpElm = element.val();
                var user = {};

                user.key = element.key;
                user.hoTen = tmpElm.hoTen;
                user.quyen = tmpElm.quyen;
                user.tel = tmpElm.tel;

                appData.push(user);
            });

            callBack(appData);
        })
    }

    addUser = (user) => {
        appDB.push(user);
    }

    getUser = (userId) => {
        appDB.child(userId);
    }

    updateUser = (user) => {
        appDB.child(user.key).update({
            hoTen: user.hoTen,
            quyen: user.quyen,
            tel: user.tel
        })
    }

    deleteUser = (userId) => {
        appDB.child(userId).remove();
    }
}


var dataPersistence = new DataPersistence();

export default dataPersistence;