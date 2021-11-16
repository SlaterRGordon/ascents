import mongoose from 'mongoose';

const gradeSchema = mongoose.Schema({
    id: { type: String },
    grade: { type: String },
    gradeValue: { type: Number },
    date: {
        type: Date,
        default: new Date(),
    }
});

export default mongoose.model("Grade", gradeSchema);