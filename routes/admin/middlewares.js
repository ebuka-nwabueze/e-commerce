import { validationResult } from "express-validator";

const appMiddlewares = {
    handleErrors(templateFunction, productCallBack){
        return async (req,res,next) => {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                let data = {};
                if (productCallBack){
                    data = await productCallBack(req)
                }
              return res.send(templateFunction({ errors, ...data }));
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