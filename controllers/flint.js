/**
 * Code to read python script
 */
const _ = require('lodash');
const spawn = require('child_process').spawn;
let py, dataString, input_data, prob, length, info;

exports.getHello = (bot, trigger) => {
    bot.say("Hello %s! How may i help you today. To know list of commands you can type <b>Help</b>.", trigger.personDisplayName);
};

exports.getHelp = (bot, trigger) => {
    let str = "Please find below a list of commands you can use: <br/>" +
        "- Search \<Query\>.";

    bot.say(str);
};

exports.getSearch = (bot, trigger) => {
  py = spawn('python', ['./document_prediction.py']);
  dataString = '';
  prob = [];
  length = -1;
  info = [];

  input_data = _.drop(trigger.args);
  input_data = _.join(input_data, ' ');

  let inputData = JSON.stringify([input_data]);
  main(inputData)
    .then(result => {

            result = JSON.parse(result);

            _.forEach(result, function(value, key) {
                prob.push(value[1]);
                info.push(value[0]);
            });
            var length = (_.uniq(prob)).length
            if(length == 1){
                bot.say("Sorry i could not find any relevant information");
            }else{
                title = 'Please find below a list of top 5 results i found: \n <br/><br/> - '
                result = _.join(info, '<br/><br/> - ');
                result = title + result;
                bot.say(result);
            }
        })
};

const main = (inputData) => {
  return new Promise(function(resolve, reject){

    py.stdout.on('data', function(data){
        dataString += data.toString();
    });
    py.stdout.on('end', function(){
        console.log(dataString);
        resolve(dataString);
    });
    py.stdout.on('error', function(){
        console.log('error');
        reject('error');
    });

    py.stdin.write(inputData);
    py.stdin.end();
  })
}