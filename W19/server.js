const express = require('express');
const mongoose = require('mongoose');
const Student = require('./models/student');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/student', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Insert initial data ONCE

// Student.insertMany([
//     { Name: "ABC", Roll_No: 111, WAD_Marks: 25, CC_Marks: 25, DSBDA_Marks: 25, CNS_Marks: 25, AI_Marks: 25 },
//     { Name: "XYZ", Roll_No: 112, WAD_Marks: 18, CC_Marks: 22, DSBDA_Marks: 30, CNS_Marks: 20, AI_Marks: 21 },
//     { Name: "LMN", Roll_No: 113, WAD_Marks: 28, CC_Marks: 35, DSBDA_Marks: 32, CNS_Marks: 33, AI_Marks: 29 },
//     { Name: "DEF", Roll_No: 114, WAD_Marks: 10, CC_Marks: 15, DSBDA_Marks: 12, CNS_Marks: 19, AI_Marks: 14 },
//     { Name: "PQR", Roll_No: 115, WAD_Marks: 40, CC_Marks: 41, DSBDA_Marks: 45, CNS_Marks: 39, AI_Marks: 43 }
// ]).then(() => console.log("Inserted")).catch(console.error);


// d) Show all
app.get('/', async (req, res) => {
    const students = await Student.find();
    res.render('students', { count: students.length, students });
});

// e) Students with DSBDA > 20
app.get('/dsbda', async (req, res) => {
    const students = await Student.find({ DSBDA_Marks: { $gt: 20 } });
    res.render('students', { count: students.length, students });
});

// f) Update student marks (+10)
app.get('/update/:name', async (req, res) => {
    await Student.updateOne(
        { Name: req.params.name },
        { $inc: {
            WAD_Marks: 10,
            CC_Marks: 10,
            DSBDA_Marks: 10,
            CNS_Marks: 10,
            AI_Marks: 10
        }}
    );
    res.redirect('/');
});

// g) Students with >25 in all subjects
app.get('/topper', async (req, res) => {
    const students = await Student.find({
        WAD_Marks: { $gt: 25 },
        CC_Marks: { $gt: 25 },
        DSBDA_Marks: { $gt: 25 },
        CNS_Marks: { $gt: 25 },
        AI_Marks: { $gt: 25 }
    });
    res.render('students', { count: students.length, students });
});

// h) Students with <40 in Maths (WAD) and Science (CNS)
app.get('/low', async (req, res) => {
    const students = await Student.find({
        WAD_Marks: { $lt: 40 },
        CNS_Marks: { $lt: 40 }
    });
    res.render('students', { count: students.length, students });
});

// i) Remove student by name
app.get('/delete/:name', async (req, res) => {
    await Student.deleteOne({ Name: req.params.name });
    res.redirect('/');
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
