/**
 * Created by Odin on 16.11.2016.
 */
/*setTimeout(function() {
    console.log('I execute first.');
    setTimeout(function() {
        console.log('I execute next.');
        setTimeout(function() {
            console.log('I execute last.');
        }, 100);
    }, 500);
}, 1000);*/
// same as previous

var flow = require('nimble');

flow.series([
    function(callback){
        setTimeout(function(){
            console.log('I execute first.');
            callback();
        },1000);
    },
    function(callback){
        setTimeout(function(){
            console.log('I execute next.');
            callback();
        },500);
    },
    function(callback){
        setTimeout(function(){
            console.log('I execute last.');
            callback();
        },100);
    }
]);
