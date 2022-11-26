
#include <vector>
#include <numeric>
#include <unordered_set>
using namespace std;

class UnionFind {
    
    vector<int> rank;
    vector<int> parent;

public:
    explicit UnionFind(size_t MAX_COORDINATE_POINT) {
        rank.resize(2 * MAX_COORDINATE_POINT + 1);
        parent.resize(2 * MAX_COORDINATE_POINT + 1);
        iota(parent.begin(), parent.end(), 0);
    }

    int findParent(int index) {
        if (parent[index] != index) {
            parent[index] = findParent(parent[index]);
        }
        return parent[index];
    }

    void joinByRank(int first, int second) {
        if (rank[first] > rank[second]) {
            parent[second] = first;
            rank[first] += rank[second] + 1;
        } else {
            parent[first] = second;
            rank[second] += rank[first] + 1;
        }
    }
};

class Solution {
    
    inline static size_t MAX_COORDINATE_POINT = pow(10, 4);

public:
    int removeStones(const vector<vector<int>>& stones)const {
        UnionFind unionFind(MAX_COORDINATE_POINT);
        joinAllGroupsWithCommonRowOrColumn(unionFind, stones);
        return findTotalStonesToBeRemoved(unionFind, stones);
    }

private:
    void joinAllGroupsWithCommonRowOrColumn(UnionFind& unionFind, const vector<vector<int>>& stones) const {
        for (const auto& point : stones) {
            int parentFirst = unionFind.findParent(point[0]);
            int parentSecond = unionFind.findParent(point[1] + MAX_COORDINATE_POINT + 1);
            if (parentFirst != parentSecond) {
                unionFind.joinByRank(parentFirst, parentSecond);
            }
        }
    }

    int findTotalStonesToBeRemoved(UnionFind& unionFind, const vector<vector<int>>& stones) const {
        unordered_set<int> unionGroups;
        for (const auto& point : stones) {
            unionGroups.insert(unionFind.findParent(point[0]));
        }
        return stones.size() - unionGroups.size();
    }
};
