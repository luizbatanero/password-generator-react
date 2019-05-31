import React from 'react';
import Settings from './components/Settings';
import PasswordList from './components/PasswordList';
import { generatePasswords } from './utility/password-generator';

class App extends React.Component {
  state = {
    passwords: []
  };

  handleGenerate = settings => {
    this.setState({ passwords: generatePasswords(settings) });
  };

  render() {
    return (
      <div style={{ width: 500, margin: '50px auto' }}>
        <Settings handleGenerate={this.handleGenerate} />
        <PasswordList passwords={this.state.passwords} />
      </div>
    );
  }
}

export default App;
