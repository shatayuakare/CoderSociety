import User from "../model/user.schema.js";
import bcryptjs from "bcryptjs";

// export const getUser = async (req, res) => {
//     try {
//         const user = await User.find()
//         res.status(200).json(user)
//     } catch (error) {
//         console.log("Error ", error)
//         res.status(500).json(error)
//     }
// }

export const register = async (req, res) => {
    try {
        const { username, name, email, password } = req.body;
        const user = await User.findOne({ email })
        // console.log("user found", user);
        if (user) {
            return res.status(400).json({ message: "User already exist" });
        }

        const hashPassword = await bcryptjs.hash(password, 10)
        console.log("Hash Password ", hashPassword);
        const createUser = new User({
            username, name, email, password: hashPassword
        })

        await createUser.save();
        res.status(201).json({
            message: "User Created Successfully",
            user: {
                name: name,
                username: username,
                email: email
            }
        })

    } catch (error) {
        // console.log("Error ", error.message);
        res.status(500).json({ message: error.message });
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        // console.log(user)
        const isMatch = await bcryptjs.compare(password, user.password);

        if (!isMatch || (email !== user.email)) {
            return res.status(400).json({ message: "Incorrect email or password" });
        } else {
            return res.status(200).json({
                message: "Login Successfully",
                user: {
                    username: user.username,
                    name: user.name,
                    email: user.email
                }
            });
        }

    } catch (error) {
        // console.log("Error ", error.message);
        res.status(500).json({ message: error.message })
    }
}

