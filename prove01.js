const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) =>{
    //onsole.log(req.url, req.method, req.headers);
    const url = req.url;
    if(url === '/'){
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        //res.write('<head>Assignment 1<head>');
        res.write('<body><h1>Assingment 1</h1>');
        res.write('<form action="/create-user" method="POST"><input type="text" name="username"><button type="submit">Send</button></form>')
        res.write('</body></html>');    
        return res.end();
    }

    if(url === '/create-user'){
        const body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        });
        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            console.log(parsedBody.split('=')[1]);
        });
        res.statusCode= 302;
        res.setHeader('Location', '/');
        res.end();
    }

    if(url === '/users'){
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        //res.write('<head><tittle>Assignment 1<head><tittle>');
        res.write('<body><ul><li>User 1</li><li>User 2</li><li>User 3</li><li>User 4</li></ul>');

        res.write('</body></html>');
        return res.end();
    }
});

server.listen(3000);