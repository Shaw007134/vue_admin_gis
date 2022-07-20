<template>
  <div class="MapView">
    <div id="viewDiv"></div>
    <a-modal title="" :visible="visiblePoint" :forceRender="true" :footer="null" :mask="false" @cancel="handleCancel">
      <a-tabs default-active-key="1" @change="callback">
        <a-tab-pane key="p1" tab="基础属性">
          <a-descriptions bordered :column="1">
            <a-descriptions-item label="编号"> {{ clickedAttrs.Name }} </a-descriptions-item>
            <a-descriptions-item label="地表高程"> {{ clickedAttrs.SurElev }} </a-descriptions-item>
            <a-descriptions-item label="井底高程"> {{ clickedAttrs.BottomElev }} </a-descriptions-item>
            <a-descriptions-item label="深度"> {{ clickedAttrs.Depth }} </a-descriptions-item>
            <a-descriptions-item label="类别"> {{ clickedAttrs.Category }} </a-descriptions-item>
            <a-descriptions-item label="类型"> {{ clickedAttrs.Type }} </a-descriptions-item>
            <a-descriptions-item label="形状"> {{ clickedAttrs.Form }} </a-descriptions-item>
          </a-descriptions>
        </a-tab-pane>

        <a-tab-pane key="p3" tab="结构属性">
          <a-descriptions bordered :column="1">
            <a-descriptions-item label="井壁破裂"> {{ clickedAttrs.PL }} </a-descriptions-item>
            <a-descriptions-item label="管口衔接脱开"> {{ clickedAttrs.TK }} </a-descriptions-item>
            <a-descriptions-item label="井底不完整"> {{ clickedAttrs.JB }} </a-descriptions-item>
            <a-descriptions-item label="井底渗漏"> {{ clickedAttrs.SL }} </a-descriptions-item>
            <a-descriptions-item label="井内有无网兜"> {{ clickedAttrs.WD }} </a-descriptions-item>
          </a-descriptions>
        </a-tab-pane>
        <a-tab-pane key="p4" tab="功能属性">
          <a-descriptions bordered :column="1">
            <a-descriptions-item label="井底淤泥沉积"> {{ clickedAttrs.YJ }} </a-descriptions-item>
            <a-descriptions-item label="井内固体废物"> {{ clickedAttrs.FW }} </a-descriptions-item>
          </a-descriptions>
        </a-tab-pane>
        <a-tab-pane key="p2" tab="工艺属性" force-render>
          <a-descriptions bordered :column="1">
            <a-descriptions-item label="水深（含淤泥）"> {{ clickedAttrs.WaterDepth }} </a-descriptions-item>
            <a-descriptions-item label="淤泥深"> {{ clickedAttrs.SludgDepth }} </a-descriptions-item>
            <a-descriptions-item label="气味"> {{ clickedAttrs.Odour }} </a-descriptions-item>
            <a-descriptions-item label="透明度"> {{ clickedAttrs.Transparency }} </a-descriptions-item>
            <a-descriptions-item label="流向情况"> {{ clickedAttrs.FlowDir }} </a-descriptions-item>
          </a-descriptions>
          <LineChart></LineChart>
        </a-tab-pane>
      </a-tabs>
    </a-modal>

    <a-modal title="" :visible="visibleLine" :forceRender="true" :footer="null" :mask="false" @cancel="handleCancel">
      <a-tabs default-active-key="1" @change="callback">
        <a-tab-pane key="l1" tab="基础属性">
          <a-descriptions bordered :column="1">
            <a-descriptions-item label="编号"> {{ clickedAttrs.Name }} </a-descriptions-item>
            <a-descriptions-item label="管始端底部高程"> {{ clickedAttrs.InElev }} </a-descriptions-item>
            <a-descriptions-item label="管始端深度"> {{ clickedAttrs.InDepth }} </a-descriptions-item>
            <a-descriptions-item label="管末端底部高程"> {{ clickedAttrs.OutElev }} </a-descriptions-item>
            <a-descriptions-item label="管末端深度"> {{ clickedAttrs.OutDepth }} </a-descriptions-item>
            <a-descriptions-item label="管径"> {{ clickedAttrs.DN }} </a-descriptions-item>
            <a-descriptions-item label="长度"> {{ clickedAttrs.Length }} </a-descriptions-item>
            <a-descriptions-item label="类别"> {{ clickedAttrs.Category }} </a-descriptions-item>
            <a-descriptions-item label="材质"> {{ clickedAttrs.Material }} </a-descriptions-item>
            <a-descriptions-item label="形状"> {{ clickedAttrs.Form }} </a-descriptions-item>
          </a-descriptions>
        </a-tab-pane>

        <a-tab-pane key="l3" tab="结构属性">
          <a-descriptions bordered :column="1">
            <a-descriptions-item label="破裂程度"> {{ clickedAttrs.PL }} </a-descriptions-item>
            <a-descriptions-item label="腐蚀程度"> {{ clickedAttrs.FS }} </a-descriptions-item>
            <a-descriptions-item label="变形程度"> {{ clickedAttrs.BX }} </a-descriptions-item>
            <a-descriptions-item label="错口程度"> {{ clickedAttrs.CK }} </a-descriptions-item>
            <a-descriptions-item label="起伏程度"> {{ clickedAttrs.QF }} </a-descriptions-item>
            <a-descriptions-item label="脱节程度"> {{ clickedAttrs.TJ }} </a-descriptions-item>
            <a-descriptions-item label="接口材料脱落程度"> {{ clickedAttrs.TL }} </a-descriptions-item>
            <a-descriptions-item label="支管暗接程度"> {{ clickedAttrs.AJ }} </a-descriptions-item>
            <a-descriptions-item label="异物穿入情况"> {{ clickedAttrs.CR }} </a-descriptions-item>
            <a-descriptions-item label="渗漏程度"> {{ clickedAttrs.SL }} </a-descriptions-item>
          </a-descriptions>
        </a-tab-pane>
        <a-tab-pane key="l4" tab="功能属性">
          <a-descriptions bordered :column="1">
            <a-descriptions-item label="沉积程度"> {{ clickedAttrs.CJ }} </a-descriptions-item>
            <a-descriptions-item label="结垢程度"> {{ clickedAttrs.JG }} </a-descriptions-item>
            <a-descriptions-item label="障碍物情况"> {{ clickedAttrs.ZW }} </a-descriptions-item>
            <a-descriptions-item label="残墙、坝根遗留情况"> {{ clickedAttrs.CQ }} </a-descriptions-item>
            <a-descriptions-item label="树根进入情况"> {{ clickedAttrs.SG }} </a-descriptions-item>
            <a-descriptions-item label="浮渣情况"> {{ clickedAttrs.FZ }} </a-descriptions-item>
          </a-descriptions>
        </a-tab-pane>
        <a-tab-pane key="l2" tab="工艺属性" force-render>
          <a-descriptions bordered :column="1">
            <a-descriptions-item label="水深（含淤泥）"> {{ clickedAttrs.WaterDepth }} </a-descriptions-item>
            <a-descriptions-item label="淤泥深"> {{ clickedAttrs.SludgDepth }} </a-descriptions-item>
            <a-descriptions-item label="气味"> {{ clickedAttrs.Odour }} </a-descriptions-item>
            <a-descriptions-item label="透明度"> {{ clickedAttrs.Transparency }} </a-descriptions-item>
            <a-descriptions-item label="流向情况"> {{ clickedAttrs.FlowDir }} </a-descriptions-item>
          </a-descriptions>
          <LineChart></LineChart>
        </a-tab-pane>
      </a-tabs>
    </a-modal>
  </div>
