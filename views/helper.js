const helperFunctions = {
    getErrors(errors, inputType){
        try {
            return errors.mapped()[inputType].msg;
        } catch (error) {
            return "";
        }
    }
};

export const {getErrors} = helperFunctions