<template>
  <ul class="component-DappListHeadings">
    <li v-for="(field, index) in fields" :key="index" class="column" :class="'-' + field.id">
      <div class="field-wrapper" :class="'-' + field.id">
        <span v-if="field.title" @click="sortDapps(field)" class="field -name">
          {{ field.title }}
        </span>
        <Help v-if="field.help" :text="field.help" :bottom="true" :reversed="field.id === 'rank'"/>
        <span v-if="sort === field.id" class="sort-arrow"/>
      </div>
    </li>
  </ul>
</template>

<script>
import Help from './Help'

export default {
  components: {
    Help
  },
  props: ['fields', 'order', 'sort'],
  methods: {
    sortDapps (field) {
      if (field.order) {
        this.$emit('sortDapps', { order: field.order, sort: field.id })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/css/settings';

.component-DappListHeadings {
  background: darken($color--white, 2.5%);
  display: flex;
  padding: 20px 0 17px 0;
  text-transform: uppercase;
  font-size: .95rem;
  position: sticky;
  top: -1px;
}

.field-wrapper {
  display: flex;
  align-items: center;
  height: 100%;
  &.-dau, &.-mau, &.-vol_7d, &.-dev_30d, &.-users_30d {
    .field.-name {
      margin-left: auto;
    }
  }
}

.field.-name {
  .-rank &, .-dau &, .-mau &, .-dev_30d &, .-vol_7d & {
    border-bottom: 1px solid $color--black;
    cursor: pointer;
  }
}

.sort-arrow {
  margin-left: 4px;
  width: 0; 
  height: 0; 
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 8px solid $color--black;
}
  

@include dapp-rankings-widths;
</style>
