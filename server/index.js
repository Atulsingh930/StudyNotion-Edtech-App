const express = require('express');
const app = express();
const {dbConnect} = require('./config/database');
const {cloudConnect} = require('./config/cloudinary');
const useCourse = require('./routes/Courses');
const usePayments = require('./routes/Payments');
const useProfile = require('./routes/Profile');
const useUser = require('./routes/User');
const auth = require('./middleware/auth')
const cors = require('cors');
const cookieParser = require('cookie-parser');

require('dotenv').config();
app.use(express.json());
const fileUpload = require('express-fileupload');
app.use(cookieParser());
// app.use(auth)


const PORT = process.env.PORT || 4000;

app.use(
    fileUpload({
        useTempFiles : true,
        tempFileDir : '/tmp/'
    })
)
    

dbConnect();
cloudConnect();

app.use(
    cors({
        origin : "http://localhost:3000",
        credentials : true
    })
)
app.use('/api/v1/course', useCourse);
app.use('/api/v1/payments', usePayments);
app.use('/api/v1/profile', useProfile);
app.use('/api/v1/auth', useUser);

app.listen(PORT, ()=>{
    console.log("Server is live");
})