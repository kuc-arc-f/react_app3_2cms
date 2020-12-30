// LibAuth
import firebase from 'firebase'
//
export default {
    valid_auth:async function(firebase){
        await firebase.auth().onAuthStateChanged(function(user) {
            var ret = false
            if (user) {
//                console.log("#Auth-OK");
                return true
            } else {
                console.log('#no-User');
                return ret
            }
        })         
    },


}
