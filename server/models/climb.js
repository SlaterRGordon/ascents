import mongoose from 'mongoose';

const climbSchema = mongoose.Schema({
    id: { type: String },
    name: { type: String },
    grade_value: { type: String },
    area_value: { type: String },
    description: { type: String },
    quality: { type: Number },
    date: {
        type: Date,
        default: new Date(),
    }
});

export default mongoose.model("Climb", climbSchema);