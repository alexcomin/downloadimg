const {dialog, Menu} = require('electron').remote
const request = require('sync-request');
const fs = require('fs');
            
let file = [];
let dir = []; 
console.log(dir);
            
function write(text, elem) {
    var li = elem.appendChild(document.createElement('li'));
    li.innerHTML = text;
    if (elem.getElementsByTagName('li').length > 8) {
        removeElement(elem);
    };
}
            
function removeElement(elem) {
    while(elem.lastChild) {
        elem.removeChild(elem.lastChild);
    };
} 
            
function createBut() {
    removeElement(create);
    var button = document.createElement('input');
    button.type = 'button';
    button.value = 'Начать';
    button.id = 'start-file';
    button.addEventListener('click', function () {
       start(); 
    });
    create.appendChild(button);
};
            
function readAndDisplayFile(file, dir, list) {
    var stream = fs.createReadStream(file[0]);
    var buf = '';
    stream.on('readable', () => {
        var data = stream.read();
        if(data === null) {
            return;
        };
        
        buf += data.toString();
        checkBufLines();
    });
    
    stream.on('end', () => {
        buf += '\n';
        checkBufLines();
    });
    
    function checkBufLines() {
        var pos = buf.indexOf('\n');
        if(pos === -1) {
            return;
        }
        
        var line = buf.substr(0, pos);
        buf = buf.substr(pos + 1);
        var img_name = decodeURIComponent(line.split('/').slice(-1));
        var res = request("GET", line);
        fs.writeFileSync(dir[0] + '/' + img_name, res.body);
        console.log(img_name);
        write(img_name, list);
        setImmediate(checkBufLines);
    }
}

function start() {
    readAndDisplayFile(file, dir, log)
    // function readFile(nameFile) {
    //     fs.readFile(nameFile, 'utf8', function(err, contents) {
    //         if (!err) {
    //             readLine(contents.split('\n'));
    //         } else {
    //             console.log('Ошибка', err);
    //         }
    //     });
    // }
    
    // function readLine(array) {
    //     array.forEach(function(uri) {
    //         var img_name = decodeURIComponent(uri.split('/').slice(-1))
    //         var res = request("GET", uri);
    //         fs.writeFileSync(dir[0] + '/' + img_name, res.body);
    //         console.log( i += 1);
    //         console.log(img_name, ' OK');
    //         // write(img_name); 
    //     }); 
    // };
    // console.log(file[0]);
    // readFile(file[0]);
}
                         
document.getElementById('select-dir').addEventListener('click',function() {
    dialog.showOpenDialog({properties: ['openDirectory']}, function (fileNames) {
        if(fileNames === undefined) {
            console.log("No file selected");
        } else {
            console.log(fileNames);
            dir[0] = fileNames[0];
            console.log(dir);
            document.getElementById("path-dir").value = fileNames[0];
            createBut();
        }
    }); 
}, false);
            
document.getElementById('select-file').addEventListener('click',function() {
    dialog.showOpenDialog({properties: ['openFile'], filters: [{name: "File", extensions: ['txt']}]}, function (fileNames) {
        if(fileNames === undefined) {
            console.log("No file selected");
        } else {
            console.log(fileNames)
            file[0] = fileNames[0];
            document.getElementById("path-file").value = fileNames[0];
        }
    }); 
}, false);