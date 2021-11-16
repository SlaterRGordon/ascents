import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String },
    id: { type: String },
    date: {
        type: Date,
        default: new Date(),
    }
});

export default mongoose.model("User", userSchema);