// problem
/* simple code to get badges and js points from a web browser */

// solution
/* use nodejs to perform the profile lookup and serve out templates via http */

// create a web server

const http = require('http');

const hostname = '127.0.0.1';
const port = 1337;

const server = http.createServer((request, response) => {
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/plain');
    setInterval(function() {
        response.write(new Date() + "\n");
    }, 1000);
    //response.end('Hello Bar\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});


// handle the http route GET / and POST /
    // if GET && url == '/' return show search
    // elseif POST $$ url == '/' redirect to /:{username}

// handle http route for GET /:{username}
    // if url == '/...'
        // get json from treehouse
        // on the end 
            // show the profile
        // on error 
            // show error

// function that handles reading of files and merge in value
    // read from file and get a string
    // merge values into strings
 