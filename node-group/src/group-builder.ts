import { IDependencyTree } from "./tree.js";

export class groupBuilder3000 {
    private dependencyTree: IDependencyTree;
    private nodeGroups: string[][] = [];
    private usedNodes: string[] = [];
    public runCounter = 0;

    constructor(dependencyTree: IDependencyTree) {
        this.dependencyTree = dependencyTree;
    }

    public getNextNodeGroups() {
        this.nodeGroups = [];
        this.usedNodes = [];

        for (const activeNode in this.dependencyTree) { // active node loop
            if (!this.shouldUseNode(activeNode)) continue;
            this.useNode(activeNode);

            let currentNodeGroup = [activeNode];
            let ignoreNodes = [...this.dependencyTree[activeNode].dependencies];

            for (const searchNode in this.dependencyTree) {
                if (searchNode === activeNode || !this.shouldUseNode(searchNode)) continue;

                if (this.allowedInGroup(ignoreNodes, currentNodeGroup, searchNode)) {
                    this.useNode(searchNode);
                    currentNodeGroup.push(searchNode);
                    ignoreNodes = [...ignoreNodes, ...this.dependencyTree[searchNode].dependencies];
                }
            }

            this.nodeGroups.push(currentNodeGroup);
        }

        this.runCounter += this.nodeGroups.length;
        return this.nodeGroups;
    }

    private shouldUseNode(node: string) {
        if (this.usedNodes.includes(node)) false;
        return this.dependencyTree[node].mutantCount > 0;
    }

    private allowedInGroup(ignoreNodes: string[], currentNodeGroup: string[], searchNode: string): boolean {
        if (ignoreNodes.includes(searchNode)) return false;

        for (const groupNode of this.dependencyTree[searchNode].dependencies) {
            if (currentNodeGroup.includes(groupNode)) return false;
        }

        return true;
    }

    private useNode(node: string) {
        this.dependencyTree[node].mutantCount -= 1;
        this.usedNodes.push(node);
    }
}
