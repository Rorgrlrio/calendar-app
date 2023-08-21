const jwt = require('jsonwebtoken');

const generateJWT = ( uid, name ) => {

    const payload = { uid, name };

    const token = jwt.sign( payload, process.env.SECRET_JWT_SEED, {
        expiresIn: '2h' 
    })

    if (!token) {
        return 'Token no se pudo generar'
    }

    return token;
    
}

module.exports = {
    generateJWT
}