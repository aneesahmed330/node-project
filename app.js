const http = require('http');
const server =http.createServer((req, res) => {
    if(req.url === '/'){
        res.write('<h1>Welcome page</h1>');
        res.end();
    }
    if(req.url === '/api/courses' ){
    //    grab all courses
        const courses = ['A' , 'B' , 'C']
        res.write(JSON.stringify(courses))
        res.end();
    }
})
const PORT = 1337
const HOST = '127.0.0.1'
server.listen(PORT , HOST,()=> {
    console.log(`server is listening on the ${PORT}`)
})