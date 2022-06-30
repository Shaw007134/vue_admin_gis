<template>
  <div class="dynamic-wrapper">
    <div class="active-wrapper">
      <div class="dynamic-title">活跃度统计图</div>
      <active-line />
    </div>
    <div class="timeline-wrapper">
      <div class="dynamic-title">近期动态</div>
      <a-timeline class="padding24" mode="left" style="margin-top: 35px">
        <a-timeline-item v-for="(item, index) in timelineList" :key="index" :color="item.color">
          <p>{{ item.time }}</p>
          {{ item.title }}
        </a-timeline-item>
      </a-timeline>
    </div>
  </div>
</template>

<script>
import activeLine from './activeLine.vue';
export default {
  name: 'dynamic',
  components: { activeLine },
  data() {
    return {
      timelineList: [
        {
          title: '完成地图页面,arcgis地图还有点bug',
          time: '2022-05-10',
          color: 'red'
        },
        {
          title: '优化角色控制权限，用户可绑定多个角色',
          time: '2022-04-19',
          color: 'gray'
        },

        {
          title: '添加页面loading模块，写了很多个组件',
          time: '2022-03-23',
          color: 'gray'
        },
        {
          title: '异步加载AMap,去除本地的kriging',
          time: '2022-02-08',
          color: 'gray'
        },
        {
          title: '优化webpack',
          time: '2021-12-05',
          color: 'gray'
        },
        {
          title: '完成系统设置的一些功能',
          time: '2020-11-21',
          color: 'gray'
        },
        {
          title: '完成页面权限，分为admin、test、editor和custom自定义权限',
          time: '2020-11-20',
          color: 'gray'
        },
        {
          title: '添加个人设置页面',
          time: '2020-11-15',
          color: 'gray'
        },
        {
          title: '完成全景图，研究下krpano',
          time: '2020-11-11',
          color: 'green'
        },

        {
          title: '完成echarts页面',
          time: '2020-11-09',
          color: 'green'
        },
      ]
    };
  }
};
</script>
<style lang="scss" scoped>
.dynamic-title {
  font-size: 1rem;
  margin-bottom: 15px;
}
.timeline-wrapper {
  margin-top: 24px;
}
</style>
