import './Footer.less';
import React from 'react';

interface AppProps {}
interface AppState {}
export default class FooterDom extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <div className="btmtxt">
          <p className="home-footer">
            &copy; 2022 JensonJin
            &nbsp;&nbsp;&nbsp;&nbsp;锦瑟年华&nbsp;&nbsp;&nbsp;&nbsp;
            {/* <a href="http://beian.miit.gov.cn" target="_blank">
              京ICP备19004779号-2
            </a> */}
          </p>
          {/* <div className="recordNo">
            <a
              target="_blank"
              className="code-link"
              href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=11010502041177"
            >
              <p
                style={{
                  height: '20px',
                  lineHeight: '20px',
                  margin: '0px 0px 0px 5px',
                  color: '#fff',
                }}
              >
                <img
                  src="https://bkssl.bdimg.com/static/wiki-common/widget/component/footer/img/icon-police_d8a40a4.png"
                  style={{
                    width: '13px',
                    height: '14px',
                    display: 'inline-block',
                    verticalAlign: 'middle',
                    marginTop: '-2px',
                    marginRight: '2px',
                  }}
                />
                京公网安备 11010502041177号
              </p>
            </a>
          </div> */}
        </div>
      </>
    );
  }
}
