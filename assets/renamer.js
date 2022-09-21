const {
    readdirSync,
    rename
} = require('fs');
const {
    resolve
} = require('path');

// Get path to image directory
const imageDirPath = resolve(__dirname, './' + process.argv[2]);

// Get an array of the files inside the folder
const files = readdirSync(imageDirPath);

// Loop through each file that was retrieved
let index = 0;
files.forEach(file => {
    if (file.endsWith('.js'))
        return;
    rename(
        imageDirPath + `/${file}`,
        imageDirPath + `/frame_${index.toString().padStart(2, '0')}.jpg`,
        err => console.log(err)
    );
    index++;
});