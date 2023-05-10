const { Thought, User } = require('../models');
const thoughtController = {

    async getThoughts(req, res) {
        try {
          const thoughts = await Thought.find();
    
    
          res.json(thoughts);
        } catch (err) {
          return res.status(500).json(err.message);
        }
      },

      async getSingleThought(req, res) {
        try {
          const thought = await Thought.findOne({ _id: req.params.thoughtId })
            .select('-__v');
    
          if (!thought) {
            return res.status(404).json({ message: 'No thought with that ID' })
          }
    
          res.json({
            thought
          });
        } catch (err) {
          console.log(err);
          return res.status(500).json(err);
        }
      },

      async createThought(req, res) {
        try {
          const thought = await Thought.create(req.body);
          const user = await User.findOneAndUpdate({
            username: req.body.username
          }, {$push: {thoughts: thought._id}},{new: true})
          if (!user) {
            return res.status(404).json({ message: 'thought created but no user with that username'})
          }
          res.json({ message: 'thought created'});
        } catch (err) {
          res.status(500).json(err);
        }
      },

      async updateThought (req, res) {

        try {
          const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
          );
    
          if (!thought) {
            return res
              .status(404)
              .json({ message: 'No thought found with that ID :(' });
          }
    
          res.json(thought);
        } catch (err) {
          res.status(500).json(err);
        }
      },


      async deleteThought(req, res) {
        try {
          const thought = await Thought.findOneAndDelete({_id: req.params.thoughtId}); 
          const user = await User.findOneAndUpdate ({
            username: thought.username
          }, {$pull: {thoughts: thought._id}},{new: true})
          if (!user) {
            return res.status(404).json({ message: 'thought deleted but no user with that username'})
          }
          res.json({ message: 'thought deleted'});
        } catch (err) {
          res.status(500).json(err.message);
        }
      },

      async addReaction (req, res) {
    
        try {
          const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
          );
    
          if (!thought) {
            return res
              .status(404)
              .json({ message: 'No thought found with that ID :(' });
          }
    
          res.json(thought);
        } catch (err) {
          res.status(500).json(err);
        }
      },
      // Remove assignment from a student
      async removeReaction(req, res) {
        try {
          const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { runValidators: true, new: true }
          );
    
          if (!thought) {
            return res
              .status(404)
              .json({ message: 'No thought found with that ID :(' });
          }
    
          res.json(thought);
        } catch (err) {
          res.status(500).json(err);
        }
      },



}; 



module.exports = thoughtController