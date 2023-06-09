"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getNextFontError = getNextFontError;
var _simpleWebpackError = require("./simpleWebpackError");
function getNextFontError(err, module) {
    try {
        const resourceResolveData = module.resourceResolveData;
        if (!module.loaders.find((loader)=>/next-font-loader[/\\]index.js/.test(loader.loader))) {
            return false;
        }
        // Parse the query and get the path of the file where the font function was called.
        // provided by next-swc next_font_loaders
        const file = JSON.parse(resourceResolveData.query.slice(1)).path;
        if (err.name === "NextFontError") {
            // Known error thrown by @next/font, display the error message
            return new _simpleWebpackError.SimpleWebpackError(file, `\`next/font\` error:\n${err.message}`);
        } else {
            // Unknown error thrown by @next/font
            return new _simpleWebpackError.SimpleWebpackError(file, `An error occured in \`next/font\`.\n\n${err.stack}`);
        }
    } catch  {
        return false;
    }
}

//# sourceMappingURL=parseNextFontError.js.map