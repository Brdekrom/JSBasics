import mongoose from "mongoose";

const Animals = mongoose.model('User', {
    name:{type: String, required: true, minLength: 3},
    type:{type: String, required: true, minLength: 3}
})

export default Animals;