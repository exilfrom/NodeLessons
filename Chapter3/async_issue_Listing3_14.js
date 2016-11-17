/**
 * Created by Odin on 16.11.2016.
 */
function asyncFunction(callback){
    setTimeout(callback, 200);
}

var color = 'blue';

asyncFunction(function(){
    console.log('The color is ' + color);
});

color = 'green';


function asyncFunction2(callback){
    setTimeout(callback, 200);
}

var color2 = 'blue';
(function(color){
    asyncFunction(function(){
        console.log('The color is ' + color);
    });
})(color2);

color2 = 'green';