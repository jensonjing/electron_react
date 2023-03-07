import './LeftMenu.scss';
import Menus from '@/router/menus'
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { Menu } from 'antd';
const { SubMenu } = Menu;

export default function LeftMenu(props: any) {
  const navigate = useNavigate()
  const [selectedKeys, setselectedKeys] = useState([Menus[0].children[0].key])
  const [defaultSelectedKeys, setdefaultSelectedKeys] = useState([Menus[0].children[0].key])
  const [defaultOpenKeys, setdefaultOpenKeys] = useState([Menus[0].key])
  const [openKeys, setopenKeys] = useState([Menus[0].key])

  // 切换菜单
  const handleClick = (e: any) => {
    setselectedKeys(e.key)
    setdefaultSelectedKeys(e.keyPath[0])
    setdefaultOpenKeys(e.keyPath[1])
    navigate('/' + e.key)
  };
  // 展开菜单
  const onOpenChange = (data: any) => {
    setdefaultOpenKeys(data)
    setopenKeys(data)
  };

  useEffect(()=> {
    const pathname: any = (window as any).location.pathname;
    let pkey: any = '';
    Menus.forEach((v: any) => {
      v.children.forEach((item: any) => {
        if (item.key === pathname.split('/')[1]) {
          pkey = v.key;
          return;
        }
      });
    });
    if (pkey) {
      setselectedKeys(pathname.split('/')[1])
      setdefaultSelectedKeys(pathname.split('/')[1])
      setdefaultOpenKeys(pkey)
      setopenKeys(pkey)
    } else {
      console.log(selectedKeys[0])
      navigate('/home')
    }
  }, [])

  return (
    <>
      <Menu
        onClick={handleClick}
        style={{ width: 256 }}
        defaultSelectedKeys={defaultSelectedKeys}
        selectedKeys={selectedKeys}
        defaultOpenKeys={defaultOpenKeys}
        openKeys={openKeys}
        mode="inline"
        onOpenChange={onOpenChange}
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












// interface AppProps {
//   changeRoute: (e: any, path: string, callback?: (e: any) => void) => void;
// }
// interface AppState {
//   selectedKeys: any[];
//   defaultSelectedKeys: any[];
//   defaultOpenKeys: any[];
//   openKeys: any[];
// }

// export default class LeftMenu extends React.Component<AppProps, AppState> {
//   constructor(props: AppProps) {
//     super(props);
//     this.state = {
//       selectedKeys: [Menus[0].children[0].key],
//       defaultSelectedKeys: [Menus[0].children[0].key],
//       defaultOpenKeys: [Menus[0].key],
//       openKeys: [Menus[0].key],
//     };
//     this.handleClick.bind(this);
//   }

//   render() {
//     const { selectedKeys, defaultSelectedKeys, defaultOpenKeys, openKeys } =
//       this.state;
    
//   }
//   componentDidMount() {
//     const pathname: any = (window as any).location.pathname;
//     let pkey = '';
//     Menus.forEach((v: any) => {
//       v.children.forEach((item: any) => {
//         if (item.key === pathname.split('/')[1]) {
//           pkey = v.key;
//           return;
//         }
//       });
//     });
//     if (pkey) {
//       this.setState(() => ({
//         selectedKeys: [pathname.split('/')[1]],
//         defaultSelectedKeys: [pathname.split('/')[1]],
//         defaultOpenKeys: [pkey],
//         openKeys: [pkey],
//       }));
//     } else {
//       // History.push({
//       //   pathname: this.state.selectedKeys[0],
//       // });
//       console.log(this.state.selectedKeys[0])
//       /* navigate({
//         pathname: this.state.selectedKeys[0]
//       }) */
//     }
//   }
  
// }
