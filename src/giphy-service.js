const get = require('got').get;

class GiphyService {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.baseUrl = 'https://api.giphy.com/v1/gifs/translate';
    }

    translateIntoMeme(term) {
        return get(`${this.baseUrl}?api_key=${this.apiKey}&s=${term}`)
            .then((response) => {
                return get(JSON.parse(response.body).data.images.downsized.url, { encoding: null });
            })
            .then((response) => {
                return response.body;
            });
    }
}

module.exports = GiphyService;