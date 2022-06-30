export default {
  install(Vue) {
    Vue.prototype.THEME_LIST = [
      {
        label: '混合主题',
        key: 'mixins'
      },
      {
        label: '浅色主题',
        key: 'white'
      },
      {
        label: '深色主题',
        key: 'dark'
      }
    ];
    Vue.prototype.SKILL_LIST = [
      {
        label: 'admin',
        key: 1
      },
      {
        label: 'test',
        key: 2
      },
      {
        label: 'editor',
        key: 3
      },
    ];

    Vue.prototype.LAYOUT_LIST = [
      {
        label: '左侧导航',
        key: 'inline'
      },
      {
        label: '头部导航',
        key: 'horizontal'
      }
    ];
  }
};
