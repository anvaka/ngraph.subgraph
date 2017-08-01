var test = require('tap').test;

var getSubgraph = require('../');
var createGraph = require('ngraph.graph');

test('it can create a subset', function (t) {
  var srcGraph = createGraph({ uniqueLinkId: true });
  srcGraph.addNode(1, 'hello');

  srcGraph.addLink(1, 2, 42);
  srcGraph.addLink(2, 3);
  
  var g = getSubgraph(new Set([1, 2]), srcGraph);

  t.equals(g.getLinksCount(), 1, 'Only one link');
  t.ok(g.hasLink(1, 2), 'link is correct');
  t.equals(g.getLink(1, 2).data, 42, 'link data is correct');

  t.equals(g.getNodesCount(), 2, 'Only two nodes');
  t.ok(g.getNode(1), 'First node is here');
  t.ok(g.getNode(2), 'Second node is here');
  t.equals(g.getNode(1).data, 'hello', 'Second node is here');

  t.end();
});

test('it can handle isolated nodes', function (t) {
  var srcGraph = createGraph({ uniqueLinkId: true });
  srcGraph.addNode('a', 'hello');

  srcGraph.addLink('a', 'b');
  srcGraph.addLink('b', 'c');
  
  var g = getSubgraph(new Set(['a', 'c']), srcGraph);

  t.equals(g.getLinksCount(), 0, 'No lihnks');
  t.equals(g.getNodesCount(), 2, 'Only two nodes');

  t.ok(g.getNode('a'), 'First node is here');
  t.ok(g.getNode('c'), 'Second node is here');
  t.equals(g.getNode('a').data, 'hello', 'Second node is here');

  t.end();
});
