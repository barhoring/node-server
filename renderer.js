var fs = require("fs");

function mergeValues(values, content){
    //console.log(content);
    // cycle over these keys
    for(var key in values) {
        // replace all key {{key}} with the values from the values object
        content = content.replace('{{' + key + '}}', values[key]);
        
    }
    //console.log(content);
    return content;
}

function view(template_name, values, response){
    // read from th template files
    var file_content = fs.readFileSync('./views/' + template_name + '.html', {encoding: 'utf8'});
    // insert value into the content
    file_content = mergeValues(values, file_content);
    // write content to response
    response.write(file_content);
}

function viewStatic(template_name, values, response){
    var file_content = fs.readFileSync('./views/' + template_name + '.css', {encoding: 'utf8'});
    // write content to response
    response.write(file_content);
    
}

module.exports = {
    view,
    viewStatic
}