import * as APP_CONST from '../common/AppConst'
import quyens from '../datas/quyens.json';
var redux = require('redux');

var appState = {
    trangThaiSua: false,
    data: [],
    tmpData:[],
    resultFilter: '',
    quyens: quyens
}

var appProducer = (state=appState, action) => {
    switch (action.type) {
        case "DO_NOTHING":
            return {...state};

        case APP_CONST.STORE_SYNC_LOCAL_STORAGE:
            return {...state, data: action.data, tmpData: action.tmpData};

        case APP_CONST.STORE_UPDATE_EDIT_STATE:
            return {...state, trangThaiSua: action.trangThaiSua}
        
        case APP_CONST.STORE_UPDATE_SEARCH_FILTER:
            return {...state, tmpData: action.tmpData, resultFilter: action.resultFilter}

        case APP_CONST.STORE_ADD_USER:
        case APP_CONST.STORE_EDIT_USER:
        case APP_CONST.STORE_DELETE_USER:
            return {...state, data: action.data, tmpData: action.tmpData}

        default:
            return {...state}
    }
}
var AppStore = redux.createStore(appProducer);

AppStore.subscribe(() => {
    // console.log(AppStore.getState());
});

AppStore.dispatch({type: "DO_NOTHING"});
// store1.dispatch({type: "UPDATE_TEST1"});
// store1.dispatch({type: "UPDATE_TEST2", test2: "update tu ngoai"});

export default AppStore;