
import jwt from "jsonwebtoken";
//meya middleware ekk()next() kiyla call karanawa next ekk call karanwa nisa meya middleware ekk
//middleware ekk kiyanne api ekk walata yanna ona nisa meya use karanawa
export default function verifyjwt(req, res, next) {
    const header = req.headers["authorization"];
    console.log(header);
    if(header != null){
        const token = header.replace("Bearer ","");
        console.log(token);

        //code eka decode krnnawa mehema
        jwt.verify(token,"random1234",(err,decoded)=>{
         console.log(decoded)
         if(decoded != null){
            req.user = decoded;
            next();
         }
            else{
                res.status(403).json({
                    message:"unauthorized"
                })
            }
         
        })
    }
}