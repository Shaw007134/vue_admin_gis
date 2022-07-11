// const rain_line = require("./rain_line.json")
// const sewage_line = require("./sewage_line.json")
// const distinct_line = require("./distinct_line.json")
// const distinct_rain_line = require("./distinct_rain_line.json")
import rain_line from '/public/pipe/rain_line.json';
import sewage_line from '/public/pipe/sewage_line.json';
import distinct_line from '/public/pipe/distinct_line.json';
import distinct_rain_line from '/public/pipe/distinct_rain_line.json';

const backtracking = (layerID, start) => {
  const graph = {}; // OutNode -> InNode
  const nameOutMap = {}; // Name -> OutNode
  const inNameMap = {}; // OutNode -> Name
  // build graph
  let layer;
  if (layerID === 'rain_line' || layerID == 'rain_point') {
    layer = rain_line;
  } else if (layerID === 'sewage_line' || layerID == 'sewage_point') {
    layer = sewage_line;
  } else if (layerID === 'distinct_line' || layerID == 'distinct_point') {
    layer = distinct_line;
  } else if (layerID === 'distinct_rain_line' || layerID == 'distinct_rain_point') {
    layer = distinct_rain_line;
  }

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
      // res.push([...path])
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

export { backtracking };

// const data = require("./rain_line.json")
// const start = 'YS_MA1000_Conduits03_03';

// const res = backtracking("rain_line", start)
// console.log(res)

/*
YS_MA1000_Junction03_03 [ 'YS_MA1000_Junction03_02', 'YS_BR500_Junction02_01' ]
YS_BR300_Junction04_02 [ 'YS_BR300_Junction04_01' ]
YS_MA1000_Junction03_07 [
  'YS_MA1000_Junction03_06',
  'YS_BR500_Junction07_01',
  ' YS_BR500_Junction06_01'
]
YS_MA800_Junction08_03 [ 'YS_MA800_Junction08_02' ]
YS_MA1200_Junction04_05 [ 'YS_MA1200_Junction04_04', 'YS_BR500_Junction09_01' ]
YS_MA1800_Junction05_13 [ ' YS_BR600_Junction24_02', 'YS_MA1800_Junction05_12' ]
YS_MA1800_Junction05_11 [ ' YS_BR500_Junction22_03', 'YS_MA1800_Junction05_10' ]
YS_MA1800_Junction05_07 [ ' YS_BR500_Junction11_02', 'YS_MA1800_Junction05_06' ]
YS_MA1800_Junction05_08 [ 'YS_MA1800_Junction05_07', 'YS_MA1200_Junction04_09' ]
YS_MA1800_Junction05_06 [
  'YS_MA1000_Junction07_02',
  ' YS_BR500_Junction18_02',
  ' YS_BR600_Junction19_01'
]
 YS_BR750_Junction01_02 [ ' YS_BR750_Junction01_01' ]
YS_MA800_Junction08_01 [
  'YS_MA700_Junction07_03',
  'YS_BR600_Junction36_01',
  'YS_BR600_Junction37_01'
]
YS_MA1000_Junction03_05 [
  'YS_BR300_Junction04_02',
  'YS_MA1000_Junction03_04',
  ' YS_BR500_Junction05_01'
]
YS_MA1200_Junction04_04 [ 'YS_MA1200_Junction04_03', ' YS_BR500_Junction08_01' ]
 YS_BR500_Junction25_02 [ ' YS_BR400_Junction26_01' ]
YS_MA1800_Junction05_16 [
  ' YS_BR600_Junction27_01',
  ' YS_BR500_Junction25_03',
  'YS_MA1800_Junction05_15'
]
 YS_BR500_Junction22_01 [ ' YS_BR400_Junction21_01' ]
 YS_BR500_Junction44_02 [ ' YS_BR500_Junction44_01' ]
 YS_MA1000_Junction03_02 [ ' YS_MA1000_Junction03_01' ]
YS_MA700_Junction07_03 [ 'YS_MA700_Junction07_02', 'YS_BR500_Junction34_04' ]
YS_MA800_Junction08_04 [
  'YS_MA800_Junction08_03',
  'YS_BR600_Junction38_01',
  'YS_BR600_Junction39_01'
]
YS_MA1200_Junction04_03 [ 'YS_MA1200_Junction04_02' ]
YS_MA800_Junction08_09 [
  'YS_MA800_Junction08_08',
  'YS_BR700_Junction40_01',
  'YS_BR600_Junction41_01'
]
YS_MA900_Junction09_01 [ 'YS_MA800_Junction08_10' ]
YS_MA1800_Junction05_09 [ ' YS_BR400_Junction20_01', 'YS_MA1800_Junction05_08' ]
 YS_BR500_Junction17_02 [ ' YS_BR500_Junction17_01' ]
 YS_BR500_Junction13_02 [
  ' YS_BR500_Junction13_01',
  ' YS_BR300_Junction14_01',
  ' YS_BR500_Junction12_01'
]
 YS_MA750_Junction02_01 [ ' YS_BR750_Junction01_03' ]
YS_MA1800_Junction05_20 [ ' YS_BR500_Junction31_02', 'YS_MA1800_Junction05_19' ]
YS_MA800_Junction08_07 [ 'YS_MA800_Junction08_06' ]
YS_MA1200_Junction04_01 [ 'YS_MA1000_Junction03_07', ' YS_BR300_Junction07_01' ]
YS_MA1200_Junction04_07 [ 'YS_MA1200_Junction04_06' ]
 YS_BR600_Junction24_02 [ ' YS_BR600_Junction24_01' ]
 YS_BR500_Junction22_02 [ ' YS_BR500_Junction22_01' ]
YS_MA700_Junction07_02 [ 'YS_MA700_Junction07_01' ]
YS_MA1000_Junction03_06 [ 'YS_MA1000_Junction03_05' ]
 YS_BR500_Junction31_02 [ ' YS_BR500_Junction31_01' ]
 YS_BR500_Junction29_02 [ ' YS_BR500_Junction29_01' ]
 YS_BR500_Junction25_03 [ ' YS_BR500_Junction25_02' ]
YS_MA1000_Junction07_01 [ 'YS_MA800_Junction06_01', ' YS_BR500_Junction16_03' ]
YS_MA700_Junction07_01 [
  'YS_MA500_Junction06_03',
  'YS_BR600_Junction32_01',
  'YS_BR600_Junction33_01'
]
YS_MA800_Junction08_08 [ 'YS_MA800_Junction08_07' ]
YS_MA1800_Junction05_21 [ 'YS_MA900_Junction09_01', 'YS_MA1800_Junction05_20' ]
 YS_BR500_Junction16_02 [ ' YS_BR300_Junction17_01' ]
YS_MA1000_Junction07_02 [ ' YS_BR500_Junction17_02', 'YS_MA1000_Junction07_01' ]
YS_MA1800_Junction05_17 [ ' YS_BR500_Junction28_02', 'YS_MA1800_Junction05_16' ]
YS_MA1800_Junction05_12 [ ' YS_BR500_Junction23_01', 'YS_MA1800_Junction05_11' ]
 YS_MA1000_Junction03_01 [ ' YS_MA750_Junction02_01' ]
YS_MA800_Junction06_01 [ ' YS_BR500_Junction13_02', ' YS_BR500_Junction15_01' ]
YS_MA1800_Junction05_22 [ 'YS_MA1800_Junction05_21' ]
YS_MA1800_Junction05_24 [ 'YS_BR600_Junction43_01', 'YS_MA1800_Junction05_23' ]
YS_MA1000_Junction03_04 [ 'YS_MA1000_Junction03_03', ' YS_BR400_Junction03_01' ]
YS_MA1200_Junction04_06 [ 'YS_MA1200_Junction04_05', ' YS_BR500_Junction10_01' ]
 YS_BR500_Junction44_03 [ ' YS_BR500_Junction44_04', ' YS_BR500_Junction44_02' ]
 YS_BR750_Junction01_03 [ ' YS_BR750_Junction01_02' ]
YS_MA800_Junction08_02 [ 'YS_MA800_Junction08_01' ]
YS_MA1800_Junction05_18 [ ' YS_BR500_Junction29_02', 'YS_MA1800_Junction05_17' ]
YS_MA1800_Junction05_23 [ ' YS_BR500_Junction42_01', 'YS_MA1800_Junction05_22' ]
YS_MA800_Junction08_10 [ 'YS_MA800_Junction08_09' ]
YS_MA1200_Junction04_08 [ 'YS_MA1200_Junction04_07' ]
YS_MA1200_Junction04_09 [ 'YS_MA1200_Junction04_08' ]
YS_MA1800_Junction05_19 [ ' YS_BR400_Junction30_01', 'YS_MA1800_Junction05_18' ]
YS_MA1800_Junction05_27 [ ' YS_BR500_Junction44_03', 'YS_MA1800_Junction05_26' ]
 YS_BR500_Junction16_03 [ ' YS_BR500_Junction16_02' ]
 YS_BR500_Junction18_02 [ ' YS_BR500_Junction18_01' ]
 YS_BR500_Junction11_02 [ ' YS_BR500_Junction11_01' ]
 YS_BR500_Junction22_03 [ ' YS_BR500_Junction22_02' ]
 YS_BR500_Junction28_02 [ ' YS_BR500_Junction28_01' ]
YS_MA1800_Junction05_15 [ 'YS_MA1800_Junction05_14' ]
YS_MA1800_Junction05_14 [ 'YS_MA1800_Junction05_13' ]
YS_MA1800_Junction05_10 [ 'YS_MA1800_Junction05_09' ]
YS_MA500_Junction06_03 [ 'YS_MA500_Junction06_02' ]
YS_MA500_Junction06_02 [ 'YS_MA500_Junction06_01' ]
YS_BR500_Junction34_04 [ 'YS_BR500_Junction34_03' ]
YS_BR500_Junction34_03 [ 'YS_BR500_Junction34_02' ]
YS_BR500_Junction34_02 [ 'YS_BR500_Junction34_01' ]
YS_MA800_Junction08_05 [ 'YS_MA800_Junction08_04', ' YS_BR600_Junction46_12' ]
YS_MA800_Junction08_06 [ 'YS_MA800_Junction08_05' ]
YS_MA1800_Junction05_25 [ 'YS_MA1800_Junction05_24' ]
YS_MA1800_Junction05_26 [ 'YS_MA1800_Junction05_25' ]
YS_MA2000_Junction11_01 [ 'YS_MA1800_Junction05_29' ]
YS_MA1800_Junction05_29 [ 'YS_MA1800_Junction05_28' ]
YS_MA1200_Junction04_02 [ 'YS_MA1200_Junction04_01' ]
YS_MA1800_Junction05_28 [ 'YS_MA1800_Junction05_27' ]
*/
