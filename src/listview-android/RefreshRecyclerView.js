import React, {Component} from 'react';
import {
  StyleSheet, requireNativeComponent, NativeModules, View, Image, ToastAndroid, ViewStyle,
  Text, FlatList
} from 'react-native';
import RecyclerView from './AndroidRecyclerView';
import DataSource from './DataSource';
import PropTypes from 'prop-types';
import SmartRefreshLayout from "./SmartRefresh";

export default class RefreshRecyclerView extends Component {
  static propTypes = {
    ...View.propTypes,
    renderItem: PropTypes.func,
    dataSource: PropTypes.instanceOf(DataSource),
    windowSize: PropTypes.number,
    initialListSize: PropTypes.number,
    initialScrollIndex: PropTypes.number,
    initialScrollOffset: PropTypes.number,
    inverted: PropTypes.bool,
    itemAnimatorEnabled: PropTypes.bool,
    ListHeaderComponent: PropTypes.element,
    ListFooterComponent: PropTypes.element,
    ListEmptyComponent: PropTypes.element,
    ItemSeparatorComponent: PropTypes.element,
    onVisibleItemsChange: PropTypes.func,
    onRefresh: PropTypes.func,
    onLoadMore: PropTypes.func,
    refreshState: PropTypes.number,
    onScroll: PropTypes.func,
    enableRefresh: PropTypes.bool,
    style: PropTypes.instanceOf(ViewStyle),
    refreshLayoutStyle: PropTypes.instanceOf(ViewStyle)
  };
  recycelView;
  Idle = 0;
  HeaderRefreshing = 1;
  FooterRefreshing = 2;
  NoMoreData = 3;
  Failure = 4;
  FirstLoad = 5;
  PreLoad = 6
  render() {
    const {
      dataSource,
      renderItem,
      ListHeaderComponent,
      ListFooterComponent,
      ListEmptyComponent,
      ItemSeparatorComponent,
      onScroll,
      inverted,
      onRefresh,
      onLoadMore,
      refreshState,
      enableRefresh,
      style,
      refreshLayoutStyle,
      ...reset
    } = this.props;
    return (<SmartRefreshLayout
      enableRefresh={enableRefresh}
      onRefresh={onRefresh}
      onLoadMore={onLoadMore}
      refreshState={this.getRefreshState(refreshState)}
      style={[{width: '100%', flex: 1}, refreshLayoutStyle]}
    >
      <RecyclerView
        style={[style]}
        ref={(component) => this.recycelView = component}
        onVisibleItemsChange={ItemSeparatorComponent}
        ItemSeparatorComponent={ListEmptyComponent}
        ListFooterComponent={ListFooterComponent}
        ListHeaderComponent={ListHeaderComponent}
        renderItem={renderItem}
        dataSource={dataSource}
        inverted={inverted}
        onScroll={onScroll}
        {...reset}
      >
      </RecyclerView>
    </SmartRefreshLayout>);
  }

  getRecyclerViewRef() {
    return this.recycelView;
  }

  getRefreshState(state) {
    let currentState;
    switch (state) {
        case this.Idle:
        currentState = 'Idle';
        break;
      case this.HeaderRefreshing :
        currentState = 'HeaderRefreshing';
        break;
      case this.FooterRefreshing:
        currentState = 'FooterRefreshing';
        break;
      case this.NoMoreData:
        currentState = 'NoMoreData';
        break;
      case this.Failure:
        currentState = 'Failure';
        break;
      case this.FirstLoad:
        currentState = 'FirstLoad';
        break;
    }
    return currentState;
  }
};


