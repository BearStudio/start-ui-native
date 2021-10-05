import React from 'react';

import { Box, useTheme } from 'native-base';
import PropTypes from 'prop-types';
import { FlatList } from 'react-native';

import { displayStyles } from '@/styles/display.style';

const GridView = ({
  items,
  renderItem,
  numColumns,
  keyExtractor,
  columnSpacing,
  rowSpacing,
  ...rest
}) => {
  const theme = useTheme();

  return (
    <FlatList
      listKey
      // this is required for shadows to be able to be larger than the item width
      style={{ ...displayStyles.overflowVisibleTrick }}
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
      contentContainerStyle={{
        ...displayStyles.overflowVisibleTrick,
      }}
      columnWrapperStyle={{ marginLeft: -1 * columnSpacing }}
      numColumns={numColumns}
      keyExtractor={keyExtractor}
      ItemSeparatorComponent={() => (
        <Box style={{ height: theme.sizes[rowSpacing] }} />
      )}
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
