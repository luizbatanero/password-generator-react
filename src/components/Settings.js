import React from 'react';
import { Slider } from 'react-semantic-ui-range';
import {
  Segment,
  Button,
  Icon,
  Form,
  Label,
  Checkbox
} from 'semantic-ui-react';

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
      this.setState({ [target.name]: target.value });
    }
  };

  handleCheckbox = (e, { name, checked }) => {
    this.setState({ [name]: checked });
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
      numbers,
      length,
      amount
    } = this.state;

    if (symbols && !allowedSymbols.length) {
      this.setState({ symbols: false });
    }
    if (!lowerCase && !upperCase && !symbols && !numbers) {
      this.setState({ lowerCase: true });
    }

    return (
      <Segment stacked>
        <div style={{ marginBottom: 10 }}>
          <Slider
            value={length}
            color="grey"
            settings={{
              start: length,
              min: 3,
              max: 24,
              step: 1,
              onChange: value => this.setState({ length: value })
            }}
            style={{ inner: { margin: 0 } }}
          />
          <Label color="grey" size="large" style={{ margin: '3px 0 0' }}>
            password length
            <Label.Detail>{length}</Label.Detail>
          </Label>
        </div>
        <Form.Checkbox
          label="lower case letters"
          name="lowerCase"
          checked={this.state.lowerCase}
          onChange={this.handleCheckbox}
          style={{ marginBottom: 5 }}
        />
        <Form.Checkbox
          label="upper case letters"
          name="upperCase"
          checked={this.state.upperCase}
          onChange={this.handleCheckbox}
          style={{ marginBottom: 5 }}
        />
        <Form.Checkbox
          label="numbers"
          name="numbers"
          checked={this.state.numbers}
          onChange={this.handleCheckbox}
          style={{ marginBottom: 5 }}
        />
        <Form.Input
          label={
            <Checkbox
              label=""
              name="symbols"
              checked={this.state.symbols}
              onChange={this.handleCheckbox}
              disabled={!this.state.allowedSymbols.length}
            />
          }
          name="allowedSymbols"
          value={this.state.allowedSymbols}
          onChange={this.handleChange}
        />
        <div style={{ margin: '10px 0' }}>
          <Slider
            value={amount}
            color="grey"
            settings={{
              start: amount,
              min: 1,
              max: 20,
              step: 1,
              onChange: value => this.setState({ amount: value })
            }}
            style={{ inner: { margin: 0 } }}
          />
          <Label color="grey" size="large" style={{ margin: '3px 0 0' }}>
            number of passwords
            <Label.Detail>{amount}</Label.Detail>
          </Label>
        </div>
        <Button
          fluid
          basic
          icon
          onClick={() => this.props.handleGenerate(this.state)}
        >
          <Icon name="refresh" />
        </Button>
      </Segment>
    );
  }
}

export default Settings;
