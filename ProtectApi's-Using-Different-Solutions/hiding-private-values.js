/**
 * Fun fact: In JavaScript, a function can be coerced into a string. 
 * When this happens you actually get access to the code of that function.
 * Also, if you stringify a class, you’ll get access to all the code for that class. 
 * This means an attacker can figure out the password by simply calling alert(String(Sensitive))!
 * 
 */

{
    const URL = '/post';
  
    function Sensitive(options = {}) {
      const password = options.password || 'sjikairjjje223222';
      const url = typeof options.url === 'string' &&
        options.url.startsWith('https://anyapi.com')
          ? options.url
          : URL;
  
      // Return a simpler object after instantiating Sensitive
      return {
        
        getAuthorization: function (password) {
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
  
    // Access to the original Sensitive class has been removed
    window.Sensitive = function (options) {
      return Sensitive(options);
    }
  }