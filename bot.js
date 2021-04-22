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

const encodeToBase64 = (imageURL) => {
    return new Promise(resolve => {
        // Convert image into encoded base 64
        imageToBase64(imageURL)
            .then(
                (response) => {
                    resolve(response)
                }
            )
            .catch(
                (error) => {
                    // Logs an error if there was one
                    console.log(error);
                }
            )
    })
}

const getData = () => {
    return new Promise(resolve => {
        // Gather data from NASA API
        axios.get(NASA_API)
            .then(async (res) => {
                // handle success 
                resolve(res)
            })
            .catch((err) => {
                // handle error
                console.log(err);
            });
    })
}

const tweet = async () => {

    const res = await getData();

    const imageURL = res.data.url;
    const title = res.data.title;
    const hdURL = res.data.hdurl;

    const base64str = await encodeToBase64(imageURL)

    console.log('Uploading image...')

    // Post daily tweet image
    T.post('media/upload', { media_data: base64str }, function (err, data, response) {
        if (err) {
            console.log('Something went wrong!')
            console.log(err)
        } else {
            console.log('Success! Image uploaded. Now tweeting...')

            T.post('statuses/update', {
                media_ids: new Array(data.media_id_string),
                status: `${title}\n\n${hdURL}\n#NASA #space #science #astrophotography`
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
}

// Run every 24 hours
setInterval(function () { tweet(); }, 216000000)