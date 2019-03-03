class Graph {
    constructor() {
        this.nodes = [];
        this.adjacencyList = {};
    }

    addNode(...node) {
        node.forEach(item => {
            this.nodes.push(item);
            this.adjacencyList[item] = [];
        });
    }

    addEdge(node1, node2, weight) {
        this.adjacencyList[node1].push({ node: node2, weight: weight });
        this.adjacencyList[node2].push({ node: node1, weight: weight });
    }

    showEdges() {
        for (let key in this.adjacencyList) {
            let [n1, n2] = this.adjacencyList[key];
            console.log(`Node: ${key}
            Node: ${ n1.node}, weight: ${n1.weight}    
            Node: ${ n2.node}, weight: ${n2.weight}`);
        }
    }

    findPaths(startNode, endNode) {
        console.log(`Start: ${startNode} \nEnd: ${endNode}`);
        let visitedNodes = [], currentNode = startNode, ended = false, traversedWeights = [];

        while (!ended) {
            visitedNodes.push(currentNode);
            let min = Math.min(...this.adjacencyList[currentNode]
                .filter(item => !visitedNodes.includes(item.node))
                .map(item => item.weight));
            currentNode = this.adjacencyList[currentNode].filter(node => node.weight === min)[0].node;
            traversedWeights.push(min);
    
            if (currentNode === endNode) visitedNodes.push(currentNode), ended = true;
        }

        let path = visitedNodes.map((node, index) => ([node, traversedWeights[index] ? traversedWeights[index] : ''])).flat();
        path.pop();
        console.log(`Path: ${ path.join(' => ')} \nFullWeight = ${ traversedWeights.reduce((A, I) => A + I)}`);
    }
};

let map = new Graph();
map.addNode('A', 'B', 'C', 'D');
map.addEdge('A', 'B', 4);
map.addEdge('A', 'C', 9);
map.addEdge('C', 'D', 2);
map.addEdge('B', 'D', 6);
//map.addEdge('D', 'E', 1);

map.showEdges();

map.findPaths('A', 'D');