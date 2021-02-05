"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.engine = exports.isMultiUsageMethod = exports.isSingleUsageMethod = exports.isVariableArgument = exports.isLiteralArgument = exports.isCustomType = exports.isSimpleType = exports.isMultipleTypes = exports.isSingleType = void 0;
const liko_api_json_1 = __importDefault(require("./data/liko-api.json"));
function isSingleType(type) {
    return !Array.isArray(type);
}
exports.isSingleType = isSingleType;
function isMultipleTypes(type) {
    return Array.isArray(type);
}
exports.isMultipleTypes = isMultipleTypes;
function isSimpleType(type) {
    return !Array.isArray(type);
}
exports.isSimpleType = isSimpleType;
function isCustomType(type) {
    return Array.isArray(type);
}
exports.isCustomType = isCustomType;
function isLiteralArgument(argument) {
    return argument.name === undefined;
}
exports.isLiteralArgument = isLiteralArgument;
function isVariableArgument(argument) {
    return argument.name !== undefined;
}
exports.isVariableArgument = isVariableArgument;
function isSingleUsageMethod(method) {
    return method.usages === undefined;
}
exports.isSingleUsageMethod = isSingleUsageMethod;
function isMultiUsageMethod(method) {
    return method.usages !== undefined;
}
exports.isMultiUsageMethod = isMultiUsageMethod;
exports.engine = liko_api_json_1.default;
//# sourceMappingURL=liko-api.js.map