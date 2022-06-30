<template>
  <div class="MapView">
    <div id="viewDiv"></div>
  </div>
</template>
<script>
/* eslint-disable */
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import GeoJSONLayer from '@arcgis/core/layers/GeoJSONLayer';
import GroupLayer from '@arcgis/core/layers/GroupLayer';
import OpenStreetMapLayer from '@arcgis/core/layers/OpenStreetMapLayer';
import LayerList from '@arcgis/core/widgets/LayerList';
import BasemapToggle from '@arcgis/core/widgets/BasemapToggle';

export default {
  mounted() {
    // this.$nextTick(() => {
    this.handleMounted();
    // });
  },
  methods: {
    handleMounted() {
      const url_building = '/pipe/building.json';
      const url_zone = '/pipe/zone.json';
      const url_distinct_line = '/pipe/distinct_line.json';
      const url_distinct_point = '/pipe/distinct_point.json';
      const url_distinct_rain_line = '/pipe/distinct_rain_line.json';
      const url_distinct_rain_point = '/pipe/distinct_rain_point.json';
      const url_rain_line = '/pipe/rain_line.json';
      const url_rain_point = '/pipe/rain_point.json';
      const url_rain_out = '/pipe/rain_out.json';
      const url_sewage_line = '/pipe/sewage_line.json';
      const url_sewage_point = '/pipe/sewage_point.json';

      const template_RainManhole_2D = {
        title: '<b>所选管井相关信息：</b>',
        content: '<b>编号: </b> {Name} <br>\
                <b>井底高程: </b> {BottomElev} m <br>\
              ',
        actions: [],
        overwriteActions: true,
        opacity: 0.6
      };

      const template_RainPipeline_2D = {
        title: '<b>所选管段相关信息：</b>',
        content:
          '<b>编号: </b> {Name} <br>\
          <b>上游管井编号: </b> {InNode} <br>\
          <b>上游井底高程: </b> {InNodeElev} m <br>\
          <b>下游管井编号: </b> {OutNode} <br>\
          <b>下游井底高程: </b> {OutNodeEle} m <br>\
          <b>管始端高程: </b> {InElev} m <br>\
          <b>管末端高程: </b> {OutElev} m <br>\
          <b>管径: </b> {DN} m <br>\
          <b>长度: </b> {Length} m <br>\
          <b>使用状态: </b> {State} <br>\
              ',
        actions: [],
        overwriteActions: true,
        opacity: 0.6
      };

      const template_DistinctPipeline_2D = {
        title: '<b>所选管段相关信息：</b>',
                content:
          '<b>编号: </b> {Name} <br>\
          <b>上游管井编号: </b> {InNode} <br>\
          <b>上游井底高程: </b> {InNodeElev} m <br>\
          <b>下游管井编号: </b> {OutNode} <br>\
          <b>下游井底高程: </b> {OutNodeEle} m <br>\
          <b>管始端高程: </b> {InElev} m <br>\
          <b>管末端高程: </b> {OutElev} m <br>\
          <b>管径: </b> {DN} m <br>\
          <b>长度: </b> {Length} m <br>\
          <b>使用状态: </b> {State} <br>\
              ',

        actions: [],
        overwriteActions: true,
        opacity: 0.6
      };

      const template_DistinctManhole_2D = {
        title: '<b>所选管井相关信息：</b>',
        content: '<b>编号: </b> {Name} <br>\
                <b>井底高程: </b> {BottomElev} m <br>\
              ',
        actions: [],
        overwriteActions: true,
        opacity: 0.6
      };

      const template_DistinctRainPipeline_2D = {
        title: '<b>所选管段相关信息：</b>',
                content:
          '<b>编号: </b> {Name} <br>\
          <b>上游管井编号: </b> {InNode} <br>\
          <b>上游井底高程: </b> {InNodeElev} m <br>\
          <b>下游管井编号: </b> {OutNode} <br>\
          <b>下游井底高程: </b> {OutNodeEle} m <br>\
          <b>管始端高程: </b> {InElev} m <br>\
          <b>管末端高程: </b> {OutElev} m <br>\
          <b>管径: </b> {DN} m <br>\
          <b>长度: </b> {Length} m <br>\
          <b>使用状态: </b> {State} <br>\
              ',

        actions: [],
        overwriteActions: true,
        opacity: 0.6
      };

      const template_DistinctRainManhole_2D = {
        title: '<b>所选管井相关信息：</b>',
        content: '<b>编号: </b> {Name} <br>\
                <b>井底高程: </b> {BottomElev} m <br>\
              ',
        actions: [],
        overwriteActions: true,
        opacity: 0.6
      };

      const template_SewagePipeline_2D = {
        title: '<b>所选管段相关信息：</b>',
                content:
          '<b>编号: </b> {Name} <br>\
          <b>上游管井编号: </b> {InNode} <br>\
          <b>上游井底高程: </b> {InNodeElev} m <br>\
          <b>下游管井编号: </b> {OutNode} <br>\
          <b>下游井底高程: </b> {OutNodeEle} m <br>\
          <b>管始端高程: </b> {InElev} m <br>\
          <b>管末端高程: </b> {OutElev} m <br>\
          <b>管径: </b> {DN} m <br>\
          <b>长度: </b> {Length} m <br>\
          <b>使用状态: </b> {State} <br>\
              ',

        actions: [],
        overwriteActions: true,
        opacity: 0.6
      };

      const template_SewageManhole_2D = {
        title: '<b>所选管井相关信息：</b>',
        content: '<b>编号: </b> {Name} <br>\
                <b>井底高程: </b> {BottomElev} m <br>\
              ',
        actions: [],
        overwriteActions: true,
        opacity: 0.6
      };

      const template_building = {
        title: '<b>所选建筑物信息：</b>',
        content: '<b>名称: </b> {Name} <br><b>Level: </b> {Level}',
        actions: [],
        overwriteActions: true,
        opacity: 0.6
      };

      const template_outfall = {
        title: '<b>所选排口相关信息：</b>',
        content: '<b>索引号: </b> {FID} <br><b>名称: </b> {Name} <br>',
        actions: [],
        overwriteActions: true,
        opacity: 0.6
      };

      const template_zone = {
        title: '<b>所选分区相关信息：</b>',
        content: '<b>索引号: </b> {FID} <br><b>名称: </b> {Name} <br>',
        actions: [],
        overwriteActions: true,
        opacity: 0.6
      };

      function createFillSymbol(value, color) {
        return {
          value: value,
          symbol: {
            color: color,
            type: 'simple-fill',
            style: 'solid',
            outline: {
              style: 'none',
              width: '2px'
            }
          },
          label: value
        };
      }
      const renderer_Zone = {
        type: 'simple',
        symbol: {
          color: [0, 225, 225, 0],
          type: 'simple-fill',
          style: 'solid',
          outline: {
            style: 'solid',
            width: '2px',
            color: '#63AFF8'
          }
        }
      };

      const renderer_RainPipeline_2D = {
        type: 'unique-value',
        field: 'Level',
        defalutSymbol: {
          type: 'simple-line',
          color: '#33CC33', // Orange
          width: 2
        },
        uniqueValueInfos: [
          {
            value: 1,
            symbol: {
              type: 'simple-line',
              color: '#33CC33', // Orange
              width: 2
            }
          },
          {
            value: 2,
            symbol: {
              type: 'simple-line',
              color: 'yellow', // Orange
              width: 2
            }
          },
          {
            value: 3,
            symbol: {
              type: 'simple-line',
              color: 'red', // Orange
              width: 2
            }
          },
          {
            value: 4,
            symbol: {
              type: 'simple-line',
              color: 'grey', // Orange
              width: 2
            }
          }
        ]
      };

      const renderer_RainManhole_2D = {
        type: 'unique-value',
        field: 'Level',
        defaultSymbol: {
          type: 'simple-marker', // autocasts as new PictureMarkerSymbol()
          size: 6,
          color: 'blue',
          outline: {
            // autocasts as new SimpleLineSymbol()
            width: 0.5,
            color: 'white'
          }
        },
        uniqueValueInfos: [
          {
            value: 1,
            symbol: {
              type: 'simple-marker', // autocasts as new PictureMarkerSymbol()
              size: 6,
              color: 'lime',
              outline: {
                // autocasts as new SimpleLineSymbol()
                width: 0.5,
                color: 'white'
              }
            }
          },
          {
            value: 2,
            symbol: {
              type: 'simple-marker', // autocasts as new PictureMarkerSymbol()
              size: 6,
              color: 'yellow',
              outline: {
                // autocasts as new SimpleLineSymbol()
                width: 0.5,
                color: 'white'
              }
            }
          },
          {
            value: 3,
            symbol: {
              type: 'simple-marker', // autocasts as new PictureMarkerSymbol()
              size: 6,
              color: 'red',
              outline: {
                // autocasts as new SimpleLineSymbol()
                width: 0.5,
                color: 'white'
              }
            }
          },
          {
            value: 4,
            symbol: {
              type: 'simple-marker', // autocasts as new PictureMarkerSymbol()
              size: 6,
              color: 'grey',
              outline: {
                // autocasts as new SimpleLineSymbol()
                width: 0.5,
                color: 'white'
              }
            }
          }
        ]
      };

      const renderer_SewagePipeline_2D = {
        type: 'unique-value',
        field: 'Level',
        defalutSymbol: {
          type: 'simple-line',
          color: '#33CC33', // Orange
          width: 2
        },
        uniqueValueInfos: [
          {
            value: 1,
            symbol: {
              type: 'simple-line',
              color: 'orange', // Orange
              width: 2
            }
          },
          {
            value: 2,
            symbol: {
              type: 'simple-line',
              color: 'yellow', // Orange
              width: 2
            }
          },
          {
            value: 3,
            symbol: {
              type: 'simple-line',
              color: 'red', // Orange
              width: 2
            }
          },
          {
            value: 4,
            symbol: {
              type: 'simple-line',
              color: 'grey', // Orange
              width: 2
            }
          }
        ]
      };

      const renderer_SewageManhole_2D = {
        type: 'unique-value',
        field: 'Level',
        defaultSymbol: {
          type: 'simple-marker', // autocasts as new PictureMarkerSymbol()
          size: 6,
          color: 'blue',
          outline: {
            // autocasts as new SimpleLineSymbol()
            width: 0.5,
            color: 'white'
          }
        },
        uniqueValueInfos: [
          {
            value: 1,
            symbol: {
              type: 'simple-marker', // autocasts as new PictureMarkerSymbol()
              size: 6,
              color: 'lime',
              outline: {
                // autocasts as new SimpleLineSymbol()
                width: 0.5,
                color: 'white'
              }
            }
          },
          {
            value: 2,
            symbol: {
              type: 'simple-marker', // autocasts as new PictureMarkerSymbol()
              size: 6,
              color: 'yellow',
              outline: {
                // autocasts as new SimpleLineSymbol()
                width: 0.5,
                color: 'white'
              }
            }
          },
          {
            value: 3,
            symbol: {
              type: 'simple-marker', // autocasts as new PictureMarkerSymbol()
              size: 6,
              color: 'red',
              outline: {
                // autocasts as new SimpleLineSymbol()
                width: 0.5,
                color: 'white'
              }
            }
          },
          {
            value: 4,
            symbol: {
              type: 'simple-marker', // autocasts as new PictureMarkerSymbol()
              size: 6,
              color: 'grey',
              outline: {
                // autocasts as new SimpleLineSymbol()
                width: 0.5,
                color: 'white'
              }
            }
          }
        ]
      };

      const renderer_DistinctPipeline_2D = {
        type: 'unique-value',
        field: 'Level',
        defalutSymbol: {
          type: 'simple-line',
          color: '#33CC33', // Orange
          width: 2
        },
        uniqueValueInfos: [
          {
            value: 1,
            symbol: {
              type: 'simple-line',
              color: 'orange', // Orange
              width: 2
            }
          },
          {
            value: 2,
            symbol: {
              type: 'simple-line',
              color: 'yellow', // Orange
              width: 2
            }
          },
          {
            value: 3,
            symbol: {
              type: 'simple-line',
              color: 'red', // Orange
              width: 2
            }
          },
          {
            value: 4,
            symbol: {
              type: 'simple-line',
              color: 'grey', // Orange
              width: 2
            }
          }
        ]
      };

      const renderer_DistinctManhole_2D = {
        type: 'unique-value',
        field: 'Level',
        defaultSymbol: {
          type: 'simple-marker', // autocasts as new PictureMarkerSymbol()
          size: 6,
          color: 'blue',
          outline: {
            // autocasts as new SimpleLineSymbol()
            width: 0.5,
            color: 'white'
          }
        },
        uniqueValueInfos: [
          {
            value: 1,
            symbol: {
              type: 'simple-marker', // autocasts as new PictureMarkerSymbol()
              size: 6,
              color: 'lime',
              outline: {
                // autocasts as new SimpleLineSymbol()
                width: 0.5,
                color: 'white'
              }
            }
          },
          {
            value: 2,
            symbol: {
              type: 'simple-marker', // autocasts as new PictureMarkerSymbol()
              size: 6,
              color: 'yellow',
              outline: {
                // autocasts as new SimpleLineSymbol()
                width: 0.5,
                color: 'white'
              }
            }
          },
          {
            value: 3,
            symbol: {
              type: 'simple-marker', // autocasts as new PictureMarkerSymbol()
              size: 6,
              color: 'red',
              outline: {
                // autocasts as new SimpleLineSymbol()
                width: 0.5,
                color: 'white'
              }
            }
          },
          {
            value: 4,
            symbol: {
              type: 'simple-marker', // autocasts as new PictureMarkerSymbol()
              size: 6,
              color: 'grey',
              outline: {
                // autocasts as new SimpleLineSymbol()
                width: 0.5,
                color: 'white'
              }
            }
          }
        ]
      };

      const renderer_DistinctRainPipeline_2D = {
        type: 'unique-value',
        field: 'Level',
        defalutSymbol: {
          type: 'simple-line',
          color: '#33CC33', // Orange
          width: 2
        },
        uniqueValueInfos: [
          {
            value: 1,
            symbol: {
              type: 'simple-line',
              color: 'orange', // Orange
              width: 2
            }
          },
          {
            value: 2,
            symbol: {
              type: 'simple-line',
              color: 'yellow', // Orange
              width: 2
            }
          },
          {
            value: 3,
            symbol: {
              type: 'simple-line',
              color: 'red', // Orange
              width: 2
            }
          },
          {
            value: 4,
            symbol: {
              type: 'simple-line',
              color: 'grey', // Orange
              width: 2
            }
          }
        ]
      };

      const renderer_DistinctRainManhole_2D = {
        type: 'unique-value',
        field: 'Level',
        defaultSymbol: {
          type: 'simple-marker', // autocasts as new PictureMarkerSymbol()
          size: 6,
          color: 'blue',
          outline: {
            // autocasts as new SimpleLineSymbol()
            width: 0.5,
            color: 'white'
          }
        },
        uniqueValueInfos: [
          {
            value: 1,
            symbol: {
              type: 'simple-marker', // autocasts as new PictureMarkerSymbol()
              size: 6,
              color: 'lime',
              outline: {
                // autocasts as new SimpleLineSymbol()
                width: 0.5,
                color: 'white'
              }
            }
          },
          {
            value: 2,
            symbol: {
              type: 'simple-marker', // autocasts as new PictureMarkerSymbol()
              size: 6,
              color: 'yellow',
              outline: {
                // autocasts as new SimpleLineSymbol()
                width: 0.5,
                color: 'white'
              }
            }
          },
          {
            value: 3,
            symbol: {
              type: 'simple-marker', // autocasts as new PictureMarkerSymbol()
              size: 6,
              color: 'red',
              outline: {
                // autocasts as new SimpleLineSymbol()
                width: 0.5,
                color: 'white'
              }
            }
          },
          {
            value: 4,
            symbol: {
              type: 'simple-marker', // autocasts as new PictureMarkerSymbol()
              size: 6,
              color: 'grey',
              outline: {
                // autocasts as new SimpleLineSymbol()
                width: 0.5,
                color: 'white'
              }
            }
          }
        ]
      };

      const renderer_building = {
        type: 'unique-value',
        field: 'Level',
        defaultSymbol: {
          type: 'simple-fill',
          color: [0, 225, 225, 0.3],
          outline: {
            color: [0, 225, 225, 0.6],
            width: '1px'
          }
        },
        uniqueValueInfos: [
          {
            value: 1,
            symbol: {
              type: 'simple-fill',
              color: [0, 255, 0, 0.6],
              outline: {
                color: 'grey',
                width: '1px'
              }
            }
          },
          {
            value: 2,
            symbol: {
              type: 'simple-fill',
              color: [255, 225, 0, 0.6],
              outline: {
                color: 'grey',
                width: '1px'
              }
            }
          },
          {
            value: 3,
            symbol: {
              type: 'simple-fill',
              color: [255, 0, 0, 0.6],
              outline: {
                color: 'grey',
                width: '1px'
              }
            }
          }
        ]
      };

      const renderer_outfall = {
        type: 'simple', // autocasts as new SimpleRenderer()
        symbol: {
          type: 'simple-marker', // autocasts as new SimpleMarkerSymbol()
          style: 'triangle',
          size: 20,
          color: '#FF0000',
          outline: {
            // autocasts as new SimpleLineSymbol()
            width: 0.5,
            color: 'white'
          }
        }
      };
      const geojsonLayer_Zone = new GeoJSONLayer({
        url: url_zone,
        visible: false,
        title: '分区',
        popupTemplate: template_zone,
        renderer: renderer_Zone,
        opacity: 0.8
      });
      const geojsonLayer_Building = new GeoJSONLayer({
        url: url_building,
        visible: true,
        title: '建筑',
        popupTemplate: template_building,
        renderer: renderer_building,
        opacity: 0.7
      });
      const geojsonLayer_RainPipeline_2D = new GeoJSONLayer({
        url: url_rain_line,
        visible: true,
        title: '管道',
        popupTemplate: template_RainPipeline_2D,
        renderer: renderer_RainPipeline_2D,
        opacity: 0.9
      });
      const geojsonLayer_RainManhole_2D = new GeoJSONLayer({
        url: url_rain_point,
        visible: true,
        title: '管井',
        popupTemplate: template_RainManhole_2D,
        renderer: renderer_RainManhole_2D,
        opacity: 0.9
      });

      const geojsonLayer_SewagePipeline_2D = new GeoJSONLayer({
        url: url_sewage_line,
        visible: true,
        title: '管道',
        popupTemplate: template_SewagePipeline_2D,
        renderer: renderer_SewagePipeline_2D,
        opacity: 0.9
      });

      const geojsonLayer_SewageManhole_2D = new GeoJSONLayer({
        url: url_sewage_point,
        title: '管井',
        visible: true,
        popupTemplate: template_SewageManhole_2D,
        renderer: renderer_SewageManhole_2D,
        opacity: 0.9
      });

      const geojsonLayer_DistinctManhole_2D = new GeoJSONLayer({
        url: url_distinct_point,
        title: '管井',
        visible: true,
        popupTemplate: template_DistinctManhole_2D,
        renderer: renderer_DistinctManhole_2D,
        opacity: 0.9
      });

      const geojsonLayer_DistinctPipeline_2D = new GeoJSONLayer({
        url: url_distinct_line,
        visible: true,
        title: '管道',
        popupTemplate: template_DistinctPipeline_2D,
        renderer: renderer_DistinctPipeline_2D,
        opacity: 0.9
      });

      const geojsonLayer_DistinctRainManhole_2D = new GeoJSONLayer({
        url: url_distinct_rain_point,
        title: '管井',
        visible: true,
        popupTemplate: template_DistinctRainManhole_2D,
        renderer: renderer_DistinctRainManhole_2D,
        opacity: 0.9
      });

      const geojsonLayer_DistinctRainPipeline_2D = new GeoJSONLayer({
        url: url_distinct_rain_line,
        visible: true,
        title: '管道',
        popupTemplate: template_DistinctRainPipeline_2D,
        renderer: renderer_DistinctRainPipeline_2D,
        opacity: 0.9
      });

      const geojsonLayer_RainOut = new GeoJSONLayer({
        url: url_rain_out,
        title: '排口',

        popupTemplate: template_outfall,
        renderer: renderer_outfall,
        opacity: 0.9
      });

      const RainPipeNetworkGroupLayer = new GroupLayer({
        title: '雨水管网及管井',
        visible: true,
        visibilityMode: 'independent',
        layers: [geojsonLayer_RainOut, geojsonLayer_RainManhole_2D, geojsonLayer_RainPipeline_2D],
        opacity: 0.75
      });

      const SewagePipeNetworkGroupLayer = new GroupLayer({
        title: '污水管网及管井',
        visible: false,
        visibilityMode: 'independent',
        layers: [geojsonLayer_SewageManhole_2D, geojsonLayer_SewagePipeline_2D],
        opacity: 0.75
      });

      const DistinctRainPipeNetworkGroupLayer = new GroupLayer({
        title: '雨水管网及管井',
        visible: true,
        visibilityMode: 'independent',
        layers: [geojsonLayer_DistinctRainManhole_2D, geojsonLayer_DistinctRainPipeline_2D],
        opacity: 0.75
      });

      const DistinctSewagePipeNetworkGroupLayer = new GroupLayer({
        title: '污水管网及管井',
        visible: false,
        visibilityMode: 'independent',
        layers: [geojsonLayer_DistinctPipeline_2D, geojsonLayer_DistinctManhole_2D],
        opacity: 0.75
      });

      const generalGroup = new GroupLayer({
        title: '雨污管网',
        visible: true,
        visibilityMode: 'exclusive',
        layers: [SewagePipeNetworkGroupLayer, RainPipeNetworkGroupLayer],
        opacity: 1
      });

      const distinctGroup = new GroupLayer({
        title: '小区管网',
        visible: true,
        visibilityMode: 'exclusive',
        layers: [DistinctRainPipeNetworkGroupLayer, DistinctSewagePipeNetworkGroupLayer],
        opacity: 1
      });

      const osmLayer = new OpenStreetMapLayer({
        title: 'OSM'
      });
      let map = new Map({
        basemap: 'hybrid', // streets，hybrid
        layers: [osmLayer, geojsonLayer_Zone, geojsonLayer_Building]
      });

      map.layers.addMany([generalGroup]);
      map.layers.addMany([distinctGroup]);
      let view = new MapView({
        container: 'viewDiv',
        map,
        center: [117.373724, 31.886219],
        zoom: 15
      });

      // const basemapToggle = new BasemapToggle({
      //   view: view,
      //   nextBasemap: 'satellite'
      // });
      let layerList = new LayerList({
        view: view
      });
      // Adds widget below other elements in the top left corner of the view
      view.ui.add(layerList, {
        position: 'top-right'
      });

      // view.ui.add(basemapToggle, 'top-right');
    }
  }
};
</script>

<style lang="scss">
.MapView {
  width: 100%;
  height: 80%;
  #viewDiv {
    padding: 0;
    margin: 0;
    min-height: 900px;
    min-width: 600px;
    height: 100%;
    width: 100%;
  }
}
.esri-component.esri-widget--panel {
  width: 180px !important;
}
.esri-popup__main-container {
  max-width: 250px !important;
}
</style>
