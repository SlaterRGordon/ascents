import mongoose from 'mongoose';

const gradeSchema = mongoose.Schema({
    id: { type: String },
    grade: { type: String },
    gradeValue: { type: Number }
});

export default mongoose.model("Grade", gradeSchema);