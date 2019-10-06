const mongoose = require('mongoose');
//const Schema = mongoose.Schema;

const stationSchema = new mongoose.Schema({
    station_name:{ 
        type: String
    },
    station_city: {
        type: String
    }, 
    station_fueltypes: {
        type: Array
    }
/*},{
    collection: 'business' */
}); 

// eslint-disable-next-line no-undef
module.exports = Station = mongoose.model('stations', stationSchema);