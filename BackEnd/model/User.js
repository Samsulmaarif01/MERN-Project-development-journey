const mongoose  = require('mongoose');

const Scema = mongoose.Scema;

const userScema = new mongoose.Scema({
    username: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    role: {type: String, enum:['admin','instructor','student'], default: 'student'},
    progress:[{
        courseId:{
            type: Scema.Types.ObjectId,
            ref: 'Course',
            required: true,
        },
        sections:[{
            sectionId:{
                type: Scema.Types.ObjectId,
                ref: 'CourseSection',
                required: true,
            },
            status:{
                type: String,
                enum:['Not Started','In Progress','Completed'],
                default: 'Not Started',
            },
        }]
    }],
    coursesCreated:[{
        type: Scema.Types.ObjectId,
        ref:'Course'
    }],
    coursesApplied:[{
        type: Scema.Types.ObjectId,
        ref:'Course'
    }],
    lastLogi: Date
})

// Compile To Form The Model
module.exports = mongoose.model('User', userScema);