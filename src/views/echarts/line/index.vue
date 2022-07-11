<template>
  <div class="line-wrapper">
    <a-row :gutter="24" class="line-list">

      <a-col :span="24">
        <a-card title="流量统计图" size="small" :hoverable="true" :bordered="false">
          <more-line class="chart-line" />
        </a-card>
      </a-col>
    </a-row>
    <a-row :gutter="24" class="line-list">
      <a-col :span="24">
        <a-card title="COD统计图" size="small" :hoverable="true" :bordered="false">
          <only-line class="chart-line" />
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { onlyLine, moreLine,} from './components';
export default {
  name: 'lineChart',
  components: { onlyLine, moreLine, },
  data() {
    return {};
  }
};
</script>
<style lang="scss" scoped>
.line-header{
  // width: 600px;
  // font-size: 12px !important;
}
.line-list {
  margin-bottom: 25px;
  .chart-line {
    height: 280px;
    width: 450px;
  }
}
</style>
