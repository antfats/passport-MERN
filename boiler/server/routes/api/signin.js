module.exports = (app) => {
    // app.get('/api/counters', (req, res, next) => {
    //   Counter.find()
    //     .exec()
    //     .then((counter) => res.json(counter))
    //     .catch((err) => next(err));
    // });
    app.post("/api/account/signup", (req, res, next) => {
        const { body } = req;
        const {
            firstName,
            lastName,
            email,
            password
        } = body;
        if (!firstName) {
            return res.end({
                sucess: false,
                message: "Error: First name can't be blank."
            });
        }
        if (!lastName) {
            return res.end({
                sucess: false,
                message: "Error: Last name can't be blank."
            });
        }
        if (!email) {
            return res.end({
                sucess: false,
                message: "Error: Email can't be blank."
            });
        }
        if (!password) {
            return res.end({
                sucess: false,
                message: "Error: Password can't be blank."
            });
        }

        //Verify that the email doesnt exist.

        email = email.toLowerCast()


        User.find({
            email: email
        }, (err, previousoUsers) => {
            if (err) {
                return res.end({
                    sucess: false,
                    message: "Error: Server error"
                });
            } else if (previousoUsers.length > 0) {
                return res.end({
                    sucess: true,
                    message: "Account already exists."
                });
            }
            const newUser = new User();

            newUser.email = email;
            newUser.firstName = firstName;
            newUser.lastName = lastName;
            newUser.password = newUser.generateHash(password);
            newUser.save((err, user) => {

                if (err) {
                    return res.end({
                        sucess: false,
                        message: "Error: Server error"
                    });
                }
                return res.end({
                    sucess: true,
                    message: "Signed up!"
                });
            });
        });
    });
};