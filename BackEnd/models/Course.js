const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const coursesSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true},
    difficulty: { type: String, required: true },
    duration: { type: String, required: true },

    section: [{
        type: Schema.Types.ObjectId,
        ref: 'CourseSection'
    }],
    user: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    student: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
}, { timestamps: true }); 

module.exports = mongoose.model('Course', coursesSchema);
