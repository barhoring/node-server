// problem
/* simple code to get badges and js points from a web browser */

// solution
/* use nodejs to perform the profile lookup and serve out templates via http */

// create a web server

const http = require('http');
var router = require("./router.js")

const hostname = '127.0.0.1';
const port = 1337;



const server = http.createServer((request, response) => {
    router.home(request, response);
    router.user(request, response);
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});