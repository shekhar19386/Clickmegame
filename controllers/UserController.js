var UserModel = require('../models/user');
var UserScoreboardModel = require('../models/scoreboard');
var UserSessionModel = require('../models/usersession');

const mongoose = require('mongoose');

class UserController {
    constructor() {}

    validateUserSession(req, res){
        try{
            if(req.session.secret == '' || req.session.secret == undefined){                        
                return false
            }else{
                return true;
            }
        }catch(error){
            console.error('in catch part --', error);
            return error.message;
        }
    }

    async saveUser(req, res) {                                
        try{            
          
            let userresult = await UserModel.create({'userName':req.body.uname});             
            let sessionresult = await UserSessionModel.create({'userId':userresult._id});

            req.session.secret = sessionresult._id;
            req.session.usersession = sessionresult;
            req.session.userresult = userresult;                    
            return {'userdata':userresult, 'usersessiondata':sessionresult};
        }catch(error){
            console.error('in catch part --', error);
            return error.message;
        }
    } 
    
    async saveUserScore(req, res) {                                
        try{                           
            let result = UserScoreboardModel.create({'userId':req.session.userresult._id, 'userScore':req.body.noofclicks}); 
            return result;
        }catch(error){
            console.error('in catch part --', error);
            return error.message;
        }
    }
    
    async getAllUsers(req, res){
        try{                        
            // await UserModel.aggregate([
            //     { '$match': { }},
            //     {
            //         $lookup: {
            //             from: "usersscoreboards",
            //             localField: "_id",
            //             foreignField: "userId",
            //             as: "scoredata"
            //         }            
            //     }
            //     ], function(err, result) {
            //     if (err) {
            //         return JSON.stringify(err);
            //     } else {
            //         console.log('getAllUsers result ----',result);                    
            //         res.render('pages/lobby', {'pagetitle':'Lobby for all', 'pageslug': 'lobby', 'allusersdata':result});
            //     }
            // }); 

            await UserScoreboardModel.aggregate([
                { '$match': {} },
                {
                    $lookup: {
                        from: "gameusers",
                        localField: "userId",
                        foreignField: "_id",
                        as: "userdata"
                    }            
                },
                { '$sort': {'createdAt': -1}},
                ], function(err, result){
                if (err) {
                        return JSON.stringify(err);
                    } else {
                        console.log('getScoreBoardData result ----',result);
                        // return JSON.stringify(result);
                        res.render('pages/lobby', {'pagetitle':'Lobby for all', 'pageslug': 'lobby', 'allusersdata':result});
                    }
            });   

        }catch(error){
            console.error('in catch part --', error);        
            return error.message;
        }
    }

    async getScoreBoardData(req, res) {                                
        try{                                              
            await UserScoreboardModel.aggregate([
                { '$match': {'userId':  new mongoose.mongo.ObjectId(req.session.userresult._id)} },
                {
                    $lookup: {
                        from: "gameusers",
                        localField: "userId",
                        foreignField: "_id",
                        as: "userdata"
                    }            
                },
                { '$sort': {'createdAt': -1}},
                ], function(err, result){
                if (err) {
                        return JSON.stringify(err);
                    } else {
                        console.log('getScoreBoardData result ----',result);
                        // return JSON.stringify(result);
                        res.render('pages/scoreboard', {'pagetitle':'Score Board', 'pageslug': 'scoreboard', 'scoreboarddata': result});                        
                    }
            });            
        }catch(error){
            console.error('in catch part --', error);
            return error.message;
        }
    }

    async logoutUser(req, res){
        try{
            req.session.secret = "";
            req.session.usersession = "";
            req.session.userresult = "";            
            res.status(200).redirect('/');
        }catch(error){
            console.error('in catch part --', error);
            return error.message;
        }
    }
}

module.exports = UserController;
