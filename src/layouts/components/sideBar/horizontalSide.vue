<template>
  <div class="horizontalSide-wrapper flex-sub">
    <logo class="horizontalSide-logo" />
    <a-menu mode="horizontal" theme="dark" :selectedKeys="[$route.path]" class="side-main">
      <template v-for="item in baseRoute">
        <menu-item v-if="!item.children && !item.hidden" :key="item.path" :currentRoute="item" />
        <template v-else v-for="temp in item.children">
          <menu-item v-if="!temp.children" :key="temp.path" :currentRoute="temp" />
          <sub-menu v-else :key="temp.path" :currentRoute="temp"></sub-menu>
        </template>
      </template>
    </a-menu>
  </div>
</template>

<script>
import logo from './logo';
import subMenu from './subMenu';
import menuItem from './menuItem';
import { mapGetters } from 'vuex';
import store from '../../../store';
export default {
  name: 'sideBar',
  components: { logo, subMenu, menuItem },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(['baseRoute'])
  },
  mounted() {
    const roleIds = '1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36'
    store.dispatch('permission/getRoute', roleIds);
    console.log(this.baseRoute)
  }
};
</script>
<style lang="scss" scoped>
.horizontalSide-logo {
  height: 54px;
  line-height: 54px;
  width: 240px;
}
.side-main {
  width: calc(100% - 240px);
  height: 54px;
  line-height: 54px;
  background: #293348;
  float: right;
}
</style>
