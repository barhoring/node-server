const Profile = require("./profile.js");
const renderer = require("./renderer.js");
const querystring = require('querystring');
let student_profile = new Profile("barhoring");

var headers = 'text/html';

//http.get('/', homeRoute);    
function home(request, response) {
    if (request.url == "/") {
        if (request.method.toLowerCase() == "get") {
            response.statusCode = 200;
            response.setHeader('Content-Type', headers);
            renderer.view("header", {}, response);
            renderer.viewStatic("style", {}, response);
            renderer.view("search", {}, response);
            renderer.view("footer", {}, response);
            response.end();
        }
        else {
            // get post data from body

            request.on('data', function (post_body) {
                // get post data from body
                var body = post_body.toString();
                var values = querystring.parse(body);
                // extract username
                response.statusCode = 303;
                response.setHeader('Location', '/' + values.username);
                //response.write(values.username);
                // redirect to /:username   
                response.end();
            });
        }

    }
}

function user(request, response) {
    if (!request.url.includes("style.css")) {
        console.log("haaa!");
        var username = request.url.replace('/', '');
        if (username.length > 0) {
            response.statusCode = 200;
            response.setHeader('Content-Type', headers);
            renderer.view("header", {}, response);
            renderer.viewStatic("style", {}, response);
            // use profile
            let student_profile = new Profile(username);
            student_profile.on("end", function (profileJSON) {
                var values = {
                    avatarUrl: profileJSON.gravatar_url,
                    username: profileJSON.profile_name,
                    badges: profileJSON.badges.length,
                    javascript: profileJSON.points.JavaScript,
                }
                renderer.view("profile", values, response);
                renderer.view("footer", {}, response);
                response.end();
            });

            student_profile.on("error", function (err) {
                renderer.view("error", { error_msg: err.message }, response);
                renderer.view("search", {}, response);
                renderer.view("footer", {}, response);
                response.end();
            });
        }
    }

}

function style(request, response) {
    if (request.url.includes('.css')) {
        response.statusCode = 200;
        response.setHeader('Content-Type', 'text/css');
        renderer.viewStatic('style', {}, response);
        response.end();
    }
}

module.exports = {
    home,
    user,
    style
}