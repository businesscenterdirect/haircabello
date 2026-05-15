import mongoose from 'mongoose';

const CreativeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    fileUrl: {
        type: String,
        required: true,
    },
    fileType: {
        type: String,
        enum: ['banner', 'link', 'other'],
        default: 'other',
    },
    uploadedAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model('Creative', CreativeSchema);
