class AuthorizationController {
    async login(req, res) {
        const {login, password} = req.body;
        if (login === 'admin' && password === '123') {
            res.status(200).cookie('isAdmin', 'true').send('succeed');
        } else {
            res.status(403).send('error');
        }
    }
}

module.exports = new AuthorizationController();