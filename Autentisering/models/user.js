const mongoose = require("mongoose");
const bcrypt = require("bcrypt");


// user schema

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});

userSchema.pre("save", async function (next) {
    const user = this;

    if (!user.isModified("password")) {
        return next();
    }

    try {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(user.password, salt);
        user.password = hashPassword;
        next();
    } catch (error) {
        next(error);
    }
});

userSchema.methods.checkPassword = async function (guess) {
    return await bcrypt.compare(guess, this.password);
};

// regiter user
userSchema.statics.register = async (username, email, password) => {
    try {
        const user = new this({username, email, password});
        await user.save();
        return user;
    } catch (error) {
        throw error;
    }
}


// login user

userSchema.statics.login = async function (username, password) {
    try {
        const user = await this.findOne({username});
        if (!user) {
            throw new Error("incorrect username or password");
        }

        const isPasswordMatch = await user.comparePassword(password);

        if (!isPasswordMatch) {
            throw new Error("incorrect username or password");
        }

        return user;
    } catch (error) {
        throw error;
    }
}
module.exports = mongoose.model("User", userSchema);