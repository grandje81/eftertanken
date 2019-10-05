const mongoose = require('mongoose');
//const Schema = mongoose.Schema;

const businessSchema = new mongoose.Schema({
    person_name:{ 
        type: String
    },
    business_name: {
        type: String
    }, 
    business_gst_number: {
        type: Number
    }
/*},{
    collection: 'business' */
}); 

// eslint-disable-next-line no-undef
module.exports = Business = mongoose.model('business', businessSchema);