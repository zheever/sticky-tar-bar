import React from 'react';
import { Tabs } from 'antd-mobile';
import * as ReactSticky from 'react-sticky';
import { autobind } from 'core-decorators';
import { px2rem } from './utils/rem-util';
import throttle from './utils/throttle';
import { withoutProps } from './utils/without-props';
import 'antd-mobile/lib/tabs/style/index.css';
import './styles.css';

const Sticky = ReactSticky.__moduleExports.Sticky;
const StickyContainer = ReactSticky.__moduleExports.StickyContainer;

export default class StickyTarBar extends React.PureComponent {
  resizeListener = undefined;

  constructor(props) {
    super(props);
    this.state = {
      clientWidth: document.body.clientWidth
    };
  }

  static defaultProps = {
    top: 0
  };

  componentDidMount() {
    this.resizeListener = window.addEventListener('resize', throttle(this.onResize, 100, 300));
  }

  componentWillUnmount() {
    if (this.resizeListener) {
      window.removeEventListener(this.resizeListener);
    }
  }

  @autobind
  onResize() {
    this.setState({
      clientWidth: document.body.clientWidth
    });
  }

  static getTopOffset(top, clientWidth, disableRem) {
    if (disableRem) return -top;
    return -top / (750 / clientWidth > 1 ? 750 / clientWidth : 1);
  }

  static getTopDistance(top, disableRem) {
    console.log(`${px2rem(top)}rem`);
    if (disableRem) {
      return top;
    } else {
      return `${px2rem(top)}rem`;
    }
  }

  @autobind
  renderTabBar(props) {
    const { top, renderTabs, disableRem } = this.props;
    const { clientWidth } = this.state;
    return (
      <Sticky topOffset={StickyTarBar.getTopOffset(top, clientWidth, disableRem)}>
        {({ style }) => {
          return (
            <div style={{ ...Object.assign({}, style, { top: StickyTarBar.getTopDistance(top, disableRem) }), zIndex: 1 }}>
              {renderTabs ? renderTabs(props) : <Tabs.DefaultTabBar {...props} />}
            </div>
          );
        }}
      </Sticky>
    );
  }

  render() {
    const { tabs, children, className, ...restProps } = withoutProps(this.props, ['top', 'renderTabs']);
    const { clientWidth } = this.state;
    console.log(ReactSticky);
    return (
      <StickyContainer key={clientWidth}>
        <Tabs className={className} tabs={tabs} renderTabBar={this.renderTabBar} {...restProps}>
          {children}
        </Tabs>
      </StickyContainer>
    );
  }
}
