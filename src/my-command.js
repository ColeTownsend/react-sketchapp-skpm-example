import React from 'react';
import { render, Text, View } from 'react-sketchapp';
import chroma from 'chroma-js';

// take a hex and give us a nice text color to put over it
const textColor = (hex) => {
  const vsWhite = chroma.contrast(hex, 'white');
  if (vsWhite > 4) { return '#FFF'; }
  return chroma(hex).darken(3).hex();
};

const Swatch = ({ name, hex }) => (
  <View
    name={`Swatch ${name}`}
    style={{
      height: 96,
      width: 96,
      marginRight: 8,
      marginBottom: 8,
      backgroundColor: hex,
      padding: 8,
    }}
  >
    <Text
      name="Swatch Name"
      style={{ color: textColor(hex), fontWeight: 'bold' }}
    >
      {name}
    </Text>
    <Text
      name="Swatch Hex"
      style={{ color: textColor(hex) }}
    >
      {hex}
    </Text>
  </View>
);

const Color = {
  hex: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired,
};

Swatch.propTypes = Color;

const Document = ({ colors }) =>
  <View
    style={{
      flexDirection: 'row',
      flexWrap: 'wrap',
      width: (96 + 8) * 4,
    }}
  >
    { Object.keys(colors).map(color =>
      <Swatch
        name={color}
        hex={colors[color]}
        key={color}
      />,
    )}
  </View>;

Document.propTypes = {
  colors: React.PropTypes.arrayOf(React.PropTypes.shape(...Color)).isRequired,
};

export default function (context) {
  const colorList = {
    Haus: '#F3F4F4',
    Night: '#333',
    Sur: '#96DBE4',
    'Sur Dark': '#24828F',
    Peach: '#EFADA0',
    'Peach Dark': '#E37059',
    Pear: '#93DAAB',
    'Pear Dark': '#2E854B',
  };

  render(<Document colors={colorList} />, context);
}
