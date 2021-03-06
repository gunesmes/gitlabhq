<script>
import dateFormat from 'dateformat';
import { GlTooltip } from '@gitlab/ui';
import Icon from '~/vue_shared/components/icon.vue';
import { __ } from '~/locale';
import { getDayDifference, getTimeago, dateInWords } from '~/lib/utils/datetime_utility';

export default {
  components: {
    Icon,
    GlTooltip,
  },
  props: {
    date: {
      type: String,
      required: true,
    },
  },
  computed: {
    title() {
      const timeago = getTimeago();
      const { timeDifference, standardDateFormat } = this;
      const formatedDate = standardDateFormat;

      if (timeDifference >= -1 && timeDifference < 7) {
        return `${timeago.format(this.issueDueDate)} (${formatedDate})`;
      }

      return timeago.format(this.issueDueDate);
    },
    body() {
      const { timeDifference, issueDueDate, standardDateFormat } = this;

      if (timeDifference === 0) {
        return __('Today');
      } else if (timeDifference === 1) {
        return __('Tomorrow');
      } else if (timeDifference === -1) {
        return __('Yesterday');
      } else if (timeDifference > 0 && timeDifference < 7) {
        return dateFormat(issueDueDate, 'dddd', true);
      }

      return standardDateFormat;
    },
    issueDueDate() {
      return new Date(this.date);
    },
    timeDifference() {
      const today = new Date();
      return getDayDifference(today, this.issueDueDate);
    },
    isPastDue() {
      if (this.timeDifference >= 0) return false;
      return true;
    },
    standardDateFormat() {
      const today = new Date();
      const isDueInCurrentYear = today.getFullYear() === this.issueDueDate.getFullYear();

      return dateInWords(this.issueDueDate, true, isDueInCurrentYear);
    },
  },
};
</script>

<template>
  <span>
    <span
      ref="issueDueDate"
      class="board-card-info card-number"
    >
      <icon
        :class="{'text-danger': isPastDue, 'board-card-info-icon': true}"
        name="calendar"
      /><time
        :class="{'text-danger': isPastDue}"
        datetime="date"
        class="board-card-info-text">{{ body }}</time>
    </span>
    <gl-tooltip
      :target="() => $refs.issueDueDate"
      placement="bottom"
    >
      <span class="bold">{{ __('Due date') }}</span>
      <br />
      <span :class="{'text-danger-muted': isPastDue}">{{ title }}</span>
    </gl-tooltip>
  </span>
</template>
