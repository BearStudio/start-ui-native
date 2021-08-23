import React from 'react';

import PropTypes from 'prop-types';
import {FlatList} from 'react-native';
import {Div} from 'react-native-magnus';
import {displayStyles} from '../../../styles/display.style';

const GridView = ({
  items,
  renderItem,
  numColumns,
  keyExtractor,
  columnSpacing,
  rowSpacing,
  ...rest
}) => {
  return (
    <FlatList
      listKey
      // this is required for shadows to be able to be larger than the item width
      style={{...displayStyles.overflowVisibleTrick}}
      data={items}
      renderItem={({item, index}) => (
        <Div
          flex={1 / numColumns}
          maxWidth={
            // this is a hotfix, because on Huawei P30, maxWidth: 50% totaly breaks the layout
            items.length % numColumns !== 0 ? `${100 / numColumns}%` : undefined
          }
          pl={columnSpacing}>
          {renderItem({item, index})}
        </Div>
      )}
      contentContainerStyle={{
        ...displayStyles.overflowVisibleTrick,
      }}
      columnWrapperStyle={{marginLeft: -1 * columnSpacing}}
      numColumns={numColumns}
      keyExtractor={keyExtractor}
      ItemSeparatorComponent={() => <Div style={{height: rowSpacing}} />}
      {...rest}
    />
  );
};

export default GridView;

GridView.propTypes = {
  items: PropTypes.array.isRequired,
  renderItem: PropTypes.func.isRequired,
  numColumns: PropTypes.number,
  columnSpacing: PropTypes.number,
  rowSpacing: PropTypes.number,
  listKey: PropTypes.string,
};

GridView.defaultProps = {
  numColumns: 2,
  columnSpacing: 0,
  rowSpacing: 0,
};
