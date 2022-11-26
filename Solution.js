
/**
 * @param {number[][]} stones
 * @return {number}
 */
var removeStones = function (stones) {
    this.MAX_COORDINATE_POINT = Math.pow(10, 4);
    const unionFind = new UnionFind(this.MAX_COORDINATE_POINT);
    joinAllGroupsWithCommonRowOrColumn(unionFind, stones);
    return findTotalStonesToBeRemoved(unionFind, stones);
};

/**
 * @param {UnionFind} unionFind
 * @param {number[][]} stones 
 * @return {void}
 */
function joinAllGroupsWithCommonRowOrColumn(unionFind, stones) {
    for (let i = 0; i < stones.length; ++i) {
        let parentFirst = unionFind.findParent(stones[i][0]);
        let parentSecond = unionFind.findParent(stones[i][1] + this.MAX_COORDINATE_POINT + 1);
        if (parentFirst !== parentSecond) {
            unionFind.joinByRank(parentFirst, parentSecond);
        }
    }
}

/**
 * @param {UnionFind} unionFind
 * @param {number[][]} stones 
 * @return {number}
 */
function findTotalStonesToBeRemoved(unionFind, stones) {
    const unionGroups = new Set();
    for (let point of stones) {
        unionGroups.add(unionFind.findParent(point[0]));
    }
    return stones.length - unionGroups.size;
}

class UnionFind {

    /**
     * @param {number} MAX_COORDINATE_POINT
     */
    constructor(MAX_COORDINATE_POINT) {
        this.rank = new Array(2 * MAX_COORDINATE_POINT + 1).fill(0);
        this.parent = Array.from(Array(2 * MAX_COORDINATE_POINT + 1).keys());
    }

    /**
     * @param {number} index
     * @return {number}
     */
    findParent(index) {
        if (this.parent[index] !== index) {
            this.parent[index] = this.findParent(this.parent[index]);
        }
        return this.parent[index];
    }

    /**
     * @param {number} first
     * @param {number} second
     * @return {void}
     */
    joinByRank(first, second) {
        if (this.rank[first] > this.rank[second]) {
            this.parent[second] = first;
            this.rank[first] += this.rank[second] + 1;
        } else {
            this.parent[first] = second;
            this.rank[second] += this.rank[first] + 1;
        }
    }
}
