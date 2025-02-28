const prisma = require('../prismaClient');

async function createUser(first_name, last_name, email, hashedPassword) {
    return await prisma.user.create({
        data: { first_name, last_name, email, password: hashedPassword }
    });    
}






module.exports = {
    createUser
}