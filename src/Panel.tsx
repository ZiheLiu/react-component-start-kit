import * as React from 'react';

import { Prefix } from './utils/const';

interface PanelProps {
  size?: number;
  prefix?: string;
}

class Panel extends React.Component<PanelProps, {}> {
  static defaultProps = {
    size: 300,
    prefix: `${Prefix}-panel`
  };

  render() {
    const { size, prefix } = this.props;

    const panelStyle = {
      width: size,
      height: size
    };
    const panelClass = prefix;
    const saturationClass = `${prefix}-saturation-layer`;
    const brightnessClass = `${prefix}-brightness-layer`;

    return (
      <div style={panelStyle} className={panelClass}>
        <div className={saturationClass} />
        <div className={brightnessClass} />
      </div>
    );
  }
}

export default Panel;
