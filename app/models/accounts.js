import mongoose, {Schema} from "mongoose";

const topicSchema = new Schema(
    {
        email: String,
        password: String,
    },{
     timestamps: true
    }    

);
const Topic = mongoose.models.Topic || mongoose.model("Topic", topicSchema);
export default Topic;