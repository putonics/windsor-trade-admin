// import { lazy } from "react"
// import Loadable from "./Loadable"
// Loadable(lazy(() => route.element))

import Dash from "../../components/dashboard/Dash"
import Login from "../../components/Login"
import PendingPackages from "../../components/packages/PendingPackages"
import SettingsPage from "../../components/settings/SettingsPage"
import PendingWithdrawals from "../../components/withdrawals/PendingWithdrawals"
import PageNotFound from "./PageNotFound"
export default [
    {
        path: "/",
        element: <Login />,
        auth: false
    },
    {
        path: "/dash",
        element: <Dash />,
        title: 'Inactive Users',
        icon: 'person-falling',
        auth: true
    },
    {
        path: "/packages",
        element: <PendingPackages />,
        title: 'Package',
        icon: 'box',
        auth: true
    },
    {
        path: "/withdrawals",
        element: <PendingWithdrawals />,
        title: 'Withdrawals',
        icon: 'circle-dollar-to-slot',
        auth: true
    },
    {
        path: "/settings",
        element: <SettingsPage />,
        title: 'Settings',
        icon: 'screwdriver-wrench',
        auth: true
    },
    {
        path: '/*',
        element: <PageNotFound />,
        auth: false
    }
]