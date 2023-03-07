import { AppstoreOutlined, SettingOutlined } from '@ant-design/icons';

const menus: any[] = [
  {
    key: 'sub1',
    icon: <AppstoreOutlined />,
    label: '工具',
    children: [
      {
        key: 'home',
        path: '/home',
        label: '首页',
      },
    ],
  },
  {
    key: 'sub2',
    icon: <SettingOutlined />,
    label: 'JSAPI',
    children: [
      {
        key: 'about',
        path: '/about',
        label: '关于我们',
      },
    ],
  },
];

export default menus;
