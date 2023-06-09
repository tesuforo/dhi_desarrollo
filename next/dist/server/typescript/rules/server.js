"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
var _constant = require("../constant");
var _utils = require("../utils");
const serverLayer = {
    // On the server layer we need to filter out some invalid completion results.
    filterCompletionsAtPosition (entries) {
        return entries.filter((e)=>{
            // Remove disallowed React APIs.
            if (_constant.DISALLOWED_SERVER_REACT_APIS.includes(e.name) && e.source === "react") {
                return false;
            }
            return true;
        });
    },
    // Filter out quick info for some React APIs.
    hasDisallowedReactAPIDefinition (definitions) {
        return definitions == null ? void 0 : definitions.some((d)=>_constant.DISALLOWED_SERVER_REACT_APIS.includes(d.name) && d.containerName === "React");
    },
    // Give errors about disallowed imports such as `useState`.
    getSemanticDiagnosticsForImportDeclaration (source, node) {
        const ts = (0, _utils).getTs();
        const diagnostics = [];
        const importPath = node.moduleSpecifier.getText(source);
        if (importPath === "'react'" || importPath === '"react"') {
            // Check if it imports "useState"
            const importClause = node.importClause;
            if (importClause) {
                const namedBindings = importClause.namedBindings;
                if (namedBindings && ts.isNamedImports(namedBindings)) {
                    const elements = namedBindings.elements;
                    for (const element of elements){
                        const name = element.name.getText(source);
                        if (_constant.DISALLOWED_SERVER_REACT_APIS.includes(name)) {
                            diagnostics.push({
                                file: source,
                                category: ts.DiagnosticCategory.Error,
                                code: _constant.NEXT_TS_ERRORS.INVALID_SERVER_API,
                                messageText: `"${name}" is not allowed in Server Components.`,
                                start: element.name.getStart(),
                                length: element.name.getWidth()
                            });
                        }
                    }
                }
            }
        }
        return diagnostics;
    }
};
var _default = serverLayer;
exports.default = _default;

//# sourceMappingURL=server.js.map