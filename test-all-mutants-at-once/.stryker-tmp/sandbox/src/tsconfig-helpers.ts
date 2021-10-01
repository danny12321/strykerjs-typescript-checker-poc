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

import path from 'path';
import ts from 'typescript';
import semver from 'semver'; // Override some compiler options that have to do with code quality. When mutating, we're not interested in the resulting code quality
// See https://github.com/stryker-mutator/stryker-js/issues/391 for more info

const COMPILER_OPTIONS_OVERRIDES: Readonly<Partial<ts.CompilerOptions>> = Object.freeze(stryMutAct_9fa48("20") ? {} : (stryCov_9fa48("20"), {
  allowUnreachableCode: stryMutAct_9fa48("21") ? false : (stryCov_9fa48("21"), true),
  noUnusedLocals: stryMutAct_9fa48("22") ? true : (stryCov_9fa48("22"), false),
  noUnusedParameters: stryMutAct_9fa48("23") ? true : (stryCov_9fa48("23"), false)
})); // When we're running in 'single-project' mode, we can safely disable emit

const NO_EMIT_OPTIONS_FOR_SINGLE_PROJECT: Readonly<Partial<ts.CompilerOptions>> = Object.freeze(stryMutAct_9fa48("24") ? {} : (stryCov_9fa48("24"), {
  noEmit: stryMutAct_9fa48("25") ? false : (stryCov_9fa48("25"), true),
  incremental: stryMutAct_9fa48("26") ? true : (stryCov_9fa48("26"), false),
  // incremental and composite off: https://github.com/microsoft/TypeScript/issues/36917
  composite: stryMutAct_9fa48("27") ? true : (stryCov_9fa48("27"), false),
  declaration: stryMutAct_9fa48("28") ? true : (stryCov_9fa48("28"), false)
})); // When we're running in 'project references' mode, we need to enable declaration output

const LOW_EMIT_OPTIONS_FOR_PROJECT_REFERENCES: Readonly<Partial<ts.CompilerOptions>> = Object.freeze(stryMutAct_9fa48("29") ? {} : (stryCov_9fa48("29"), {
  emitDeclarationOnly: stryMutAct_9fa48("30") ? false : (stryCov_9fa48("30"), true),
  noEmit: stryMutAct_9fa48("31") ? true : (stryCov_9fa48("31"), false),
  declarationMap: stryMutAct_9fa48("32") ? true : (stryCov_9fa48("32"), false)
}));
export function guardTSVersion(): void {
  if (stryMutAct_9fa48("33")) {
    {}
  } else {
    stryCov_9fa48("33");

    if (stryMutAct_9fa48("36") ? false : stryMutAct_9fa48("35") ? true : stryMutAct_9fa48("34") ? semver.satisfies(ts.version, '>=3.6') : (stryCov_9fa48("34", "35", "36"), !semver.satisfies(ts.version, stryMutAct_9fa48("37") ? "" : (stryCov_9fa48("37"), '>=3.6')))) {
      if (stryMutAct_9fa48("38")) {
        {}
      } else {
        stryCov_9fa48("38");
        throw new Error(stryMutAct_9fa48("39") ? `` : (stryCov_9fa48("39"), `@stryker-mutator/typescript-checker only supports typescript@3.6 our higher. Found typescript@${ts.version}`));
      }
    }
  }
}
/**
 * Determines whether or not to use `--build` mode based on "references" being there in the config file
 * @param tsconfigFileName The tsconfig file to parse
 */

export function determineBuildModeEnabled(tsconfigFileName: string): boolean {
  if (stryMutAct_9fa48("40")) {
    {}
  } else {
    stryCov_9fa48("40");
    const tsconfigFile = ts.sys.readFile(tsconfigFileName);

    if (stryMutAct_9fa48("43") ? false : stryMutAct_9fa48("42") ? true : stryMutAct_9fa48("41") ? tsconfigFile : (stryCov_9fa48("41", "42", "43"), !tsconfigFile)) {
      if (stryMutAct_9fa48("44")) {
        {}
      } else {
        stryCov_9fa48("44");
        throw new Error(stryMutAct_9fa48("45") ? `` : (stryCov_9fa48("45"), `File "${tsconfigFileName}" not found!`));
      }
    }

    const useProjectReferences = ((stryMutAct_9fa48("46") ? "" : (stryCov_9fa48("46"), 'references')) in ts.parseConfigFileTextToJson(tsconfigFileName, tsconfigFile).config);
    return useProjectReferences;
  }
}
/**
 * Overrides some options to speed up compilation and disable some code quality checks we don't want during mutation testing
 * @param parsedConfig The parsed config file
 * @param useBuildMode whether or not `--build` mode is used
 */

export function overrideOptions(parsedConfig: {
  config?: any;
}, useBuildMode: boolean): string {
  if (stryMutAct_9fa48("47")) {
    {}
  } else {
    stryCov_9fa48("47");
    const config = stryMutAct_9fa48("48") ? {} : (stryCov_9fa48("48"), { ...parsedConfig.config,
      compilerOptions: stryMutAct_9fa48("49") ? {} : (stryCov_9fa48("49"), { ...(stryMutAct_9fa48("50") ? parsedConfig.config.compilerOptions : (stryCov_9fa48("50"), parsedConfig.config?.compilerOptions)),
        ...COMPILER_OPTIONS_OVERRIDES,
        ...(useBuildMode ? LOW_EMIT_OPTIONS_FOR_PROJECT_REFERENCES : NO_EMIT_OPTIONS_FOR_SINGLE_PROJECT)
      })
    });
    return JSON.stringify(config);
  }
}
/**
 * Retrieves the referenced config files based on parsed configuration
 * @param parsedConfig The parsed config file
 * @param fromDirName The directory where to resolve from
 */

export function retrieveReferencedProjects(parsedConfig: {
  config?: any;
}, fromDirName: string): string[] {
  if (stryMutAct_9fa48("51")) {
    {}
  } else {
    stryCov_9fa48("51");

    if (stryMutAct_9fa48("53") ? false : stryMutAct_9fa48("52") ? true : (stryCov_9fa48("52", "53"), Array.isArray(stryMutAct_9fa48("54") ? parsedConfig.config.references : (stryCov_9fa48("54"), parsedConfig.config?.references)))) {
      if (stryMutAct_9fa48("55")) {
        {}
      } else {
        stryCov_9fa48("55");
        return stryMutAct_9fa48("56") ? parsedConfig.config.references.map((reference: ts.ProjectReference) => path.resolve(fromDirName, ts.resolveProjectReferencePath(reference))) : (stryCov_9fa48("56"), parsedConfig.config?.references.map(stryMutAct_9fa48("57") ? () => undefined : (stryCov_9fa48("57"), (reference: ts.ProjectReference) => path.resolve(fromDirName, ts.resolveProjectReferencePath(reference)))));
      }
    }

    return stryMutAct_9fa48("58") ? ["Stryker was here"] : (stryCov_9fa48("58"), []);
  }
}
/**
 * Replaces backslashes with forward slashes (used by typescript)
 * @param fileName The file name that may contain backslashes `\`
 * @returns posix and ts complaint file name (with `/`)
 */

export function toPosixFileName(fileName: string): string {
  if (stryMutAct_9fa48("59")) {
    {}
  } else {
    stryCov_9fa48("59");
    return fileName.replace(/\\/g, stryMutAct_9fa48("60") ? "" : (stryCov_9fa48("60"), '/'));
  }
}