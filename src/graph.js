/*jslint browser:true*/
/*global Saga*/

Saga.Graph = function (m) {
    "use strict";
    var pub,
        debug = Saga.Debug,
        u = Saga.Util,
        map = m,
        extractKeys = function (obj) {
            return u.keys(obj);
        },
        sorter = function (a, b) {
            return parseFloat(a) - parseFloat(b);
        },
        findPaths = function (map, start, end, infinity) {
            infinity = infinity || Infinity;

            var costs = {},
                open = {
                    '0': [start]
                },
                predecessors = {},
                keys,
                addToOpen = function (cost, vertex) {
                    var key = String(cost);
                    if (!open[key]) {
                        open[key] = [];
                    }
                    open[key].push(vertex);
                },

                key,
                bucket,
                node,
                currentCost,
                adjacentNodes,

                vertex,

                cost,
                totalCost,
                vertexCost;

            costs[start] = 0;

            while (open) {
                if (!(keys = u.keys(open)).length) {
                    break;
                }

                keys.sort(sorter);

                key = keys[0];
                bucket = open[key];
                node = bucket.shift();
                currentCost = parseFloat(key);
                adjacentNodes = map[node] || {};

                if (!bucket.length) {
                    delete open[key];
                }

                for (vertex in adjacentNodes) {
                    if (Object.prototype.hasOwnProperty.call(adjacentNodes, vertex)) {
                        cost = adjacentNodes[vertex];
                        totalCost = cost + currentCost;
                        vertexCost = costs[vertex];

                        if ((vertexCost === undefined) || (vertexCost > totalCost)) {
                            costs[vertex] = totalCost;
                            addToOpen(totalCost, vertex);
                            predecessors[vertex] = node;
                        }
                    }
                }
            }

            if (costs[end] === undefined) {
                return null;
            } else {
                return predecessors;
            }

        },
        extractShortest = function (predecessors, end) {
            var nodes = [],
                u = end,
                predecessor;

            while (u) {
                nodes.push(u);
                predecessor = predecessors[u];
                u = predecessors[u];
            }

            nodes.reverse();
            return nodes;
        },
        findShortestPath = function (map, nodes) {
            var start = nodes.shift(),
                end,
                predecessors,
                path = [],
                shortest;

            while (nodes.length) {
                end = nodes.shift();
                predecessors = findPaths(map, start, end);

                if (predecessors) {
                    shortest = extractShortest(predecessors, end);
                    if (nodes.length) {
                        path.push.apply(path, shortest.slice(0, -1));
                    } else {
                        return path.concat(shortest);
                    }
                } else {
                    return null;
                }
                start = end;
            }
        };

    pub = {
        findShortestPath: function (start, end) {
            return findShortestPath(map, [start, end]);
        }
    };

    return pub;
};