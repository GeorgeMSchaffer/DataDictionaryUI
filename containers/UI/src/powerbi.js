const axios = require('axios');

axios.request({
    method: 'POST',
    url: "https://login.microsoftonline.com/common/oauth2/token/?grant_type=password",
    headers: {
        "Content-Type": "application/x-www-form-urlencoded"
    },
    data: {
   "grant_type" : "client_credentials",
    "scope" : "https://graph.microsoft.com/.default",
    "client_id":"46dcb661-7404-4320-8fe2-a1085d4d50a5",
    "client_secret":"X3yjT_Kryf0d6gSA-tHA66obo6W6r04.e-",
     "scope": "user.read%20openid%20profile%20offline_acces"
    }

}).then(res => {
    console.log('GOT RESPONSE', res);
}).catch(err => {
    console.error('ERROR', err.toJSON());
})
