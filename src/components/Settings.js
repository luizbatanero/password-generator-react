import React from 'react';
import { Slider } from 'react-semantic-ui-range';
import { Segment } from 'semantic-ui-react';

class Settings extends React.PureComponent {
  state = {
    length: 14,
    lowerCase: true,
    upperCase: true,
    numbers: true,
    symbols: true,
    allowedSymbols: '@!*_-:=#/{}[]',
    amount: 3
  };

  handleChange = ({ target }) => {
    const invalidSymbol =
      target.name === 'allowedSymbols' && target.value.match(/[a-zA-Z0-9\s]/);

    if (!invalidSymbol) {
      this.setState({
        [target.name]:
          target.type === 'checkbox' ? target.checked : target.value
      });
    }
  };

  componentDidMount() {
    this.props.handleGenerate(this.state);
  }

  componentDidUpdate() {
    this.props.handleGenerate(this.state);
  }

  render() {
    const {
      symbols,
      allowedSymbols,
      lowerCase,
      upperCase,
      numbers
    } = this.state;

    if (symbols && !allowedSymbols.length) {
      this.setState({ symbols: false });
    }
    if (!lowerCase && !upperCase && !symbols && !numbers) {
      this.setState({ lowerCase: true });
    }

    return (
      <Segment stacked>
        <div>
          length:
          <input type="text" name="length" value={this.state.length} readOnly />
          <Slider
            value={this.state.length}
            color="teal"
            settings={{
              start: this.state.length,
              min: 3,
              max: 24,
              step: 1,
              onChange: value => this.setState({ length: value })
            }}
            style={{ inner: { margin: 0 } }}
          />
        </div>
        <div>
          <input
            type="checkbox"
            name="lowerCase"
            checked={this.state.lowerCase}
            onChange={this.handleChange}
          />
          lower case letters
        </div>
        <div>
          <input
            type="checkbox"
            name="upperCase"
            checked={this.state.upperCase}
            onChange={this.handleChange}
          />
          upper case letters
        </div>
        <div>
          <input
            type="checkbox"
            name="numbers"
            checked={this.state.numbers}
            onChange={this.handleChange}
          />
          numbers
        </div>
        <div>
          <input
            type="checkbox"
            name="symbols"
            checked={this.state.symbols}
            onChange={this.handleChange}
            disabled={!this.state.allowedSymbols.length}
          />
          symbols:
          <input
            type="text"
            name="allowedSymbols"
            value={this.state.allowedSymbols}
            onChange={this.handleChange}
          />
        </div>
        <div>
          amount:
          <input type="text" name="amount" value={this.state.amount} readOnly />
          <Slider
            value={this.state.amount}
            color="teal"
            settings={{
              start: this.state.amount,
              min: 1,
              max: 20,
              step: 1,
              onChange: value => this.setState({ amount: value })
            }}
            style={{ inner: { margin: 0 } }}
          />
        </div>
      </Segment>
    );
  }
}

export default Settings;
