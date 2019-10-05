const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let tempDate = new Date();
let curdate = tempDate.getFullYear() + '-' + (tempDate.getMonth()+1) + '-' + tempDate.getDate() +' '+ tempDate.getHours()+':'+ tempDate.getMinutes()+':'+ tempDate.getSeconds(); 

const accountSchema = new Schema({


    name: { 
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }, 
    email: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: curdate
    }
}); 

// eslint-disable-next-line no-undef
module.exports = Account = mongoose.model('accounts', accountSchema);