import { createOutline, homeOutline, mapOutline } from 'ionicons/icons';
import { FC } from 'react';
import * as Pages from '../pages';
import { paths } from './paths';

interface route {
  label: string,
  path: string,
  component: FC,
  icon?: string,
  tab: boolean,
}

const routes: Array<route> = [
  {
    label: 'Login',
    path: paths.login,
    component: Pages.Login,
    tab: false,
  },
  {
    label: 'SignUp',
    path: paths.signUp,
    component: Pages.SignUp,
    tab: false,
  },
  {
    label: 'Landing',
    path: paths.landing,
    component: Pages.Landing,
    tab: false,
  },
  {
    label: 'Home',
    path: paths.home,
    component: Pages.Home,
    icon: homeOutline,
    tab: true,
  },
  {
    label: 'Details',
    path: paths.details,
    component: Pages.HikeDetails,
    tab: false,
  },
  {
    label: 'Map',
    path: paths.map,
    component: Pages.MapPage,
    icon: mapOutline,
    tab: true,
  },
  {
    label: 'New Hike',
    path: paths.newHike,
    component: Pages.NewHike,
    icon: createOutline,
    tab: true,
  },
];

export default routes;