</template>
<script>
/* eslint-disable */
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import GeoJSONLayer from '@arcgis/core/layers/GeoJSONLayer';
import GroupLayer from '@arcgis/core/layers/GroupLayer';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import OpenStreetMapLayer from '@arcgis/core/layers/OpenStreetMapLayer';
import LayerList from '@arcgis/core/widgets/LayerList';
import BasemapToggle from '@arcgis/core/widgets/BasemapToggle';

import { backtracking, optionFluid } from '@/utils/layer_utils';
import EchartsLayer from '@/utils/echartsLayer';
// import {  lineChart  } from '../../echarts/line';
import LineChart from '@/views/echarts/line';

import rain_line from '/public/pipe/rain_line.json';
import sewage_line from '/public/pipe/sewage_line.json';
import distinct_line from '/public/pipe/distinct_line.json';
import distinct_rain_line from '/public/pipe/distinct_rain_line.json';
import $ from 'jquery';

export default {
  data() {
    return {
      visiblePoint: false,
      visibleLine: false,
      clickedAttrs: {},
      confirmLoading: false
    };
  },
  components: {
    LineChart
  },
  mounted() {
    // this.$nextTick(() => {
    this.handleMounted();
    // });
  },
  methods: {
    showModal() {
      this.visiblePoint = true;
    },
    showModalLine() {
      this.visibleLine = true;
    },
    handleOk(e) {
      this.confirmLoading = true;
      setTimeout(() => {
        this.visiblePoint = false;
        this.confirmLoading = false;
      }, 2000);
    },
    handleCancel(e) {
      console.log('Clicked cancel button');
      this.visiblePoint = false;
      this.visibleLine = false;
    },
    callback(key) {
      console.log(key);
    },
    handleMounted() {
      const url_building = '/pipe/building.json';
      const url_building1 = '/pipe/building1.json';
      const url_zone = '/pipe/zone.json';
      const url_stream = '/pipe/stream.json';
      const url_distinct_line = '/pipe/distinct_line.json';
      const url_distinct_point = '/pipe/distinct_point.json';
      const url_distinct_rain_line = '/pipe/distinct_rain_line.json';
      const url_distinct_rain_point = '/pipe/distinct_rain_point.json';
      const url_rain_line = '/pipe/rain_line.json';
      const url_rain_point = '/pipe/rain_point.json';
      const url_rain_out = '/pipe/rain_out.json';
      const url_sewage_line = '/pipe/sewage_line.json';
      const url_sewage_point = '/pipe/sewage_point.json';

      const template_Stream = {
        title: '<b>所选河道相关信息：</b>',
        content: '<b>索引号: </b> {FID}  <br><b>名称: </b> {CNName}  <br>',
        actions: [],
        overwriteActions: true,
        opacity: 0.6
      };

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

      const renderer_Stream = {
        type: 'simple',
        symbol: {
          type: 'simple-fill',
          color: [0, 225, 225, 0.9],
          outline: {
            color: [0, 225, 225, 0.9],
            width: '1px'
          }
        }
      };
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
      const renderer_building1 = {
        type: 'simple',
        symbol: {
          type: 'simple-fill',
          color: [128, 128, 225, 0.5],
          outline: {
            color: [0, 225, 225, 0.6],
            width: '1px'
          }
        }
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
      const geojsonLayer_Stream = new GeoJSONLayer({
        url: url_stream,
        title: '河道',
        popupTemplate: template_Stream,
        renderer: renderer_Stream,
        outFields: ['*'],
        opacity: 0.9
      });
      const geojsonLayer_Zone = new GeoJSONLayer({
        url: url_zone,
        visible: false,
        title: '分区',
        popupTemplate: template_zone,
        renderer: renderer_Zone,
        outFields: ['*'],
        opacity: 0.8
      });
      const geojsonLayer_Building = new GeoJSONLayer({
        url: url_building,
        visible: true,
        title: '建筑',
        outFields: ['*'],
        popupTemplate: template_building,
        renderer: renderer_building,
        opacity: 0.7
      });

      const geojsonLayer_RainPipeline_2D = new GeoJSONLayer({
        url: url_rain_line,
        visible: true,
        title: '雨水管道',
        outFields: ['*'],
        // popupTemplate: template_RainPipeline_2D,
        renderer: renderer_RainPipeline_2D,
        opacity: 0.9
      });
      const geojsonLayer_RainManhole_2D = new GeoJSONLayer({
        url: url_rain_point,
        visible: true,
        title: '雨水管井',
        outFields: ['*'],
        // popupTemplate: template_RainManhole_2D,
        renderer: renderer_RainManhole_2D,
        opacity: 0.9
      });

      const geojsonLayer_SewagePipeline_2D = new GeoJSONLayer({
        url: url_sewage_line,
        visible: true,
        title: '污水管道',
        outFields: ['*'],
        // popupTemplate: template_SewagePipeline_2D,
        renderer: renderer_SewagePipeline_2D,
        opacity: 0.9
      });

      const geojsonLayer_SewageManhole_2D = new GeoJSONLayer({
        url: url_sewage_point,
        title: '污水管井',
        outFields: ['*'],
        visible: true,
        // popupTemplate: template_SewageManhole_2D,
        renderer: renderer_SewageManhole_2D,
        opacity: 0.9
      });

      const geojsonLayer_DistinctManhole_2D = new GeoJSONLayer({
        url: url_distinct_point,
        title: '小区污水管井',
        outFields: ['*'],
        visible: true,
        // popupTemplate: template_DistinctManhole_2D,
        renderer: renderer_DistinctManhole_2D,
        opacity: 0.9
      });

      const geojsonLayer_DistinctPipeline_2D = new GeoJSONLayer({
        url: url_distinct_line,
        visible: true,
        outFields: ['*'],
        title: '小区污水管道',
        // popupTemplate: template_DistinctPipeline_2D,
        renderer: renderer_DistinctPipeline_2D,
        opacity: 0.9
      });

      const geojsonLayer_DistinctRainManhole_2D = new GeoJSONLayer({
        url: url_distinct_rain_point,
        title: '小区雨水管井',
        outFields: ['*'],
        visible: true,
        // popupTemplate: template_DistinctRainManhole_2D,
        renderer: renderer_DistinctRainManhole_2D,
        opacity: 0.9
      });

      const geojsonLayer_DistinctRainPipeline_2D = new GeoJSONLayer({
        url: url_distinct_rain_line,
        visible: true,
        outFields: ['*'],
        title: '小区雨水管道',
        // popupTemplate: template_DistinctRainPipeline_2D,
        renderer: renderer_DistinctRainPipeline_2D,
        opacity: 0.9
      });

      const geojsonLayer_RainOut = new GeoJSONLayer({
        url: url_rain_out,
        title: '排口',
        outFields: ['*'],
        popupTemplate: template_outfall,
        renderer: renderer_outfall,
        opacity: 0.9
      });

      const RainPipeNetworkGroupLayer = new GroupLayer({
        title: '雨水管网',
        visible: true,
        outFields: ['*'],
        visibilityMode: 'independent',
        layers: [geojsonLayer_RainOut, geojsonLayer_RainPipeline_2D, geojsonLayer_RainManhole_2D],
        opacity: 0.75
      });

      const SewagePipeNetworkGroupLayer = new GroupLayer({
        title: '污水管网',
        visible: true,
        outFields: ['*'],
        visibilityMode: 'independent',
        layers: [geojsonLayer_SewagePipeline_2D, geojsonLayer_SewageManhole_2D],
        opacity: 0.75
      });

      const DistinctRainPipeNetworkGroupLayer = new GroupLayer({
        title: '小区雨水管网',
        visible: true,
        outFields: ['*'],
        visibilityMode: 'independent',
        layers: [geojsonLayer_DistinctRainPipeline_2D, geojsonLayer_DistinctRainManhole_2D],
        opacity: 0.75
      });

      const DistinctSewagePipeNetworkGroupLayer = new GroupLayer({
        title: '小区污水管网',
        visible: true,
        outFields: ['*'],
        visibilityMode: 'independent',
        layers: [geojsonLayer_DistinctManhole_2D, geojsonLayer_DistinctPipeline_2D],
        opacity: 0.75
      });

      const generalGroup = new GroupLayer({
        title: '雨污管网',
        visible: true,
        outFields: ['*'],
        visibilityMode: 'independent',
        layers: [SewagePipeNetworkGroupLayer, RainPipeNetworkGroupLayer],
        opacity: 1
      });

      const distinctGroup = new GroupLayer({
        title: '小区雨污管网',
        visible: true,
        outFields: ['*'],
        visibilityMode: 'independent',
        layers: [DistinctRainPipeNetworkGroupLayer, DistinctSewagePipeNetworkGroupLayer],
        opacity: 1
      });

      const osmLayer = new OpenStreetMapLayer({
        title: 'OSM'
      });
      const resultsLayer = new GraphicsLayer({
        // listMode: "hide",
      });
      const RegionGroupLayer = new GroupLayer({
        title: '上游区域',
        visible: true,
        visibilityMode: 'independent',
        listMode: 'hide',
        layers: [resultsLayer],
        opacity: 0.75
      });
      let map = new Map({
        basemap: 'hybrid', // streets，hybrid
        layers: [osmLayer, geojsonLayer_Stream, geojsonLayer_Zone, geojsonLayer_Building, RegionGroupLayer]
      });

      map.layers.push(generalGroup);
      map.layers.push(distinctGroup);

      let view = new MapView({
        container: 'viewDiv',
        map,
        center: [117.373724, 31.886219],
        zoom: 15
      });

      var hovered = false;
      // view.popup.autoOpenEnabled = false;
      var timer;
      const layerMapper = layerID => {
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
        return layer;
      };

      const coordsMapper = (layer, type) => {
        const res = [];
        if (layer && layer.features instanceof Array) {
          layer.features.forEach(track => {
            res.push({
              coords: [track.geometry.coordinates[1], track.geometry.coordinates[0]],
              type: type
            });
          });
        }
        return res;
      };

      const fluidLayerMapper = {};

      const setFluid = (layer, json, type) => {
        layer.on('layerview-create', ({ layerView }) => {
          // console.log('rain pipe', layerView)
          let title = layer.title
          const fluidLayer = new EchartsLayer(view, title);
          const pipeline = coordsMapper(json, type);
          let option = optionFluid(pipeline);
          fluidLayer.setChartOption(option);
          fluidLayerMapper[title] = fluidLayer;
          let { visible } = layerView.layer;
          if (!visible) {
            fluidLayer.setVisible(false);
          }
          // console.log('fluidLayer', fluidLayer, pipeline);
        });
      };

      setFluid(geojsonLayer_RainPipeline_2D, rain_line,  'Rain');
      setFluid(geojsonLayer_SewagePipeline_2D, sewage_line,  'Sewage');
      setFluid(geojsonLayer_DistinctRainPipeline_2D, distinct_rain_line,  'Rain');
      setFluid(geojsonLayer_DistinctPipeline_2D, distinct_line,  'Sewage');

      view.on('pointer-move', event => {
        const point_opt = {
          include: [
            geojsonLayer_DistinctManhole_2D,
            geojsonLayer_DistinctRainManhole_2D,
            geojsonLayer_RainManhole_2D,
            geojsonLayer_SewageManhole_2D,
            geojsonLayer_DistinctPipeline_2D,
            geojsonLayer_DistinctRainPipeline_2D,
            geojsonLayer_RainPipeline_2D,
            geojsonLayer_SewagePipeline_2D
          ]
        };
        view.hitTest(event, point_opt).then(response => {
          if (response.results.length) {
            if (hovered) return;
            hovered = true;
            console.log('===', response.results[0]);
            timer = setTimeout(() => {
              var graphic = response.results[0].graphic;
              // view.popup.open({
              //   location: view.toMap({ x: event.x, y: event.y }),
              //   features: [graphic]
              // });

              var { Name, Layer } = graphic.attributes;
              this.clickedAttrs = graphic.attributes;
              console.log(this.clickedAttrs, graphic);
              var layer = layerMapper(Layer);
              const res = backtracking(layer, Name);
              console.log('--res', res);
              var queryLayer;
              var query;
              var queryLayerPoint;
              var queryPoint;
              var queryBuilding;
              var queryLayerBuilding;
              //
              if (Layer == 'rain_line' || Layer == 'rain_point') {
                // line
                queryLayer = geojsonLayer_RainPipeline_2D;
                queryLayerPoint = geojsonLayer_RainManhole_2D;
              } else if (Layer === 'sewage_line' || Layer == 'sewage_point') {
                queryLayer = geojsonLayer_SewagePipeline_2D;
                queryLayerPoint = geojsonLayer_SewageManhole_2D;
              } else if (Layer === 'distinct_line' || Layer == 'distinct_point') {
                queryLayer = geojsonLayer_DistinctPipeline_2D;
                queryLayerPoint = geojsonLayer_DistinctManhole_2D;
              } else if (Layer === 'distinct_rain_line' || Layer == 'distinct_rain_point') {
                queryLayer = geojsonLayer_DistinctRainPipeline_2D;
                queryLayerPoint = geojsonLayer_DistinctRainManhole_2D;
              }
              query = queryLayer.createQuery();
              let sql = 'Name IN' + "('";
              if (res && res.line instanceof Array) {
                for (let i = 0; i < res.line.length - 1; i++) {
                  sql += res.line[i] + "','";
                }
                sql += res.line[res.line.length - 1] + "')";
              }
              query.where = sql;
              queryLayer.queryFeatures(query).then(results => {
                resultsLayer.removeAll();
                var features = results.features.map(graphic => {
                  graphic.symbol = {
                    type: 'simple-fill',
                    color: [245, 242, 39, 0.7],
                    outline: {
                      width: 4,
                      color: '#FFFF00'
                    }
                  };
                  return graphic;
                });
                resultsLayer.addMany(features);

                // point
                if (res && res.point instanceof Array) {
                  queryPoint = queryLayerPoint.createQuery();
                  sql = 'Name IN' + "('";
                  for (let i = 0; i < res.point.length - 1; i++) {
                    sql += res.point[i] + "','";
                  }
                  sql += res.point[res.point.length - 1] + "')";
                  queryPoint.where = sql;
                  queryLayerPoint.queryFeatures(queryPoint).then(results => {
                    // resultsLayer.removeAll();
                    var features = results.features.map(graphic => {
                      graphic.symbol = {
                        type: 'simple-marker',
                        color: [245, 242, 39, 0.7],
                        outline: {
                          width: 2,
                          color: '#FFFF00'
                        }
                      };
                      return graphic;
                    });

                    resultsLayer.addMany(features);

                    // building
                    queryLayerBuilding = geojsonLayer_Building;
                    queryBuilding = queryLayerBuilding.createQuery();
                    sql = 'Outfall IN' + "('";
                    for (let i = 0; i < res.point.length - 1; i++) {
                      sql += res.point[i] + "','";
                    }
                    sql += res.point[res.point.length - 1] + "')";
                    queryBuilding.where = sql;
                    queryLayerBuilding.queryFeatures(queryBuilding).then(results => {
                      console.log('building', results);
                      var features = results.features.map(graphic => {
                        graphic.symbol = {
                          type: 'simple-fill',
                          color: [245, 242, 39, 0.7],
                          outline: {
                            width: 4,
                            color: '#FFFF00'
                          }
                        };
                        return graphic;
                      });
                      resultsLayer.addMany(features);
                      resultsLayer.visible = true;
                    });

                    resultsLayer.visible = true;
                  });
                } else {
                  resultsLayer.visible = true;
                }
              });
            }, 1000);
          } else {
            hovered = false;
            clearTimeout(timer);
            // view.popup.close()
            // this.visiblePoint = false;
            resultsLayer.removeAll();
          }
        });
      });

      view.on('click', event => {
        const point_opt = {
          include: [
            geojsonLayer_DistinctManhole_2D,
            geojsonLayer_DistinctRainManhole_2D,
            geojsonLayer_RainManhole_2D,
            geojsonLayer_SewageManhole_2D,
            geojsonLayer_DistinctPipeline_2D,
            geojsonLayer_DistinctRainPipeline_2D,
            geojsonLayer_RainPipeline_2D,
            geojsonLayer_SewagePipeline_2D
          ]
        };
        view.hitTest(event, point_opt).then(response => {
          if (response.results.length) {
            resultsLayer.removeAll();
            view.popup.close();
            var graphic = response.results[0].graphic;
            console.log('clicked --', response.results[0]);
            var features;
            if (graphic.geometry.type == 'point') {
              features = [graphic].map(graphic => {
                graphic.symbol = {
                  type: 'simple-marker',
                  color: [12, 128, 128, 0.5],
                  outline: {
                    width: 4,
                    color: 'red'
                  }
                };
                return graphic;
              });
            } else {
              features = [graphic].map(graphic => {
                graphic.symbol = {
                  type: 'simple-fill',
                  color: [12, 128, 128, 0.5],
                  outline: {
                    width: 4,
                    color: 'red'
                  }
                };
                return graphic;
              });
            }

            resultsLayer.addMany(features);
            var { Name, Layer } = graphic.attributes;
            if (Name.indexOf('Conduit') >= 0) {
              this.visibleLine = true;
            }
            if (Name.indexOf('Junction') >= 0 || Name.indexOf('WS') >= 0) {
              this.visiblePoint = true;
            }
          } else {
            // hovered = false;
            // this.visiblePoint = false;
            resultsLayer.removeAll();
          }
        });
      });

      // esri-layer-list__item-label
      //esri-layer-list__item-title
      var count = 0;
      let layerList = new LayerList({
        view: view,
        listItemCreatedFunction: event => {
          // console.log(event);
        }
      });

      view.ui.add(layerList, {
        position: 'top-right'
      });

      layerList
        .when(layerView => {
          // The layerview for the layer
          let list = document.getElementsByClassName('esri-layer-list__item-title');
          for (let i = 0; i < list.length; i++) {
            let cur = list[i];
            let title = cur.innerText;
            if (title.indexOf('管道') >= 0 || title.indexOf('管网') >= 0) {
              if (title.indexOf('雨污') < 0) {
                title = title.replace('网', '道');
              }
              cur.onclick = e => {
                console.log(e.path[0].innerText);
                if (title.indexOf('雨污') < 0) {
                  let fl = fluidLayerMapper[title];
                  if (fl && fl.setVisible instanceof Function) {
                    let vis = fl.visible;
                    fl.setVisible(!vis);
                  }
                } else {
                  let title1, title2
                  if (title == "雨污管网") {
                    title1 = "雨水管道"
                    title2 = "污水管道"
                  } else if (title == "小区雨污管网") {
                    title1 = "小区雨水管道"
                    title2 = "小区污水管道"
                  }
                  let fl = fluidLayerMapper[title1];
                  if (fl && fl.setVisible instanceof Function) {
                    let vis = fl.visible;
                    fl.setVisible(!vis);
                  }
                  fl = fluidLayerMapper[title2];
                  if (fl && fl.setVisible instanceof Function) {
                    let vis = fl.visible;
                    fl.setVisible(!vis);
                  }
                }
              };
            }
          }
        })
        .catch(function (error) {
          // An error occurred during the layerview creation
        });
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
    min-width: 800px;
    height: 100%;
    width: 100%;
  }
}
.paddingBox-container {
  padding: 4px !important;
}
.horizontal .app-main {
  background-color: #293348 !important;
}
.ant-descriptions-item-label {
  min-width: 100px;
  padding: 8px 12px !important;
}
.esri-component.esri-widget--panel {
  width: 220px !important;
}
.esri-popup__main-container {
  max-width: 250px !important;
}
.esri-layer-list__item-toggle{
  pointer-events: none !important;
}
</style>
