"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.TypescriptCheckerHandler = void 0;
// import path from 'path';
function stryNS_9fa48() {
    var g = new Function("return this")();
    var ns = g.__stryker__ || (g.__stryker__ = {});
    if (ns.activeMutant === undefined && g.process && g.process.env && g.process.env.__STRYKER_ACTIVE_MUTANT__) {
        ns.activeMutant = g.process.env.__STRYKER_ACTIVE_MUTANT__;
    }
    function retrieveNS() {
        return ns;
    }
    stryNS_9fa48 = retrieveNS;
    return retrieveNS();
}
stryNS_9fa48();
function stryCov_9fa48() {
    var ns = stryNS_9fa48();
    var cov = ns.mutantCoverage || (ns.mutantCoverage = {
        static: {},
        perTest: {}
    });
    function cover() {
        var c = cov.static;
        if (ns.currentTestId) {
            c = cov.perTest[ns.currentTestId] = cov.perTest[ns.currentTestId] || {};
        }
        var a = arguments;
        for (var i = 0; i < a.length; i++) {
            c[a[i]] = (c[a[i]] || 0) + 1;
        }
    }
    stryCov_9fa48 = cover;
    cover.apply(null, arguments);
}
function stryMutAct_9fa48(id) {
    var ns = stryNS_9fa48();
    function isActive(id) {
        if (ns.activeMutant === id) {
            if (ns.hitCount !== void 0 && ++ns.hitCount > ns.hitLimit) {
                throw new Error('Stryker: Hit count limit reached (' + ns.hitCount + ')');
            }
            return true;
        }
        return false;
    }
    stryMutAct_9fa48 = isActive;
    return isActive(id);
}
var ts = require("typescript");
var plugin_1 = require("@stryker-mutator/api/plugin");
var TypescriptCheckerHandler = /** @class */ (function () {
    function TypescriptCheckerHandler(logger, options) {
        if (stryMutAct_9fa48("61")) {
            { }
        }
        else {
            stryCov_9fa48("61");
            logger.info(stryMutAct_9fa48("62") ? "" : (stryCov_9fa48("62"), 'HANDLER!'));
            var compiler = ts.createSolutionBuilderWithWatch(ts.createSolutionBuilderWithWatchHost(stryMutAct_9fa48("63") ? {} : (stryCov_9fa48("63"), __assign(__assign({}, ts.sys), { readFile: function (path) {
                    var _a;
                    if (stryMutAct_9fa48("64")) {
                        { }
                    }
                    else {
                        stryCov_9fa48("64");
                        logger.info((stryMutAct_9fa48("65") ? "" : (stryCov_9fa48("65"), 'read file! ')) + path);
                        var file = stryMutAct_9fa48("66") ? ts.sys.readFile(path).replace('// @ts-nocheck', '') : (stryCov_9fa48("66"), (_a = ts.sys.readFile(path)) === null || _a === void 0 ? void 0 : _a.replace(stryMutAct_9fa48("67") ? "" : (stryCov_9fa48("67"), '// @ts-nocheck'), stryMutAct_9fa48("68") ? "Stryker was here!" : (stryCov_9fa48("68"), '')));
                        return file;
                    }
                } })), undefined, function (error) {
                if (stryMutAct_9fa48("69")) {
                    { }
                }
                else {
                    stryCov_9fa48("69");
                    logger.info((stryMutAct_9fa48("70") ? "" : (stryCov_9fa48("70"), 'got error ')) + JSON.stringify(error));
                }
            }, function (status) {
                if (stryMutAct_9fa48("71")) {
                    { }
                }
                else {
                    stryCov_9fa48("71");
                    logger.info(stryMutAct_9fa48("72") ? "" : (stryCov_9fa48("72"), 'got status'));
                }
            }, function (summary) {
                if (stryMutAct_9fa48("73")) {
                    { }
                }
                else {
                    stryCov_9fa48("73");
                    logger.info((stryMutAct_9fa48("74") ? "" : (stryCov_9fa48("74"), 'got summary: ')) + summary.messageText.toString());
                }
            }), // Dit gaat niet goed
            stryMutAct_9fa48("75") ? [] : (stryCov_9fa48("75"), [stryMutAct_9fa48("76") ? "" : (stryCov_9fa48("76"), '../single-typescript-checker/custom-tsconfig.json')]), {}); // '../single-typescript-checker/custom-tsconfig.json'
            compiler.build();
        }
    }
    TypescriptCheckerHandler.inject = (0, plugin_1.tokens)(plugin_1.commonTokens.logger);
    return TypescriptCheckerHandler;
}());
exports.TypescriptCheckerHandler = TypescriptCheckerHandler;
