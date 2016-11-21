/**
 * Created by ievgen.garlinskyi on 21.11.2016.
 */
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/tasks');

var Schema = mongoose.Schema;
var Tasks = new Schema({
    project: String,
    description: String
});
mongoose.model('Task', Tasks);

var Task = mongoose.model('Task');

/*var task = new Task();
task.project = 'Bikeshed';
task.description = 'Paint that bikeshed red.';
task.save(function(err){
    if(err) throw err;
    console.log('Task saved');
});*/

Task.find({'project': 'Bikeshed'}, function(err, tasks){
    for(var i = 0; i < tasks.length; i++){
        console.log('ID:' + tasks[i]._id);
        console.log(tasks[i].description);
    }
});

/*Task.update({_id: '5832d9ade47f38282449b135'},
    {description: 'Paint that bikeshed green.'},
    {multi: false},
    function(err, rows_updated){
        if(err) throw err;
        console.log('Updated');
    }
);*/

//mongoose.disconnect();