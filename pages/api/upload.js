import dbConnect from '../../lib/dbConnect';
import User from '../../models/User';
import dotenv from "dotenv";

dotenv.config({ path: "config.env" })



export default async function handler(req, res) {
    const { method } = req;
    await dbConnect();
    switch (method) {
        case 'POST':
            try {
                console.log(req.body)
                const user = await User.findOne({ walletAddress: req.body.currentAccount });
                if (!user) {
                    res.status(400).json({ success: false, message: "User does not  exist" });
                    return;
                }
                user.profilePic = req.body.link;
                await user.save();
                console.log(user);
                res.status(200).json({ success: true, message: "Image uploaded succesfully", data: user });
            } catch (error) {
                console.error(error);
                res.status(500).json({ error: 'Internal server error' });
            }
            break;
        default:
            res.status(400).json({ success: false })
            break
    }

}
