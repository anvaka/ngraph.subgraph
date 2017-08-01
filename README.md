# ngraph.subgraph

Builds a subgraph of a graph for a set of nodes.

Usage:

``` js
// Let's say you have a `srcGraph` with two edges:
// digraph srcGraph {
//   a -> b;
//   b -> c;
// }

var getSubgraph = require('ngraph.subgraph');
var g1 = getSubgraph(new Set(['a', 'b']), srcGraph);

// Now  g1 has both `a` and `b`, and edge between them:
// digraph g1 {
//   a -> b
// }

// If you pass just 'a', and 'c' - no edge will be present in g2:
var g2 = getSubgraph(new Set(['a', 'c'], srcGraph);

// digraph g2 {
//   a;
//   c;
// }

```

# license

MIT
