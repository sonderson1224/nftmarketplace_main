import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    description: { type: String, default: null },
    website: { type: String, default: null },
    facebookUrl: { type: String, default: null },
    twitterUrl: { type: String, default: null },
    instagramUrl: { type: String, default: null },
    profilePic: { type: String, default: null },
    walletAddress: { type: String, required: true, unique: true },
})

const User = mongoose.models.User || mongoose.model('User', UserSchema);
export default User;
// module.exports = mongoose.models.User || 