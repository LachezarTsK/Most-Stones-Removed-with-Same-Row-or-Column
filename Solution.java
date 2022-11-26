
import java.util.Set;
import java.util.HashSet;
import java.util.stream.IntStream;

public class Solution {

    private static final int MAX_COORDINATE_POINT = (int) Math.pow(10, 4);

    public int removeStones(int[][] stones) {
        UnionFind unionFind = new UnionFind(MAX_COORDINATE_POINT);
        joinAllGroupsWithCommonRowOrColumn(unionFind, stones);
        return findTotalStonesToBeRemoved(unionFind, stones);
    }

    private void joinAllGroupsWithCommonRowOrColumn(UnionFind unionFind, int[][] stones) {
        for (int i = 0; i < stones.length; ++i) {
            int parentFirst = unionFind.findParent(stones[i][0]);
            int parentSecond = unionFind.findParent(stones[i][1] + MAX_COORDINATE_POINT + 1);
            if (parentFirst != parentSecond) {
                unionFind.joinByRank(parentFirst, parentSecond);
            }
        }
    }

    private int findTotalStonesToBeRemoved(UnionFind unionFind, int[][] stones) {
        Set<Integer> unionGroups = new HashSet<>();
        for (int[] point : stones) {
            unionGroups.add(unionFind.findParent(point[0]));
        }
        return stones.length - unionGroups.size();
    }
}

class UnionFind {

    private final int[] rank;
    private final int[] parent;

    public UnionFind(int MAX_COORDINATE_POINT) {
        rank = new int[2 * MAX_COORDINATE_POINT + 1];
        parent = IntStream.rangeClosed(0, 2 * MAX_COORDINATE_POINT + 1).toArray();
    }

    public int findParent(int index) {
        if (parent[index] != index) {
            parent[index] = findParent(parent[index]);
        }
        return parent[index];
    }

    public void joinByRank(int first, int second) {
        if (rank[first] > rank[second]) {
            parent[second] = first;
            rank[first] += rank[second] + 1;
        } else {
            parent[first] = second;
            rank[second] += rank[first] + 1;
        }
    }
}
