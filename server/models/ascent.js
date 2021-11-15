import mongoose from 'mongoose';

const ascentSchema = mongoose.Schema({
    id: { type: String },
    climbId: { type: String },
    userId: { type: String },
    description: { type: String },
    grade: { type: String },
    quality: { type: Number }
});

export default mongoose.model("Ascent", ascentSchema);