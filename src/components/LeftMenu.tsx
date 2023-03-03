import './LeftMenu.less';
import React from 'react';
import { Menu } from 'antd';
const { SubMenu } = Menu;
// import { history as History } from 'umi';
// import Menus from '../router/menus';
const Menus: any = []

interface AppProps {
  changeRoute: (e: any, path: string, callback?: (e: any) => void) => void;
}
interface AppState {
  selectedKeys: any[];
  defaultSelectedKeys: any[];
  defaultOpenKeys: any[];
  openKeys: any[];
}

export default class LeftMenu extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      selectedKeys: [Menus[0].children[0].key],
      defaultSelectedKeys: [Menus[0].children[0].key],
      defaultOpenKeys: [Menus[0].key],
      openKeys: [Menus[0].key],
    };
    this.handleClick.bind(this);
  }

  render() {
    const { selectedKeys, defaultSelectedKeys, defaultOpenKeys, openKeys } =
      this.state;
    return (
      <>
        <Menu
          onClick={this.handleClick}
          style={{ width: 256 }}
          defaultSelectedKeys={defaultSelectedKeys}
          selectedKeys={selectedKeys}
          defaultOpenKeys={defaultOpenKeys}
          openKeys={openKeys}
          mode="inline"
          onOpenChange={this.onOpenChange.bind(this)}
          items={Menus}
        >
          {/* {Menus.map((v: any) => {
            return (
              <SubMenu key={v.key} icon={v.icon} title={v.title}>
                {v.children.map((item: any) => {
                  return <Menu.Item key={item.key}>{item.name}</Menu.Item>;
                })}
              </SubMenu>
            );
          })} */}
          {/* <SubMenu key="sub1" icon={<AppstoreOutlined />} title="工具">
            <Menu.Item key="oss">Oss文件上传</Menu.Item>
            <Menu.Item key="urlParams">Url参数生成</Menu.Item>
            <Menu.Item key="ossPicSuffix">Oss图片后缀处理</Menu.Item>
            <Menu.Item key="bizQrCode">业务URL二维码生成</Menu.Item>
            <SubMenu key="sub3" title="Submenu">
              <Menu.Item key="7">Option 7</Menu.Item>
              <Menu.Item key="8">Option 8</Menu.Item>
            </SubMenu>
          </SubMenu>
          <SubMenu key="sub2" icon={<SettingOutlined />} title="JSAPI">
            <Menu.Item key="mockTool">Mock数据</Menu.Item>
          </SubMenu> */}
        </Menu>
      </>
    );
  }
  componentDidMount() {
    const pathname: any = (history as any).location.pathname;
    let pkey = '';
    Menus.forEach((v: any) => {
      v.children.forEach((item: any) => {
        if (item.key === pathname.split('/')[1]) {
          pkey = v.key;
          return;
        }
      });
    });
    if (pkey) {
      this.setState(() => ({
        selectedKeys: [pathname.split('/')[1]],
        defaultSelectedKeys: [pathname.split('/')[1]],
        defaultOpenKeys: [pkey],
        openKeys: [pkey],
      }));
    } else {
      // History.push({
      //   pathname: this.state.selectedKeys[0],
      // });
    }
  }
  // 切换菜单
  handleClick = (e: any) => {
    this.props.changeRoute(this, e.key);
    this.setState(() => ({
      selectedKeys: [e.key],
      defaultSelectedKeys: [e.keyPath[0]],
      defaultOpenKeys: [e.keyPath[1]],
    }));
  };
  // 展开菜单
  onOpenChange = (data: any) => {
    this.setState(() => ({
      defaultOpenKeys: data,
      openKeys: data,
    }));
  };
}
