import mongoose from 'mongoose';

const climbSchema = mongoose.Schema({
    id: { type: String },
    name: { type: String },
    grade: { type: String },
    area: { type: String },
    description: { type: String }
});

export default mongoose.model("Climb", climbSchema);