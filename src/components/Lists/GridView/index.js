import React from 'react';

import { Box, useToken } from 'native-base';
import PropTypes from 'prop-types';
import { FlatList } from 'react-native';

import { useOverflowStyles } from '@/hooks/useOverflowStyles';

const GridView = ({
  items,
  renderItem,
  numColumns,
  keyExtractor,
  columnSpacing,
  rowSpacing,
  overflowSpacing,
  ...rest
}) => {
  const overflowStyles = useOverflowStyles(overflowSpacing);
  const [columnSpacingValue, rowSpacingValue] = useToken('sizes', [
    columnSpacing,
    rowSpacing,
  ]);

  return (
    <FlatList
      listKey
      // this is required for shadows to be able to be larger than the item width
      style={overflowStyles}
      data={items}
      renderItem={({ item, index }) => (
        <Box
          flex={1 / numColumns}
          maxWidth={
            // this is a hotfix, because on Huawei P30, maxWidth: 50% totaly breaks the layout
            items.length % numColumns !== 0 ? `${100 / numColumns}%` : undefined
          }
          pl={columnSpacing}
        >
          {renderItem({ item, index })}
        </Box>
      )}
      contentContainerStyle={overflowStyles}
      columnWrapperStyle={{
        marginLeft: -1 * columnSpacingValue,
      }}
      numColumns={numColumns}
      keyExtractor={keyExtractor}
      ItemSeparatorComponent={() => <Box style={{ height: rowSpacingValue }} />}
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
  overflowSpacing: PropTypes.number,
  listKey: PropTypes.string,
};

GridView.defaultProps = {
  numColumns: 2,
  columnSpacing: 0,
  rowSpacing: 0,
  overflowSpacing: undefined,
};
