import mongoose from 'mongoose';

const gradeSchema = mongoose.Schema({
    id: { type: String },
    grade: { type: String },
    value: { type: Number }
});

export default mongoose.model("Grade", gradeSchema);