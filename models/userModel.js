const prisma = require('../prismaClient');

async function createUser(first_name, last_name, email, hashedPassword) {
    return await prisma.user.create({
        data: { first_name, last_name, email, password: hashedPassword }
    });    
}

async function findUserEmail(email) {
    return await prisma.user.findUnique({
        where: { email }
    });
}

async function getUserInfo(id) {
    return await prisma.user.findUnique({
        where: { id }
    });
}

async function getUserFiles(userId) {
    return await prisma.file.findMany({
        where: { userId },
        orderBy: { upload_date: 'desc' }
    });
}




module.exports = {
    createUser,
    findUserEmail,
    getUserInfo,
    getUserFiles
}