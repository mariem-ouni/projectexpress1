const express =require("express") 

const app = express()
 
const PORT = 5000 
// Middleware pour vérifier les heures de travail
const workHoursMiddleware = (req, res, next) => {
    const currentTime = new Date ();
    const day = currentTime.getDay();
    const hour = currentTime.getHours();

    if (day >= 1 && day <= 5 && hour >= 9 && hour < 17) {
        next()
    } else {
        res.status(403).send('L\'application est uniquement disponible pendent les heures de travail.');
    }
};
app.use (workHoursMiddleware )
//const userRouter = require("./routes/userRoutes")

// router
app.use(express.static(__dirname+"/myapp/views"));

app.get('/', function(req, res){
    res.sendFile(__dirname+"/myapp/views/home.html")
});

app.get('/services', function(req, res){
    res.sendFile(__dirname+"/myapp/views/services.html")
});

app.get('/contact', function(req, res){
    res.sendFile(__dirname+"/myapp/views/contact.html")
});

app.listen(PORT, (err) => {
    err ? console.log(err)
        :console.log(`server is running on port ${PORT}`)
})