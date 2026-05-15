import mongoose from 'mongoose';

const ReferralSchema = new mongoose.Schema({
    affiliateId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Affiliate',
        required: true,
    },
    referredUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null,
    },
    referredEmail: {
        type: String,
        default: null,
    },
    convertedAt: {
        type: Date,
        default: null,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model('Referral', ReferralSchema);
