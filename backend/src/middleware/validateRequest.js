export const validateRequest = (schema)=> {
    return (req,res,next)=> {
        const result = schema.safeParse(req.body);

        if(!result.success){
            return res.status(400).json({
                message: "validate failed",
                errors: result.error.flatten().feildErrors
            })
        }

        req.body = result.data

        next()
    }
}