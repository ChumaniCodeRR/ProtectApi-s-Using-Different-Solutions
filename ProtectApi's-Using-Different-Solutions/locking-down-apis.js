/**
 * Even though our code is rather locked down by now, our attacker is ruthless and will stop at nothing. 
 * The next attack vector we’ll examine is a dependency of the library code. 
 * This dependency exists in the form of a global called window.fetch. 
 * This is a browser-provided function for making HTTP requests. 
 * Even though it's built-in to the browser it can be modified, much like how the attacker was able to replace the getAuthorization method on the object we had returned.
 */

{
    //we're now caching global functions 

    const my_fec = window.fetch;
    const my_frez = Object.freeze;
    const my_bt = btoa;

    const URL = '/post';

    function Sensitive(options = {}) {
        const password = options.password || 'sjikairjjje223222';
        const _url = options.url;
        const url = typeof _url === 'string' &&
            _url.startsWith('https://anyapi.com')
            ? _url
            : URL;
    }

    return my_frez({
        getAuthorization: function(password){
            const userPass = `admin:${password}`;
            return `Basic ${my_bt(userPass)}`;
        },

        transmit: function (message, cb){
            my_fec(url, {
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

    window.Sensitive = function (options){
        return Sensitive(options);
    }
    
}
