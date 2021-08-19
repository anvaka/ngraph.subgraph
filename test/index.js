const test = require('tap').test;

const getSubgraph = require('../');
const createGraph = require('ngraph.graph');

test('it can create a subset', function (t) {
  const srcGraph = createGraph();
  srcGraph.addNode(1, 'hello');

  srcGraph.addLink(1, 2, 42);
  srcGraph.addLink(2, 3);
  
  const g = getSubgraph(new Set([1, 2]), srcGraph);

  t.equal(g.getLinksCount(), 1, 'Only one link');
  t.ok(g.hasLink(1, 2), 'link is correct');
  t.equal(g.getLink(1, 2).data, 42, 'link data is correct');

  t.equal(g.getNodesCount(), 2, 'Only two nodes');
  t.ok(g.getNode(1), 'First node is here');
  t.ok(g.getNode(2), 'Second node is here');
  t.equal(g.getNode(1).data, 'hello', 'Second node is here');

  t.end();
});

test('it can handle isolated nodes', function (t) {
  const srcGraph = createGraph();
  srcGraph.addNode('a', 'hello');

  srcGraph.addLink('a', 'b');
  srcGraph.addLink('b', 'c');
  
  const g = getSubgraph(new Set(['a', 'c']), srcGraph);

  t.equal(g.getLinksCount(), 0, 'No links');
  t.equal(g.getNodesCount(), 2, 'Only two nodes');

  t.ok(g.getNode('a'), 'First node is here');
  t.ok(g.getNode('c'), 'Second node is here');
  t.equal(g.getNode('a').data, 'hello', 'Second node is here');

  t.end();
});

test('it throws on absent node', t => {
  const srcGraph = createGraph();
  srcGraph.addNode(1, 'hello');

  t.throws(() => getSubgraph(new Set([2]), srcGraph), 'No such node');
  t.end();
});