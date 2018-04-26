/*
 * @Author: Rajkeshwar Prasad(rajkeshwar.pd@gmail.com) 
 * @Date: 2018-04-25 23:42:40 
 * @Last Modified by: Rajkeshwar Prasad
 * @Last Modified time: 2018-04-26 12:09:07
 */

var fs = require('fs');
var path = require('path');

var SOURCE_DIR = './src/app/css3icons';
var TARGET_FILE_PATH = './src/assets/data/css3icons-tree.json';
var CODE_SNIPPETS_PATH = './src/app/css3icons-snippets.ts';

fs.truncate(CODE_SNIPPETS_PATH, 0, function(){
    console.log('Clearing old file content...');
});

var snippetsMap = {};
var logger = fs.createWriteStream(CODE_SNIPPETS_PATH, {
  flags: 'a' // 'a' means appending (old data will be preserved)
});

logger.write('declare var require:any;\n');
logger.write('export const CSS3ICONS_SNIPPETS=\{\n');

function dirTree(filename) {

    var stats = fs.lstatSync(filename),
        info = {
            path: filename.replace(/^\.\/src\/app/, '.'),
            name: path.basename(filename)
        };

    if (stats.isDirectory()) {
        info.type = "folder";
        info.children = fs.readdirSync(filename)
            .filter(child => !/\.(spec.ts)$/.test(child))
            .map((child) => dirTree(filename + '/' + child));
    } else {
        // Assuming it's a file. In real life it could be a symlink or
        // something else!
        info.type = "file";  
        let codeSnippetPath = info.path.replace(/\.ts$/, '');
        logger.write('"'+info.path+'"'+':'+"require('!!prismjs-loader?lang=scss!"+codeSnippetPath+"'),\n");
    }

    return info;
}

var jsonView = dirTree(SOURCE_DIR);
    logger.end('}');

var treeView = JSON.stringify(jsonView, null, 2);

fs.writeFile(TARGET_FILE_PATH, treeView, (err) => {
    if(err) {
        return console.log(err);
    }
    console.log("Json is created for the directory: ", SOURCE_DIR);
});
