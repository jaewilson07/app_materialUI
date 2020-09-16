export const HEADER = [
  {
    title: 'Home',
    path: '/',
    component: () => 'home',
    headerTab: true,
  },
  {
    title: 'Services',
    path: '/services',
    headerTab: true,
    component: () => 'CustomSoftware',
    menuItem: 'services-menu',
  },
  {
    title: 'Software',
    path: '/services/software',
    component: () => 'software',
    headerTab: false,
    menuItem: 'services-menu',
  },
  {
    title: 'Websites',
    path: '/services/websites',
    component: () => 'websites',
    headerTab: false,
    menuItem: 'services-menu',
  },
  {
    title: 'Mobiles Software',
    path: '/services/mobile',
    component: () => 'mobile software',
    headerTab: false,
    menuItem: 'services-menu',
  },

  {
    title: 'Revolution',
    path: '/Revolution',
    component: () => 'revolution',
    headerTab: true,
  },
  {
    title: 'AboutUs',
    path: '/About',
    component: () => 'About Us',
    headerTab: true,
  },
  {
    title: 'ContactUs',
    path: '/Contact',
    component: () => 'contact',
    headerTab: true,
  },

  {
    title: 'Free Estimate',
    path: '/estimate',
    component: () => 'estimate',
    headerTab: false,
    headerButton: true,
  },
];
