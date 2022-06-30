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
      const url_distinct_line = '/pipe/distinct_line.json';
      const url_distinct_point = '/pipe/distinct_point.json';
      const url_distinct_rain_line = '/pipe/distinct_rain_line.json';
      const url_distinct_rain_point = '/pipe/distinct_rain_point.json';
      const url_rain_line = '/pipe/rain_line.json';
      const url_rain_point = '/pipe/rain_point.json';
      const url_rain_out = '/pipe/rain_out.json';
      const url_sewage_line = '/pipe/sewage_line.json';
      const url_sewage_point = '/pipe/sewage_point.json';

      const template_RainPipeline_2D = {
        title: '<b>所选管段相关信息：</b>',
        content:
          '<b>模型编号: </b> {Name} <br>\
                <b>上游井模型编号: </b> {FromNode} <br>\
                <b>上游井底高程: </b> {FromNodeElev} m <br>\
                <b>下游井模型编号: </b> {ToNode} <br>\
                <b>下游井底高程: </b> {ToNodeElev} m <br>\
                <b>长度: </b> {Length} m <br>\
                <b>粗糙度: </b> {Roughness} <br>\
                <b>上游管接入偏离井底距离: </b> {InOffset} m <br>\
                <b>下游管接入偏离井底距离: </b> {OutOffset} m <br>\
                <b>初始流量: </b> {InitFlow} m^3/s <br>\
                <b>最大流量: </b> {MaxFlow} m^3/s <br>\
                <b>形状: </b> {ShapeO} <br>\
                <b>形状参数1: </b> {Geom1} m <br>\
                <b>形状参数2: </b> {Geom2} m <br>\
                <b>形状参数3: </b> {Geom3} m <br>\
                <b>形状参数4: </b> {Geom4} m <br>\
                <b>并行管数: </b> {Barrels} <br>\
                <b>Culvert: </b> {Culvert} <br>\
                <b>管道类型: </b> {Type} <br>\
                <b>埋设方式: </b> {BuryType} <br>\
                <b>权属单位: </b> {Belong} <br>\
                <b>埋设日期: </b> {BuryDate} <br>\
                <b>材质: </b> {Material} <br>\
                <b>使用单位: </b> {Owner} <br>\
                <b>淤积程度: </b> {Silt} <br>\
                <b>连通状况: </b> {Connectivity} <br>\
              ',
        actions: [],
        overwriteActions: true,
        opacity: 0.6
      };

      const template_RainManhole_2D = {
        title: '<b>所选管井相关信息：</b>',
        content:
          '<b>模型编号: </b> {MSName} <br>\
                <b>物探编号: </b> {GPName} <br>\
                <b>井底高程: </b> {Elevation} m <br>\
                <b>井深: </b> {DepthMax} m <br>\
                <b>初始水深: </b> {DepthInit} m <br>\
                <b>容许淹没水深: </b> {DepthSur} m <br>\
                <b>淹没时受水面积: </b> {Aponded} m^2 <br>\
                <b>使用状态: </b> {State} <br>\
              ',
        actions: [],
        overwriteActions: true,
        opacity: 0.6
      };

      const template_DistinctPipeline_2D = {
        title: '<b>所选管段相关信息：</b>',
        content:
          '<b>模型编号: </b> {Name} <br>\
                <b>上游井模型编号: </b> {FromNode} <br>\
                <b>上游井底高程: </b> {FromNodeElev} m <br>\
                <b>下游井模型编号: </b> {ToNode} <br>\
                <b>下游井底高程: </b> {ToNodeElev} m <br>\
                <b>长度: </b> {Length} m <br>\
                <b>粗糙度: </b> {Roughness} <br>\
                <b>上游管接入偏离井底距离: </b> {InOffset} m <br>\
                <b>下游管接入偏离井底距离: </b> {OutOffset} m <br>\
                <b>初始流量: </b> {InitFlow} m^3/s <br>\
                <b>最大流量: </b> {MaxFlow} m^3/s <br>\
                <b>形状: </b> {ShapeO} <br>\
                <b>形状参数1: </b> {Geom1} m <br>\
                <b>形状参数2: </b> {Geom2} m <br>\
                <b>形状参数3: </b> {Geom3} m <br>\
                <b>形状参数4: </b> {Geom4} m <br>\
                <b>并行管数: </b> {Barrels} <br>\
                <b>Culvert: </b> {Culvert} <br>\
                <b>管道类型: </b> {Type} <br>\
                <b>埋设方式: </b> {BuryType} <br>\
                <b>权属单位: </b> {Belong} <br>\
                <b>埋设日期: </b> {BuryDate} <br>\
                <b>材质: </b> {Material} <br>\
                <b>使用单位: </b> {Owner} <br>\
                <b>淤积程度: </b> {Silt} <br>\
                <b>连通状况: </b> {Connectivity} <br>\
              ',
        actions: [],
        overwriteActions: true,
        opacity: 0.6
      };

      const template_DistinctManhole_2D = {
        title: '<b>所选管井相关信息：</b>',
        content:
          '<b>模型编号: </b> {MSName} <br>\
                <b>物探编号: </b> {GPName} <br>\
                <b>井底高程: </b> {Elevation} m <br>\
                <b>井深: </b> {DepthMax} m <br>\
                <b>初始水深: </b> {DepthInit} m <br>\
                <b>容许淹没水深: </b> {DepthSur} m <br>\
                <b>淹没时受水面积: </b> {Aponded} m^2 <br>\
                <b>使用状态: </b> {State} <br>\
              ',
        actions: [],
        overwriteActions: true,
        opacity: 0.6
      };

      const template_DistinctRainPipeline_2D = {
        title: '<b>所选管段相关信息：</b>',
        content:
          '<b>模型编号: </b> {Name} <br>\
                <b>上游井模型编号: </b> {FromNode} <br>\
                <b>上游井底高程: </b> {FromNodeElev} m <br>\
                <b>下游井模型编号: </b> {ToNode} <br>\
                <b>下游井底高程: </b> {ToNodeElev} m <br>\
                <b>长度: </b> {Length} m <br>\
                <b>粗糙度: </b> {Roughness} <br>\
                <b>上游管接入偏离井底距离: </b> {InOffset} m <br>\
                <b>下游管接入偏离井底距离: </b> {OutOffset} m <br>\
                <b>初始流量: </b> {InitFlow} m^3/s <br>\
                <b>最大流量: </b> {MaxFlow} m^3/s <br>\
                <b>形状: </b> {ShapeO} <br>\
                <b>形状参数1: </b> {Geom1} m <br>\
                <b>形状参数2: </b> {Geom2} m <br>\
                <b>形状参数3: </b> {Geom3} m <br>\
                <b>形状参数4: </b> {Geom4} m <br>\
                <b>并行管数: </b> {Barrels} <br>\
                <b>Culvert: </b> {Culvert} <br>\
                <b>管道类型: </b> {Type} <br>\
                <b>埋设方式: </b> {BuryType} <br>\
                <b>权属单位: </b> {Belong} <br>\
                <b>埋设日期: </b> {BuryDate} <br>\
                <b>材质: </b> {Material} <br>\
                <b>使用单位: </b> {Owner} <br>\
                <b>淤积程度: </b> {Silt} <br>\
                <b>连通状况: </b> {Connectivity} <br>\
              ',
        actions: [],
        overwriteActions: true,
        opacity: 0.6
      };

      const template_DistinctRainManhole_2D = {
        title: '<b>所选管井相关信息：</b>',
        content:
          '<b>模型编号: </b> {MSName} <br>\
                <b>物探编号: </b> {GPName} <br>\
                <b>井底高程: </b> {Elevation} m <br>\
                <b>井深: </b> {DepthMax} m <br>\
                <b>初始水深: </b> {DepthInit} m <br>\
                <b>容许淹没水深: </b> {DepthSur} m <br>\
                <b>淹没时受水面积: </b> {Aponded} m^2 <br>\
                <b>使用状态: </b> {State} <br>\
              ',
        actions: [],
        overwriteActions: true,
        opacity: 0.6
      };

      const template_SewagePipeline_2D = {
        title: '<b>所选管段相关信息：</b>',
        content:
          '<b>模型编号: </b> {Name} <br>\
                <b>上游井模型编号: </b> {FromNode} <br>\
                <b>上游井底高程: </b> {FromNodeElev} m <br>\
                <b>下游井模型编号: </b> {ToNode} <br>\
                <b>下游井底高程: </b> {ToNodeElev} m <br>\
                <b>长度: </b> {Length} m <br>\
                <b>粗糙度: </b> {Roughness} <br>\
                <b>上游管接入偏离井底距离: </b> {InOffset} m <br>\
                <b>下游管接入偏离井底距离: </b> {OutOffset} m <br>\
                <b>初始流量: </b> {InitFlow} m^3/s <br>\
                <b>最大流量: </b> {MaxFlow} m^3/s <br>\
                <b>形状: </b> {ShapeO} <br>\
                <b>形状参数1: </b> {Geom1} m <br>\
                <b>形状参数2: </b> {Geom2} m <br>\
                <b>形状参数3: </b> {Geom3} m <br>\
                <b>形状参数4: </b> {Geom4} m <br>\
                <b>并行管数: </b> {Barrels} <br>\
                <b>Culvert: </b> {Culvert} <br>\
                <b>管道类型: </b> {Type} <br>\
                <b>埋设方式: </b> {BuryType} <br>\
                <b>权属单位: </b> {Belong} <br>\
                <b>埋设日期: </b> {BuryDate} <br>\
                <b>材质: </b> {Material} <br>\
                <b>使用单位: </b> {Owner} <br>\
                <b>淤积程度: </b> {Silt} <br>\
                <b>连通状况: </b> {Connectivity} <br>\
              ',
        actions: [],
        overwriteActions: true,
        opacity: 0.6
      };

      const template_SewageManhole_2D = {
        title: '<b>所选管井相关信息：</b>',
        content:
          '<b>模型编号: </b> {MSName} <br>\
                <b>物探编号: </b> {GPName} <br>\
                <b>井底高程: </b> {Elevation} m <br>\
                <b>井深: </b> {DepthMax} m <br>\
                <b>初始水深: </b> {DepthInit} m <br>\
                <b>容许淹没水深: </b> {DepthSur} m <br>\
                <b>淹没时受水面积: </b> {Aponded} m^2 <br>\
                <b>使用状态: </b> {State} <br>\
              ',
        actions: [],
        overwriteActions: true,
        opacity: 0.6
      };

      const template_building = {
        title: '<b>所选建筑物信息：</b>',
        content: '<b>名称: </b> {Name} <br>\
              ',
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

      const renderer_RainPipeline_2D = {
        type: 'simple',
        symbol: {
          type: 'simple-line',
          color: '#33CC33', // Orange
          width: 2
        }
      };

      const renderer_RainManhole_2D = {
        type: 'simple',
        symbol: {
          type: 'simple-marker', // autocasts as new PictureMarkerSymbol()
          size: 6,
          color: 'blue',
          outline: {
            // autocasts as new SimpleLineSymbol()
            width: 0.5,
            color: 'white'
          }
        }
      };

      const renderer_SewagePipeline_2D = {
        type: 'simple',
        symbol: {
          type: 'simple-line',
          color: [226, 119, 40], // Orange
          width: 2
        }
      };

      const renderer_SewageManhole_2D = {
        type: 'simple',
        symbol: {
          type: 'simple-marker', // autocasts as new PictureMarkerSymbol()
          size: 6,
          color: 'black',
          outline: {
            // autocasts as new SimpleLineSymbol()
            width: 0.5,
            color: 'white'
          }
        }
      };

      const renderer_DistinctPipeline_2D = {
        type: 'simple',
        symbol: {
          type: 'simple-line',
          color: [226, 119, 40], // Orange
          width: 2
        }
      };

      const renderer_DistinctManhole_2D = {
        type: 'simple',
        symbol: {
          type: 'simple-marker', // autocasts as new PictureMarkerSymbol()
          size: 6,
          color: 'black',
          outline: {
            // autocasts as new SimpleLineSymbol()
            width: 0.5,
            color: 'white'
          }
        }
      };

      const renderer_DistinctRainPipeline_2D = {
        type: 'simple',
        symbol: {
          type: 'simple-line',
          color: '#33CC33', // Orange
          width: 2
        }
      };

      const renderer_DistinctRainManhole_2D = {
        type: 'simple',
        symbol: {
          type: 'simple-marker', // autocasts as new PictureMarkerSymbol()
          size: 6,
          color: 'black',
          outline: {
            // autocasts as new SimpleLineSymbol()
            width: 0.5,
            color: 'white'
          }
        }
      };

      const renderer_building = {
        type: 'simple',
        symbol: {
          type: 'simple-fill',
          color: [0, 225, 225, 0.6],
          outline: {
            color: [0, 225, 225, 0.6],
            width: '1px'
          }
        }
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
      const geojsonLayer_Building = new GeoJSONLayer({
        url: url_building,
        visible: true,
        title: '建筑',
        popupTemplate: template_building,
        renderer: renderer_building,
        opacity: 0.9
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
        layers: [geojsonLayer_RainOut,  geojsonLayer_RainManhole_2D, geojsonLayer_RainPipeline_2D],
        opacity: 0.75
      });

      const SewagePipeNetworkGroupLayer = new GroupLayer({
        title: '污水管网及管井',
        visible: false,
        visibilityMode: 'independent',
        layers: [ geojsonLayer_SewageManhole_2D, geojsonLayer_SewagePipeline_2D],
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
        title: '图层管理',
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
        layers: [osmLayer, geojsonLayer_Building]
      });

      map.layers.addMany([generalGroup]);
      map.layers.addMany([distinctGroup]);
      let view = new MapView({
        container: 'viewDiv',
        map,
        center: [117.36887, 31.87657],
        zoom: 15
      });

      const basemapToggle = new BasemapToggle({
        view: view,
        nextBasemap: 'satellite'
      });
      let layerList = new LayerList({
        view: view
      });
      // Adds widget below other elements in the top left corner of the view
      view.ui.add(layerList, {
        position: 'top-right'
      });

      view.ui.add(basemapToggle, 'top-right');

      view.popup.on('trigger-action', event => {
        // Execute the measureThis() function if the measure-this action is clicked
        if (event.action.id === 'ZoneDetails') {
          console.log(event);
          window.location.replace('http://stackoverflow.com');
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
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
</style>
