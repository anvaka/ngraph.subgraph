var createGraph = require('ngraph.graph');

module.exports = getSubGraph;

/**
 * Returns only a subgraph of a srcGraph for a set of `nodeSet`.
 * 
 * @params {Set} nodeSet set of node identifiers that should be used in the
 * subgraph. Note: if srcGraph doesn't contain a node from this specified, an
 * exception is thrown.
 * @param {ngraph.graph} srcGraph - origianal graph.
 * 
 * @returns {ngraph.graph} Graph object that has all nodes from a nodeSet.
 */
function getSubGraph(nodeSet, srcGraph) {
  var graph = createGraph({
    uniqueLinkId: false
  });

  nodeSet.forEach(function(nodeId) {
    var srcNode = srcGraph.getNode(nodeId);
    if (!srcNode) {
      throw new Error('Source graph does not have node from the subset: ' + nodeId);
    }

    graph.addNode(nodeId, srcNode.data);

    srcGraph.forEachLinkedNode(nodeId, function (otherNode, link) {
      if (!nodeSet.has(otherNode.id)) return; // no such node in this subset.
      graph.addLink(nodeId, otherNode.id, link.data);
    }, true);
  });

  return graph;
}
