const Profile = require("./profile.js");
const renderer = require("./renderer.js");
let student_profile = new Profile("barhoring");

//http.get('/', homeRoute);    
function home(request, response) {
    if(request.url == "/") {
        renderer.view("header", {}, response);
        renderer.view("search", {}, response);
        renderer.view("footer", {}, response);
        response.end();
    }
}

function user(request, response) {
    var username = request.url.replace('/', '');
    if(username.length > 0) {
        response.statusCode = 200;
        response.setHeader('Content-Type', 'text/plain');
        renderer.view("header", {}, response);

        // use profile
        let student_profile = new Profile(username);
        student_profile.on("end", function(profileJSON){
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

        student_profile.on("error", function(err){
            renderer.view("error", {error_msg: err.message}, response);
            renderer.view("search", {}, response);
            renderer.view("footer", {}, response);
            response.end();
        });     
    }
}

module.exports = {
    home,
    user
}