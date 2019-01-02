var fs = require('fs')
var marked = require('marked')

export function markedjs() {
    fs.readFile('<%= BASE_URL %>note/es6/es6.md', function(err, data) {
        if(err) {
            throw err
        } else {
            return marked(data.toString())
        }
    })
}