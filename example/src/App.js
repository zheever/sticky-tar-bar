import React from 'react';
import { WhiteSpace } from 'antd-mobile';
import StickyTarBar from 'sticky-tar-bar';
import 'antd-mobile/lib/white-space/style/index.css';
import './index.css';

const tabs = [{ title: 'First Tab' }, { title: 'Second Tab' }, { title: 'Third Tab' }];

// const styles = require('./index.less');

export default class Test extends React.PureComponent {
  render() {
    return (
      <div className={'main'}>
        <div className={'box'} />
        <StickyTarBar tabs={tabs} top={60} disableRem={true}>
          <div style={{ display: 'flex', height: '2500px', backgroundColor: '#fff' }}>Content of first tab</div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '250px', backgroundColor: '#fff' }}>Content of second tab</div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '250px', backgroundColor: '#fff' }}>Content of third tab</div>
        </StickyTarBar>
        <WhiteSpace />
      </div>
    );
  }
}
