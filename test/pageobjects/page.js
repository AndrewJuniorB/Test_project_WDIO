
module.exports = class Page {
    open (path) {
        return browser.url(`https://www.libreview.com/${path}`)
    }

}