/**
 * @description: For Setting Up Node Environment
 */

module.exports = (function () {
    console.log("Env: ", process.env.NODE_ENV);
    switch (process.env.NODE_ENV) {
        case "development":
            return {
                //
            };
        case "staging":
            return {
            //
            };
        case "production":
            return {
            //
            };
        case "server":      
            return {
                //
            };
        default:
            console.log(
            "No Env Provided. So using 'default' configuration (Development)"
            );
            return {
            database: "mongodb://localhost:27017/testgame",
            databaseAuth: false,
            port: 7127
            };
    }
  })();
  
  