import { validationResult } from "express-validator";

const appMiddlewares = {
    handleErrors(templateFunction){
        return (req,res,next) => {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
              return res.send(templateFunction({req: {},  errors }));
            }
            next();
        };
    },
    requireAuth(req,res,next){
        if(!req.session.userId){
           return res.redirect("/signin")
        }
        next();
    }
};

export const { handleErrors, requireAuth } = appMiddlewares 