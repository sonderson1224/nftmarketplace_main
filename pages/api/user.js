

import dbConnect from '../../lib/dbConnect'
import User from '../../models/User';
import toast from 'react-hot-toast';
import * as yup from 'yup';

const validationSchema = yup.object().shape({
    firstName: yup.string().required('First name is required'),
    lastName: yup.string().required('Last name is required'),
    email: yup.string().email('Invalid email address').required('Email is required'),
    description: yup.string().required('Description is required'),
    website: yup.string().url('Invalid website URL').required('Website is required'),
    facebookUrl: yup.string().url('Invalid Facebook URL'),
    twitterUrl: yup.string().url('Invalid Twitter URL'),
    instagramUrl: yup.string().url('Invalid Instagram URL'),
});

export default async function handler(req, res) {
    const { method } = req

    await dbConnect();

    switch (method) {
        case 'GET':
            if (req.query.currentAccount) {
                try {
                    const user = await User.findOne({ walletAddress: req.query.currentAccount });
                    if (!user) return res.status(400).json({ success: false, message: "Please fill in your details" })
                    return res.status(200).json({ success: true, data: user, message: "User succesfully fetched" })
                } catch (error) {
                    toast.error(`Error fetching user...${error.message}`)
                    res.status(400).json({ success: false })
                }
            } else {
                try {
                    const users = await User.find({})
                    res.status(200).json({ success: true, data: users })
                } catch (error) {
                    toast.error(`Error fetching user...${error.message}`)
                    res.status(400).json({ success: false })
                }
            }

            break
        case 'POST':
            try {
                console.log("then", req.body);
                await validationSchema.validate(req.body, { abortEarly: false });
                const user = await User.findOne({
                    $or: [
                        { walletAddress: req.body.currentAccount },
                        { email: req.body.email }
                    ]
                });
                if (user) {
                    res.status(400).json({ success: false, message: "User already exists" });
                    return;
                }

                const newUser = await User.create({
                    email: req.body.email,
                    walletAddress: req.body.currentAccount,
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    description: req.body.description,
                    website: req.body.website,
                    facebookUrl: req.body.facebookUrl,
                    twitterUrl: req.body.twitterUrl,
                    instagramUrl: req.body.instagramUrl
                })

                res.status(200).json({ success: true, message: "Succesfully created user", data: newUser })
            } catch (error) {
                toast.error(`Error Adding user...${error.message}`);
                toast.error('lol')
                if (error.errors.length > 0) return res.status(400).json({ success: false, error: error.errors })
                console.log(error)
                res.status(400).json({ success: false })
            }
            break
        default:
            res.status(400).json({ success: false })
            break
    }
}