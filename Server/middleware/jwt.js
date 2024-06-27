import jwt from 'jsonwebtoken'

const secretKey = "secret4123key456for798token"
const issuer = "JOYFULJOURNEYS"

export const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token)
        return res.sendStatus(403).send("no access Token");
    try {
        const verified = jwt.verify(token, secretKey, { "issuer": issuer });
        if (!verified) {
            return res.status(401).send("Invalid Token");
        }
        return next();
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
};

export const signToken = (username) => {
    return jwt.sign({ id: username }, secretKey, {
        issuer: issuer,
        expiresIn: "20m",
    })
}

export const signRefreshtoken = (username) => {
    return jwt.sign({ id: username }, secretKey, {
        expiresIn: "1d",
    })
}