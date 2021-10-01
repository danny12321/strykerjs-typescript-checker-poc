"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.SingleTypescriptChecker = exports.create = void 0;
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
var check_1 = require("@stryker-mutator/api/check");
var plugin_1 = require("@stryker-mutator/api/plugin");
var typescript_checker_handler_1 = require("./typescript-checker-handler");
singleTypescriptCheckerLoggerFactory.inject = (0, plugin_1.tokens)(plugin_1.commonTokens.getLogger, plugin_1.commonTokens.target); // eslint-disable-next-line @typescript-eslint/ban-types
function singleTypescriptCheckerLoggerFactory(loggerFactory, target) {
    var _a;
    if (stryMutAct_9fa48("3")) {
        { }
    }
    else {
        stryCov_9fa48("3");
        var targetName = stryMutAct_9fa48("4") ? (target === null || target === void 0 ? void 0 : target.name) && SingleTypescriptChecker.name : (stryCov_9fa48("4"), (_a = (stryMutAct_9fa48("5") ? target.name : (stryCov_9fa48("5"), target === null || target === void 0 ? void 0 : target.name))) !== null && _a !== void 0 ? _a : SingleTypescriptChecker.name);
        var category = (stryMutAct_9fa48("8") ? targetName !== SingleTypescriptChecker.name : stryMutAct_9fa48("7") ? false : stryMutAct_9fa48("6") ? true : (stryCov_9fa48("6", "7", "8"), targetName === SingleTypescriptChecker.name)) ? SingleTypescriptChecker.name : stryMutAct_9fa48("9") ? "" : (stryCov_9fa48("9"), SingleTypescriptChecker.name + "." + targetName);
        return loggerFactory(category);
    }
}
create.inject = (0, plugin_1.tokens)(plugin_1.commonTokens.injector);
function create(injector) {
    if (stryMutAct_9fa48("10")) {
        { }
    }
    else {
        stryCov_9fa48("10");
        return injector.provideFactory(plugin_1.commonTokens.logger, singleTypescriptCheckerLoggerFactory, plugin_1.Scope.Transient).injectClass(SingleTypescriptChecker);
    }
}
exports.create = create;
var SingleTypescriptChecker = /** @class */ (function () {
    function SingleTypescriptChecker(logger, options) {
        this.logger = logger;
        if (stryMutAct_9fa48("11")) {
            { }
        }
        else {
            stryCov_9fa48("11");
            try {
                if (stryMutAct_9fa48("12")) {
                    { }
                }
                else {
                    stryCov_9fa48("12");
                    new typescript_checker_handler_1.TypescriptCheckerHandler(this.logger, options);
                    logger.info(options.tempDirName);
                }
            }
            catch (e) {
                if (stryMutAct_9fa48("13")) {
                    { }
                }
                else {
                    stryCov_9fa48("13");
                    console.log(e);
                }
            }
        }
    }
    SingleTypescriptChecker.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (stryMutAct_9fa48("14")) {
                    { }
                }
                else {
                    stryCov_9fa48("14");
                    this.logger.info(stryMutAct_9fa48("15") ? "" : (stryCov_9fa48("15"), 'INIT SINGLETYPESCRIPTCHECKER'));
                }
                return [2 /*return*/];
            });
        });
    };
    SingleTypescriptChecker.prototype.check = function (mutant) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (stryMutAct_9fa48("16")) {
                    { }
                }
                else {
                    stryCov_9fa48("16");
                    return [2 /*return*/, new Promise(function (resolve) {
                            if (stryMutAct_9fa48("17")) {
                                { }
                            }
                            else {
                                stryCov_9fa48("17");
                                setTimeout(function () {
                                    if (stryMutAct_9fa48("18")) {
                                        { }
                                    }
                                    else {
                                        stryCov_9fa48("18");
                                        resolve(stryMutAct_9fa48("19") ? {} : (stryCov_9fa48("19"), {
                                            status: check_1.CheckStatus.Passed
                                        }));
                                    }
                                }, 500);
                            }
                        })];
                }
                return [2 /*return*/];
            });
        });
    }; // private bla(params: string): number[] {
    SingleTypescriptChecker.inject = (0, plugin_1.tokens)(plugin_1.commonTokens.logger, plugin_1.commonTokens.options);
    return SingleTypescriptChecker;
}());
exports.SingleTypescriptChecker = SingleTypescriptChecker;
