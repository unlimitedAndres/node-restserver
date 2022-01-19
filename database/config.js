const mongoose = require("mongoose");
require('colors');

const dbConnection = async() => {
    try {

        await mongoose.connect(process.env.MONGODB_CNN);

        console.log( 'Base de datos online'.blue );

    } catch (error) {
        console.log(error);
        throw new Error("Error en la base de datos");
    }
};

module.exports = {  
    dbConnection
};
