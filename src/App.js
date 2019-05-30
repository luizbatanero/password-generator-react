import React from 'react';
import zxcvbn from 'zxcvbn';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Button, Popup } from 'semantic-ui-react';
import { Slider } from 'react-semantic-ui-range';

class App extends React.Component {
  state = {
    length: 14,
    lowerCase: true,
    upperCase: true,
    numbers: true,
    symbols: true,
    allowedSymbols: '@!*_-:=#/{}[]',
    amount: 3,
    passwords: [],
    copied: false
  };

  componentDidUpdate = () => {
    const {
      symbols,
      allowedSymbols,
      lowerCase,
      upperCase,
      numbers
    } = this.state;

    if (symbols && allowedSymbols.length === 0) {
      this.setState({ symbols: false });
    }
    if (!lowerCase && !upperCase && !symbols && !numbers) {
      this.setState({ lowerCase: true });
    }
  };

  handleChange = e => {
    this.setState({
      [e.target.name]:
        e.target.type === 'checkbox' ? e.target.checked : e.target.value
    });
  };

  generatePasswords = () => {
    const {
      length,
      lowerCase,
      upperCase,
      numbers,
      symbols,
      allowedSymbols,
      amount
    } = this.state;

    let characters = '';
    let passwords = [];

    if (lowerCase) characters = characters + 'abcdefghijklmnopqrstuvwxyz';
    if (upperCase) characters = characters + 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (numbers) characters = characters + '0123456789';
    if (symbols) characters = characters + allowedSymbols;

    while (passwords.length < amount) {
      let password = [];
      while (password.length < length) {
        let randomIndex = Math.floor(Math.random() * characters.length);
        if (
          password.length === 0 &&
          (lowerCase || upperCase) &&
          characters[randomIndex].match(/[^a-z]/i)
        ) {
          continue;
        } else {
          password.push(characters[randomIndex]);
        }
      }
      passwords.push(password.join(''));
    }

    return passwords;
  };

  handleGenerate = () => {
    this.setState({ passwords: this.generatePasswords() });
  };

  render() {
    return (
      <div style={{ width: 500, margin: '50px auto' }}>
        <div>
          length:
          <input type="text" name="length" value={this.state.length} readOnly />
          <Slider
            value={this.state.length}
            color="teal"
            settings={{
              start: this.state.length,
              min: 6,
              max: 64,
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
        <button onClick={this.handleGenerate}>Generate</button>
        <h2 style={{ fontFamily: 'monospace' }}>
          {this.state.passwords.map(password => (
            <span style={{ display: 'block', margin: '5px 0' }}>
              {password.split('').map(char => {
                if (char.match(/\d/)) {
                  return <span style={{ color: 'blue' }}>{char}</span>;
                } else if (this.state.allowedSymbols.includes(char)) {
                  return <span style={{ color: 'red' }}>{char}</span>;
                }
                return <span>{char}</span>;
              })}{' '}
              <small>
                [strength:{zxcvbn(password).score}]{' '}
                <Popup
                  inverted
                  size="tiny"
                  content={this.state.copied ? 'Copied!' : 'Copy to clipboard'}
                  trigger={
                    <CopyToClipboard
                      text={password}
                      onCopy={() => this.setState({ copied: true })}
                    >
                      <Button icon="copy outline" color="teal" />
                    </CopyToClipboard>
                  }
                  onClose={() => this.setState({ copied: false })}
                />
              </small>
            </span>
          ))}
        </h2>
      </div>
    );
  }
}

export default App;
