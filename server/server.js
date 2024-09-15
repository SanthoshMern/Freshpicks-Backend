const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const user = require('./Operations/User-Operations');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5555;
app.use(cors());
app.use('/uploads', express.static('uploads'));


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');  
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname); 
    }
});
const upload = multer({ storage: storage });


mongoose.connect("mongodb://127.0.0.1:27017/Freshpicks", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});


const formDataSchema = new mongoose.Schema({
    ItemName: {type:String, required:true},
    ItemQuantity: {type:String, required:true},
    Price: {type:String, required:true},
    Rating:{type: Number, default: 4.6,},
    file: {
        filename: String,
        path: String
    },
    submissionDate: {
        type: Date,
        default: Date.now
    }
});
const FormData = mongoose.model('Shopmarket', formDataSchema);


const newArrivalSchema = new mongoose.Schema({
    ItemName: {type:String, required:true},
    ItemQuantity: {type:String, required:true},
    Price: {type:String, required:true},
    Rating:{type: Number, default: 4.6,},
    file: {
        filename: String,
        path: String
    },
    submissionDate: {
        type: Date,
        default: Date.now
    }
});
const NewArrival = mongoose.model('Newarrival', newArrivalSchema);

const trendingnowSchema = new mongoose.Schema({
    ItemName: {type:String, required:true},
    ItemQuantity: {type:String, required:true},
    Price: {type:String, required:true},
    Rating:{type: Number, default: 4.6,},
    file: {
        filename: String,
        path: String
    },
    submissionDate: {
        type: Date,
        default: Date.now
    }
});
const Trendingnow = mongoose.model('Trendingnow', trendingnowSchema);


const featuredSchema = new mongoose.Schema({
    ItemName: {type:String, required:true},
    ItemQuantity: {type:String, required:true},
    Price: {type:String, required:true},
    Rating:{type: Number, default: 4.6,},
    file: {
        filename: String,
        path: String
    },
    submissionDate: {
        type: Date,
        default: Date.now
    }
});
const Featured = mongoose.model('Featured', featuredSchema);


const productlistSchema = new mongoose.Schema({
    ItemName: {type:String, required:true},
    ItemQuantity: {type:String, required:true},
    Price: {type:String, required:true},
    Rating:{type: Number, default: 4.6,},
    file: {
        filename: String,
        path: String
    },
    submissionDate: {
        type: Date,
        default: Date.now
    }
});
const Productlist = mongoose.model('Productlist', productlistSchema);
////-----/////


const signinschema = new mongoose.Schema({
  Password:{type: String, required:true,unique:true},
  Email:{type:String, required:true, unique:true}
});

const registerSchema = new mongoose.Schema({
  firstName : { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true, },
  mobileNumber:{type: String, required: true },
  Password:{type: String, required:true,unique:true},
  confirmPassword:{type: String, required:true,unique:true},
  Email:{type:String, required:true, unique:true}
});

const Register = mongoose.model("Register", registerSchema);
const Signin = mongoose.model("Signin", signinschema);

module.exports = {
  Registerr: Register,
  Signinn: Signin
};



app.post('/Shopmarket', upload.single('file'), async (req, res) => {
    
    const newFormData = new FormData({
        ItemName: req.body.ItemName,
        ItemQuantity: req.body.ItemQuantity,
        Price: req.body.Price,
        file: {
            filename: req.file.filename,
            path: req.file.path
        }
    });

    try {
        await newFormData.save();
        res.json({ message: 'Form data saved successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error saving form data' });
    }
});


app.get('/Shopmarket', async (req, res) => {
    try {
        const newFormData = await FormData.find().exec();
        res.status(200).json(newFormData);
    } catch (error) {
        console.error('Error fetching form data:', error);
        res.status(500).json({ error: 'Failed to fetch form data' });
    }
});
////---------/////

app.post('/Newarrival', upload.single('file'), async (req, res) => {
    
    const newArrival = new NewArrival({
        ItemName: req.body.ItemName,
        ItemQuantity: req.body.ItemQuantity,
        Price: req.body.Price,
        file: {
            filename: req.file.filename,
            path: req.file.path
        }
    });

    try {
        await newArrival.save();
        res.json({ message: 'Form data saved successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error saving form data' });
    }
});


app.get('/Newarrival', async (req, res) => {
    try {
        const newArrival = await NewArrival.find().exec();
        res.status(200).json(newArrival);
    } catch (error) {
        console.error('Error fetching form data:', error);
        res.status(500).json({ error: 'Failed to fetch form data' });
    }
});
////-----///


app.post('/Trendingnow', upload.single('file'), async (req, res) => {
    
    const trendingnow = new Trendingnow({
        ItemName: req.body.ItemName,
        ItemQuantity: req.body.ItemQuantity,
        Price: req.body.Price,
        file: {
            filename: req.file.filename,
            path: req.file.path
        }
    });

    try {
        await trendingnow.save();
        res.json({ message: 'Form data saved successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error saving form data' });
    }
});


app.get('/Trendingnow', async (req, res) => {
    try {
        const trendingnow = await Trendingnow.find().exec();
        res.status(200).json(trendingnow);
    } catch (error) {
        console.error('Error fetching form data:', error);
        res.status(500).json({ error: 'Failed to fetch form data' });
    }
});
////---/////


app.post('/Featured', upload.single('file'), async (req, res) => {
    
    const featured = new Featured({
        ItemName: req.body.ItemName,
        ItemQuantity: req.body.ItemQuantity,
        Price: req.body.Price,
        file: {
            filename: req.file.filename,
            path: req.file.path
        }
    });

    try {
        await featured.save();
        res.json({ message: 'Form data saved successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error saving form data' });
    }
});


app.get('/Featured', async (req, res) => {
    try {
        const featured = await Featured.find().exec();
        res.status(200).json(featured);
    } catch (error) {
        console.error('Error fetching form data:', error);
        res.status(500).json({ error: 'Failed to fetch form data' });
    }
});
///-----////

app.post('/Productlist', upload.single('file'), async (req, res) => {
    
    const productlist = new Productlist({
        ItemName: req.body.ItemName,
        ItemQuantity: req.body.ItemQuantity,
        Price: req.body.Price,
        file: {
            filename: req.file.filename,
            path: req.file.path
        }
    });

    try {
        await productlist.save();
        res.json({ message: 'Form data saved successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error saving form data' });
    }
});


app.get('/Productlist', async (req, res) => {
    try {
        const productlist = await Productlist.find().exec();
        res.status(200).json(productlist);
    } catch (error) {
        console.error('Error fetching form data:', error);
        res.status(500).json({ error: 'Failed to fetch form data' });
    }
});

app.post('/Register', upload.single('file'), async (req, res) => {
    
    const register = new Register({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        mobileNumber: req.body.mobileNumber,
        Email: req.body.Email,
        Password: req.body.Password,
        confirmPassword: req.body.confirmPassword,
    });

    try {
        await register.save();
        res.json({ message: 'Form data saved successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error saving form data' });
    }
});


// app.post('/user/Register',user.Register)
// app.post('/resetpass',user.resetpass)

app.get('/Register', async (req, res) => {
    try {
        const register = await Register.find().exec();
        res.status(200).json(register);
    } catch (error) {
        console.error('Error fetching form data:', error);
        res.status(500).json({ error: 'Failed to fetch form data' });
    }
});


app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});
