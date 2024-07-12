// Middleware for validating request body
const validateTodo = (req, res, next) => {
    const { name, email, rollNum } = req.body;
    if (!name) {
        return res.status(400).send({ message: 'Name is required' });
    }
    if (!email) {
        return res.status(400).send({ message: 'Email is required' });
    }
    if (!rollNum) {
        return res.status(400).send({ message: 'Roll number is required' });
    }
    next();
};
module.exports={validateTodo}