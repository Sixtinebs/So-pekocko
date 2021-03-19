const jwt = require('jsonwebtoken');

module.exports = ( req, res, next) => {
    try{
        const token = req.headers.autorization.split(' ')[1];
        const decoded = jwt.verify(token, 'TOKEN_SECRET');
        const userId = decoded.userId;
        if(req.body.userId && (req.body.userId !== userId)){
            throw "Identifiant n'hexiste pas";
        } else {
            next();
        }
        
    }catch{
        res.status(404).json({ error: new Error("une erreur est survenu")});
    }
}