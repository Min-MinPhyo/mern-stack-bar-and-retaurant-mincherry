const testController=async(req,res)=>{

    try {

        res.status(201).send("<h1>I am Testing </h1>")
        
    } catch (error) {
        console.log(error)
        
    }

}


module.exports={testController}