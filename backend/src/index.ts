import { Hono } from 'hono'

 import { userRouter } from './routes/user'
import {  blogRouter} from './routes/blog'
import {cors} from 'hono/cors'
const app = new Hono<{
  Bindings : {
    DATABASE_URL: string,
    JWT_SECRET: string

  }
}>()
// Before going to blog routes , They will be(come here) verified by this middleware

// get the header 
  // verify the header
  // If the header is correct then we can proceed
  // if not , we return a user 403 status code 

// app.use('/api/v1/blog*',async (c, next) => {
  
//   const header = c.req.header('Authorization')  || '';
//   // Bearer token => ["Bearer","token"]
//   const token = header.split(" ")[1];

//   const response = await verify(token , "secret")
//   if(response.id){
//     next();
//   }
//   else{
//     c.status(403);
//     return c.json({error: "Unauthorized"}, {status: 403})
//   }
// })
app.use('/*', cors())
app.route("/api/v1/user", userRouter)
app.route("/api/v1/blog", blogRouter)

export default app
