const jwt = require("jsonwebtoken");

const authgurd = async (req, res, next) => {

    if (req.headers.authorization) {

        const token = req.headers.authorization.replace("Bearer ", "");

        try {
            const isvarified = await jwt.verify(token, process.env.TOKENSECRATE);

            if (isvarified) {
                req.user_id = isvarified.id
                next();

            } else {

                return res.status(400).json({
                    message: "Invalid Token"
                })
            }
        }
        catch (error) {

            return res.status(500).json({
                message: "you need to login first !"
            })
        }

    } else {

        return res.status(401).json({
            message: "Json Web Token is required"
        })
    }
}

module.exports = authgurd