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
    }
};

export const { handleErrors } = appMiddlewares