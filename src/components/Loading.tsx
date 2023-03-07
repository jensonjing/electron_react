import './Loading.scss';
import { Spin } from 'antd';

function Loading(props: any) {
  const signstyle: any = {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,.5)',
    flexDirection: 'column',
    color: '#fff',
  };

  const isShow = props.visible ? '' : 'none';
  return (
    <>
      <div className="l_box" style={{ display: isShow }}>
        <Spin style={signstyle} size="large" tip="Loading..." />
      </div>
    </>
  );
}

export default Loading;
