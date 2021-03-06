const optionFluid = (lines, show = true) => {
  var option = {
    series: [
      {
        type: 'lines',
        coordinateSystem: 'arcgis',
        data: lines,
        polyline: show,
        effect: {
          show: show,
          // symbol: 'arrow',
          period: 3,
          trailLength: 0.1,
          symbolSize: 3
        },
        lineStyle: {
          normal: {
            color: function (params) {
              if (params.data.type == 'Sewage') {
                return '#8F4E35';
              } else if (params.data.type == 'Rain') {
                return '#33CC33';
              } else {
                return '#009999';
              }
            },
            opacity: 0.6,
            width: 0.0
          }
        }
      }
    ]
  };
  return option;
};

const backtracking = (layer, start) => {
  const graph = {}; // OutNode -> InNode
  const nameOutMap = {}; // Name -> OutNode
  const inNameMap = {}; // OutNode -> Name

  layer.features.forEach(feature => {
    let { Name, InNode, OutNode } = feature.properties;
    // Name = Name.trim();
    // InNode = InNode.trim();
    // OutNode = OutNode.trim();
    nameOutMap[Name] = OutNode;
    inNameMap[InNode] = Name;
    if (graph[OutNode] == undefined) {
      graph[OutNode] = [];
    }
    graph[OutNode].push(InNode);
  });
  // handle start
  if (start.indexOf('Conduits') > 0) {
    start = nameOutMap[start];
  }
  // dfs
  const dfs = (graph = {}, start, path = [], res = [], line_res = []) => {
    let neighbors = graph[start];
    if (neighbors instanceof Array) {
      neighbors.forEach(next => {
        line_res.push(inNameMap[next]);
        path.push(next);
        dfs(graph, next, path, res, line_res);
        path.pop();
      });
    } else {
      path.forEach(e => {
        if (e) {
          res.push(e);
        }
      });
    }
  };

  const path = [];
  const res = [];
  const line_res = [];
  dfs(graph, start, path, res, line_res);
  return {
    point: res,
    line: line_res
  };
};

export { backtracking, optionFluid };
