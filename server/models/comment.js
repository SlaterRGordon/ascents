import mongoose from 'mongoose';

const commentSchema = mongoose.Schema({
    id: { type: String },
    ascentId: { type: String },
    userId: { type: String },
    comment: { type: String },
    date: {
        type: Date,
        default: new Date(),
    }
});

export default mongoose.model("Comment", commentSchema);