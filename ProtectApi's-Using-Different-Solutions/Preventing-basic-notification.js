/**
 * How can we prevent this issue from happening? 
 * One approach is to prevent extensions to the exported Sensitive instance. 
 * We have a whole article on this at JavaScript Object Property Descriptors, Proxies, and Preventing Extension, but we'll cover just enough content here to lock down our library.

There are a few ways to prevent extensions to an object but the most straightforward approach is to use Object.freeze(). 
This method will essentially make it so that an object can no longer be mutated.
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
            
            // object returns with frozen properties

            return Object.freeze({
                getAuthorization: function (password) {
                    const userPass = `admin:${password}`;
                    return `Basic ${btoa(userPass)}`;
                },

                transmit: function( message, cb) {
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
            });
    }

    window.Sensitive = function (options)  {
        return Sensitive(options);
    }

}