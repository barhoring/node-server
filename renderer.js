var fs = require("fs");

function view(template_name, values, response){
    // read from th template files
    var file_content = fs.readFileSync('./views/' + template_name + '.html');
    // insert value into the content

    // write content to response
    response.write(file_content);
}

module.exports = {
    view
}