import app from "./app.js";
import { db } from "./config/db.js";
//database connection 
db();
//localhost
app.listen(process.env.PORT,()=>{
    console.log(`Local Host running at port ${process.env.PORT}`);
})
