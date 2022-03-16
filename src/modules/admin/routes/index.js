import MainLanding from '../MainLanding.vue'
import Order from '../OrderComponent.vue'
import Inventory from '../InvetoryComponent.vue'
import SalesReport from '../SalesReportComponent.vue'

let ls = JSON.parse(localStorage.getItem('udata'))

export default [
    {
        path: '/admin',
        name: 'adminlanding',
        component: MainLanding,
        beforeEnter: (to, from, next) => {
            if(ls.user_role == 1){
                next();
            }
            else{
                next('/');
            }
        } 
    },
    {
        path: '/order',
        name: 'order',
        component: Order,
        beforeEnter: (to, from, next) => {
            if(ls.user_role == 1){
                next();
            }
            else{
                next('/');
            }
        }
    },
    {
        path: '/inventory',
        name: 'inventory',
        component: Inventory,
        beforeEnter: (to, from, next) => {
            if(ls.user_role == 1){
                next();
            }
            else{
                next('/');
            }
        }
    },
    {
        path: '/salesreport',
        name: 'salesreport',
        component: SalesReport,
        beforeEnter: (to, from, next) => {
            if(ls.user_role == 1){
                next();
            }
            else{
                next('/');
            }
        }
    }
]