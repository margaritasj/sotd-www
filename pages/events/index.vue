<template>
<LayoutMain>
  <div>
    <Search/>
    <div class="wrapper -results-filters">
      <div class="wrapper -filters">
        <Calendar/>
      </div>
      <div class="wrapper -results">
        <CountRefine/>
        <Items/>
        <Pager/>
      </div>
    </div>
    <nuxt-child/>
  </div>
</LayoutMain>
</template>

<script>
  import Calendar from '~/components/events/list/Calendar.vue'
  import CountRefine from '~/components/events/list/CountRefine.vue'
  import Items from '~/components/events/list/Items.vue'
  import LayoutMain from '~/components/LayoutMain'
  import Pager from '~/components/events/list/Pager.vue'
  import Search from '~/components/events/list/Search.vue'

  export default {
    components: {
      Calendar,
      CountRefine,
      Items,
      LayoutMain,
      Pager,
      Search
    },
    computed: {
      categoryQuery () {
        return this.$store.getters['events/list/categoryQuery']
      },
      eventCount () {
        return this.$store.getters['statEventCount']
      },
      tagQuery () {
        return this.$store.getters['events/list/tagQuery']
      }
    },
    mounted () {
      this.$store.dispatch('setSiteSection', 'events')
      this.$store.dispatch('events/list/setFriendlyQuery', this.$route.params)
      this.$store.dispatch('events/list/setFriendlyUrl')
      this.$store.dispatch('events/list/fetchItems')
    },
    watch: {
      'tagQuery': function () {
        this.$store.dispatch('events/list/setFriendlyUrl')
      },
      'categoryQuery': function () {
        this.$store.dispatch('events/list/setFriendlyUrl')
      }
    },
    head () {
      return {
        title: 'State of the ÐApps — ' + this.eventCount + ' Upcoming Events'
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~assets/css/settings';

  .-results-filters {
    &.wrapper {
      display: flex;
      flex-direction: column-reverse;
      max-width: 900px;
      margin: 0 auto;
      padding: 25px 20px;
      @include tweakpoint('min-width', $tweakpoint--default) {
        flex-direction: row-reverse;
        max-width: 1000px;
      }
    }
  }

  .-results {
    &.wrapper {
      flex-grow: 1;
      @include tweakpoint('min-width', $tweakpoint--default) {
        margin-right: 10px;
      }
    }
  } 

  .-filters {
    &.wrapper {
      margin: 0 auto;
      width: 100%;
      @include tweakpoint('min-width', $tweakpoint--default) {
        width: 350px;
      }
    }
  } 
</style>
