// CartIcon.tsx
import React from 'react';
import { Svg, Path } from 'react-native-svg';

interface Props {
  width: number;
  height: number;
  color: string;
}

const CartIcon: React.FC<Props> = ({ width, height, color }) => {
  return (
    <Svg viewBox="0 0 24 24" width={width} height={height} fill={color}>
      <Path d="M19 7H7.35l-.52-2.3L5 3H2v2h3l2.07 9.19C7.21 14.6 8.69 16 10.5 16c1.8 0 3.23-1.4 3.43-3.19L17 5h2V3h-3l-1-2zM7.5 19c-1.38 0-2.5 1.12-2.5 2.5S6.12 24 7.5 24 10 22.88 10 21.5 8.88 19 7.5 19zm9 0c-1.38 0-2.5 1.12-2.5 2.5S15.12 24 16.5 24s2.5-1.12 2.5-2.5-.78-2.5-2.5-2.5z" />
    </Svg>
  );
};

export default CartIcon;
