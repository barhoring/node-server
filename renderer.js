var fs = require("fs");

function mergeValues(values, content){
    //console.log(content);
    // cycle over these keys
    for(var key in values) {
        // replace all key {{key}} with the values from the values object
        console.dir({'key': key, 'values[key]': values[key]});
        content = content.replace('{{' + key + '}}', values[key]);
        
    }
    //console.log(content);
    return content;
}

function view(template_name, values, response){
    // read from th template files
    var file_content = fs.readFileSync('./views/' + template_name + '.html', {encoding: 'utf8'});
    /*console.log('typeof (file_content)' + typeof(file_content));
    /*console.log(file_content);*/
    console.log(values);
    console.log('end values');
    file_content = mergeValues(values, file_content);

    
    // insert value into the content

    // write content to response
    response.write(file_content);
}

module.exports = {
    view
}