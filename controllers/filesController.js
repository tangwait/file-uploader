const prisma = require("../prismaClient");

async function uploadFile(req, res) {
        if (!req.file) {
            return res.status(400).send("No file uploaded"); 
        }    

        try {
            const { originalname, size, mimetype } = req.file;
            const userId = req.user.id;

            const file = await prisma.file.create({
                data: {
                    name: originalname,
                    size: size,
                    mimetype: mimetype,
                    url: `/uploads/${originalname}`,
                    userId: userId,
                    upload_date: new Date()
                }
            });
            console.log("File saved:", file);
            res.redirect("/dashboard");
        } catch(error) {
            console.error(error);
            res.status(500).send("Server error");
        }  
}


module.exports = {
    uploadFile
}