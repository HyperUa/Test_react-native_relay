import * as queryConfig from './queryConfigs';
import Dashboard from './components/Dashboard';

export default function dashboardRoute() {
  return {
    title: 'Dashboard',
    Component: Dashboard,
    queryConfig: new queryConfig.BaseQueryConfig()
  }
}