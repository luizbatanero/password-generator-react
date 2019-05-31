import React from 'react';
import Settings from './components/Settings';
import PasswordList from './components/PasswordList';
import { generatePasswords } from './utility/password-generator';
import { Grid, Header } from 'semantic-ui-react';

class App extends React.Component {
  state = {
    passwords: [],
    isLoading: false
  };

  handleGenerate = settings => {
    this.setState({ isLoading: true }, () => {
      setTimeout(() => {
        this.setState({
          passwords: generatePasswords(settings),
          isLoading: false
        });
      }, 300);
    });
  };

  render() {
    return (
      <div
        style={{ background: '#f9fbfd', height: '100vh', overflowY: 'scroll' }}
      >
        <Grid container centered className="App">
          <Grid.Column style={{ maxWidth: 450, padding: '70px 0' }}>
            <Header as="h2" textAlign="center">
              Password Generator
            </Header>
            <Settings handleGenerate={this.handleGenerate} />
            <PasswordList
              passwords={this.state.passwords}
              isLoading={this.state.isLoading}
            />
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default App;
