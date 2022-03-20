import MainLanding from '../MainLanding.vue'
import Order from '../OrderComponent.vue'
import Inventory from '../InvetoryComponent.vue'
import SalesReport from '../SalesReportComponent.vue'
import Settings from '../SettingsComponent.vue'

//let ls = JSON.parse(localStorage.getItem('udata'))

export default [
    {
        path: '/admin',
        name: 'adminlanding',
        component: MainLanding
    },
    {
        path: '/order',
        name: 'order',
        component: Order
    },
    {
        path: '/inventory',
        name: 'inventory',
        component: Inventory
    },
    {
        path: '/salesreport',
        name: 'salesreport',
        component: SalesReport
    },
    {
        path: '/settings',
        name: 'settings',
        component: Settings
    }
]