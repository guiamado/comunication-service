import moment from 'moment';

export default {
    filters: {
        formataData(value) {
            if (value) {
                return moment(String(value)).format('DD/MM/YYYY hh:mm');
            }
            return false;
        },
    },
    create(Vue) {
        Object.keys(this.filters).forEach((filter) => {
            Vue.filter(filter, this.filters[filter]);
        });
    },
};
