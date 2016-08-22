// var http = require('http');
var fs = require('fs');
var request = require('sync-request');


function readFile(nameFile) {
    fs.readFile(nameFile, 'utf8', function(err, contents) {
        if (!err) {
            readLine(contents.split('\n'));
        } else {
            console.log('Ошибка', err);
        }
    });
}

function readLine(array) {
    array.forEach(function(uri) {
        var img_name = decodeURIComponent(uri.split('/').slice(-1))
        var res = request("GET", uri);
        fs.writeFileSync(img_name, res.body);
        console.log(img_name, ' OK')
    });
}

readFile('test.txt');


// var request = require('request');


// function readFile(nameFile) {
//     var contents = fs.readFileSync(nameFile, 'utf8').split('\n');
//     for (i = 0; i < contents.length; i++) {
//         var link = [];
//         link.push(contents[i]);
//         console.log('OK');
//         read(link);
//     }
// }



// function on(url) {
//     var img_name = decodeURIComponent(url.split('/').slice(-1))
//     var file = fs.createWriteStream(img_name);
//     var request = http.get(url, function (response) {
//         console.log(img_name, ' OK');
//         response.pipe(file);
//     });
// }




// function readLine(array) {
//     var line = 0;
//     (function() {
//         if (line < array.length) {
//             download(array[line]);
//             line++
//             setTimeout(arguments.callee, 2000);
//         }
//     })();
// }

// function download(url) {
//     var img_name = decodeURIComponent(url.split('/').slice(-1));
//     var file = fs.createWriteStream(img_name);
//     var request = http.get(url, function(response) {
//         console.log(img_name, ' OK')
//         response.pipe(file);
//     });
// }

