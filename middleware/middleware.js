import  jwt from 'jsonwebtoken';

const varify = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedData = jwt.verify(token, 'mind');
        const {username, id} = decodedData;
        req.username = username;
        req.userId = id;
        next();
    } catch (error) {
        console.log(error)
    }
};

export default varify;
