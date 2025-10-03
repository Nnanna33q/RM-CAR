import passport from 'passport';
import { Strategy} from 'passport-local';
import express from 'express';
import Admin from '../schemas/admin.js';
import { compareSync } from 'bcryptjs';
import validateLoginFields from '../utils/validate-login.js';
import checkErrors from '../utils/check-validation-errors.js';
import type { Request, Response, NextFunction } from 'express';

type Admin = {
    _id: string,
    username: string,
    password: string
}

const authRouter = express.Router();

authRouter.use(passport.session());

passport.serializeUser((admin, done) => {
    if(!admin) {
        done('No user object', false);
        return;
    }
    done(null, admin);
})

passport.deserializeUser(async (id, done) => {
    console.log('Execute')
    try {
        const admin = await Admin.findById(id, { password: 0 });
        if(!admin) {
            done('Invalid admin id or admin does not exist', false);
            return;
        }
        done(null, admin);
    } catch(error) {
        console.error('An unexpected error occurred when fetching admin');
        done('An unexpected error occurred', false);
    }
})

passport.use(new Strategy(async (username, password, cb) => {
    try {
        const admin = await Admin.findOne({ username: username });

        if(!admin) {
            cb('Invalid username', false);
            console.log('Invalid username'); 
            return;
        }

        if(compareSync(password, admin.password)) {
            console.log('Password is correct');
            cb(null, admin);
        } else {
            cb('Invalid password', false);
        }
    } catch(error) {
        console.error('An unexpected error occurred');
        cb('An unexpected error occurred', false);
    }
}))

authRouter.post('/login', validateLoginFields, checkErrors, passport.authenticate('local'), (err: any, req: Request, res: Response, next: NextFunction) => {
    if(err) {
        res.status(400).json({ success: false, errorMessage: err });
        return;
    }
    next();
}, (req: Request, res: Response) => {
    res.status(200).json({ success: true });
});

export default authRouter