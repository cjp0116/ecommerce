import mongoose from 'mongoose';
import { MONGODB_URL } from "../config";
mongoose.set("debug", true);

mongoose.connection.on("error", e => {
  console.error(`${e.message} is Mongod not running?`);
})
mongoose.connection.on('disconnected', () => {
  console.log('mongo disconnected DB: ' + MONGODB_URL)
})
mongoose.connect(MONGODB_URL, {
  useNewUrlParser : true,
  useUnifiedTopology : true
})
mongoose.connection.once('open', ()=>{
  console.log('connected to mongoose... DB: '+ MONGODB_URL)
});