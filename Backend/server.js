const http=require("http");
const app=require("./app");
const port=process.env.PORT || 3000;
const server=http.createServer(app);
const {initializeSocket}=require("./socket");



server.listen(port,()=>{
    console.log(`server is Running on port ${port}`)
});
initializeSocket(server);