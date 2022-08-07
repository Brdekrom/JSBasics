import Animals from './Animal.model.js'

const Animal = {
    get: async(req,res) => {
        const {id} = req.params
        const animal = await Animals.findOne({_id: id})
        res.status(200).send(user)
    },

    list: async(req, res) => {
        const animal = await Animals.find()
        res.status(200).send(animal)
        
    },
    create: async(req,res) => {
        const animal = new Animals(req.body)
        const savedAnimal = await Animals.save()
        res.status(201).send(savedAnimal._id)
    },
    update: async(req,res) => {
        const {id} = req.params;
        const animal = await Animals.findOne({_id: id})
        Object.assign(user,req.body)
        await Animal.save()
        res.sendStatus(204)
    },
    destroy: async(req,res) => {
        const {id} = req.params;
        const animal = await Animals.findOne({_id: id})
        if(animal) {
            animal.remove()
        }
        res.sendStatus(204)
    }
}

export default Animal;