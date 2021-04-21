//------ BOT SET-UP -------//

require('dotenv').config();
const twit = require('twit');
const axios = require('axios');
const imageToBase64 = require('image-to-base64');

const T = new twit({
    consumer_key: process.env.API_KEY,
    consumer_secret: process.env.API_SECRET_KEY,
    access_token: process.env.ACCESS_TOKEN,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET
});

let NASA_API_KEY = process.env.NASA_API_KEY;
let NASA_API = 'https://api.nasa.gov/planetary/apod?api_key=' + NASA_API_KEY;

// -------------------------------------

function tweet() {

    // Gather data from NASA API
    axios.get(NASA_API)
        .then((res) => {
            // handle success   

            // let status = res.status;
            // let date = res.data.date;
            // Shorten explanation to 1 or 2 sentences
            // let explanation = res.data.explanation;
            let title = res.data.title;
            let hdURL = res.data.hdurl;
            let imageURL = res.data.url;
            let base64str;

            // Convert image into encoded base 64
            // imageToBase64(imageURL)
            //     .then(
            //         (response) => {
            //             base64str = response;
            //         }
            //     )
            //     .catch(
            //         (error) => {
            //             console.log(error); // Logs an error if there was one
            //         }
            //     )

            console.log('Uploading image...')

            // Make this an asynchronous function
            // Post daily tweet image
            T.post('media/upload', { media_data: base64str }, function (err, data, response) {
                if (err) {
                    console.log('Something went wrong!')
                    console.log(err)
                } else {
                    console.log('Success! Image uploaded. Now tweeting...')

                    T.post('statuses/update', {
                        media_ids: new Array(data.media_id_string),
                        status: `💫${title}\n${hdURL}\n#NASA #Space`
                    },
                        function (err, data, response) {
                            if (err) {
                                console.log('error:', err);
                            }
                            else {
                                console.log('Tweeted an image!');
                            }
                        }
                    );
                }
            })
        })
        .catch((err) => {
            // handle error
            console.log(err);
        });
}

tweet();

// Run every 24 hours
// setInterval(function () { tweet(); }, 216000000)