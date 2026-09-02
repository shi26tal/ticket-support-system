import { createUser, loginUser } from "../services/userService.js";

export const registerUser = async (req, res) => {
  try {
    // userService bata import gareko and just await and call it and pass the req.body
    // so that userService can get access to req.body (name,email,password)
    const user = await createUser(req.body)

    res.status(200).json({
      message: "user register successfully",
      user
    });
  } catch (error) {

    if(error.message === "user with this email already exists"){
      return res.status(409).json({
        message: error.message
      })
    }
    res.status(500).json({
      message: "something went wrong",
    });
  }
};

export const login = async (req,res)=> {
  try {

    const result = await loginUser(req.body)

    return res.status(200).json(result)
    
  } catch (error) {
    if(error.message === "invalid email or password"){
      return res.status(400).json({
        message: error.message
      })
    }
    
    res.status(500).json({
      message: "something went wrong"
    })
  }
}