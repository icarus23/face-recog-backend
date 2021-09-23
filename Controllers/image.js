const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: 'ff2c1ec9278b4a59a9accb292fc03a59'
});

const handleApiCall = (req, res) => {
    app.models.predict("d02b4508df58432fbb84e800597b8959", req.body.input)
    .then(data => {
        res.json(data);
      })
      .catch(err => res.status(400).json('unable to work with API'))
}

const handleImage = (req, res, db) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0]);
    })
    .catch(err => res.status(400).json('unable to update rank'));
}
module.exports = {
    handleImage,
    handleApiCall
}