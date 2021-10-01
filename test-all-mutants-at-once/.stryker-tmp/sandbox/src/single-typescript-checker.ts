// @ts-nocheck
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

import { Checker, CheckResult, CheckStatus } from '@stryker-mutator/api/check';
import { tokens, commonTokens, PluginContext, Injector, Scope } from '@stryker-mutator/api/plugin';
import { Logger, LoggerFactoryMethod } from '@stryker-mutator/api/logging';
import { Mutant, StrykerOptions } from '@stryker-mutator/api/core'; // import * as pluginTokens from './plugin-tokens';

import { TypescriptCheckerHandler } from './typescript-checker-handler';
singleTypescriptCheckerLoggerFactory.inject = tokens(commonTokens.getLogger, commonTokens.target); // eslint-disable-next-line @typescript-eslint/ban-types

function singleTypescriptCheckerLoggerFactory(loggerFactory: LoggerFactoryMethod, target: Function | undefined) {
  if (stryMutAct_9fa48("3")) {
    {}
  } else {
    stryCov_9fa48("3");
    const targetName = stryMutAct_9fa48("4") ? target?.name && SingleTypescriptChecker.name : (stryCov_9fa48("4"), (stryMutAct_9fa48("5") ? target.name : (stryCov_9fa48("5"), target?.name)) ?? SingleTypescriptChecker.name);
    const category = (stryMutAct_9fa48("8") ? targetName !== SingleTypescriptChecker.name : stryMutAct_9fa48("7") ? false : stryMutAct_9fa48("6") ? true : (stryCov_9fa48("6", "7", "8"), targetName === SingleTypescriptChecker.name)) ? SingleTypescriptChecker.name : stryMutAct_9fa48("9") ? `` : (stryCov_9fa48("9"), `${SingleTypescriptChecker.name}.${targetName}`);
    return loggerFactory(category);
  }
}

create.inject = tokens(commonTokens.injector);
export function create(injector: Injector<PluginContext>): SingleTypescriptChecker {
  if (stryMutAct_9fa48("10")) {
    {}
  } else {
    stryCov_9fa48("10");
    return injector.provideFactory(commonTokens.logger, singleTypescriptCheckerLoggerFactory, Scope.Transient).injectClass(SingleTypescriptChecker);
  }
}
export class SingleTypescriptChecker implements Checker {
  public static inject = tokens(commonTokens.logger, commonTokens.options);

  constructor(private readonly logger: Logger, options: StrykerOptions) {
    if (stryMutAct_9fa48("11")) {
      {}
    } else {
      stryCov_9fa48("11");

      try {
        if (stryMutAct_9fa48("12")) {
          {}
        } else {
          stryCov_9fa48("12");
          new TypescriptCheckerHandler(this.logger, options);
          logger.info(options.tempDirName);
        }
      } catch (e) {
        if (stryMutAct_9fa48("13")) {
          {}
        } else {
          stryCov_9fa48("13");
          console.log(e);
        }
      }
    }
  }

  public async init(): Promise<void> {
    if (stryMutAct_9fa48("14")) {
      {}
    } else {
      stryCov_9fa48("14");
      this.logger.info(stryMutAct_9fa48("15") ? "" : (stryCov_9fa48("15"), 'INIT SINGLETYPESCRIPTCHECKER'));
    }
  }

  public async check(mutant: Mutant): Promise<CheckResult> {
    if (stryMutAct_9fa48("16")) {
      {}
    } else {
      stryCov_9fa48("16");
      return new Promise(resolve => {
        if (stryMutAct_9fa48("17")) {
          {}
        } else {
          stryCov_9fa48("17");
          setTimeout(() => {
            if (stryMutAct_9fa48("18")) {
              {}
            } else {
              stryCov_9fa48("18");
              resolve(stryMutAct_9fa48("19") ? {} : (stryCov_9fa48("19"), {
                status: CheckStatus.Passed
              }));
            }
          }, 500);
        }
      });
    }
  } // private bla(params: string): number[] {
  //   return new Array<number>();
  // }


}