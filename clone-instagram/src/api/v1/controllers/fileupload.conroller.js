const fs = require("fs");
const { uploader } = require("../helpers/cloudinary");
const UserService = require("../services/user.services");
exports.uploadProfilePhoto = async(req, res) => {
    try {
        const file = req.file;
        if (!file) {
            return res
                .status(400)
                .json({ message: "dp i.e display picture is needed!" });
        }
        const { path: filepath } = file;
        const { secure_url } = await uploader(filepath, "profilephoto");
        if (!secure_url) throw new Error("upload is failed");
        await UserService.findOneAndUpdate({ _id: req.user._id }, { profilePhoto: secure_url }, );
        fs.unlinkSync(filepath);
        return res.status(200).send();
    } catch (e) {
        res.status(500).json({ message: "Sorry, failed to upload the file" });
    }
};