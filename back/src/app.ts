import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import router from './router';


const PORT = process.env.SERVER_PORT

const app = express();

app.use(cors({
  origin: '*'
}))

app.use(express.json());

//Api prefix
app.use('/api/restaurant', router)

app.listen(PORT,() => {
  console.log("App listen por el puerto", PORT);
})
