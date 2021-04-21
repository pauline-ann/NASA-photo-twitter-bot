//------ BOT SET-UP -------//

require('dotenv').config();
const twit = require('twit');

const config = {
    consumer_key: process.env.API_KEY,
    consumer_secret: process.env.API_SECRET_KEY,
    access_token: process.env.ACCESS_TOKEN,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET
}

const T = new twit(config);

let NASA_API_KEY = process.env.NASA_API_KEY;
let NASA_API = 'https://api.nasa.gov/planetary/apod?api_key=' + NASA_API_KEY;

// {
// "date": "2021-04-21",
// "explanation": "When galaxies collide -- what happens to their magnetic fields? To help find out, NASA pointed SOFIA, its flying 747, at galactic neighbor Centaurus A to observe the emission of polarized dust -- which traces magnetic fields.  Cen A's unusual shape results from the clash of two galaxies with jets powered by gas accreting onto a central supermassive black hole.  In the resulting featured image, SOFIA-derived magnetic streamlines are superposed on ESO (visible: white), APEX (submillimeter: orange), Chandra (X-rays: blue), and Spitzer (infrared: red) images. The magnetic fields were found to be parallel to the dust lanes on the outskirts of the galaxy but distorted near the center.  Gravitational forces near the black hole accelerate ions and enhance the magnetic field.  In sum, the collision not only combined the galaxies’ masses -- but amplified their magnetic fields.  These results provide new insights into how magnetic fields evolved in the early universe when mergers were more common.",
// "hdurl": "https://apod.nasa.gov/apod/image/2104/CenA_SofiaPlus_1847.jpg",
// "media_type": "image",
// "service_version": "v1",
// "title": "Centaurus A's Warped Magnetic Fields",
// "url": "https://apod.nasa.gov/apod/image/2104/CenA_SofiaPlus_960.jpg"
// }

// -------------------------------------

const dailyTweet = {
    status: 'hey'
}

// // Run every 60 seconds

function tweet(tweet) {

    T.post('statuses/update', tweet, function(err, data, response) {
        if (err) {
            console.log('Something went wrong!')
            console.log(err)
        } else {
            console.log('Success! The following tweet has been posted.')
            console.log(data.text)
        }
    }) 
}

// Run every 24 hours
setInterval(function() { tweet(dailyTweet); }, 216000000)

// seconds * 60 *60