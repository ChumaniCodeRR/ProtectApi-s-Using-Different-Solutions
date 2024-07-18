/**
 * This options object will trick our library into transmitting the password to the evil.co domain. 
 * The reason for this is the multiple object property lookups we're performing in our library code.
 * When we do the typeof check that fires the get for the first time. 
 * When we check to see if the string startsWith a value, that's the second get call.
 * Each one of these checks increments the x counter. 
 * Finally, once we actually retrieve the value and assign it to url, the third get call has been performed. At that point the getter returns the “mutated” value.
 */

{
    const URL = '/post';

    function Sensitive(options = {}) {
        const password = options.password || 'sjikairjjje223222';
        const _url = options.url;
        const url = typeof _url === 'string' &&
            _url.startsWith('https://anyapi.com')
            ? _url
            : URL;
        
        return {

            getAuthorization: function(password) {
                const userPass = `admin:${password}`;
                return `Basic ${btoa(userPass)}`;
            },

            transmit: function (message, cb) {
                fetch(url, {
                  method: 'POST',
                  headers: {
                    Authorization: this.getAuthorization(password)
                  },
                  body: message
                }).then((response) => {
                  cb(null, response);
                });
            }
        };

    }
}
