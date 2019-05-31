import React, { useState } from 'react';
import { Card, Button, Popup, Progress } from 'semantic-ui-react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import zxcvbn from 'zxcvbn';

const strengthColors = ['red', 'orange', 'yellow', 'olive', 'teal'];

function charColor(char) {
  if (char.match(/\d/)) {
    return 'teal';
  } else if (char.match(/[^a-zA-Z0-9]/)) {
    return 'brown';
  } else {
    return 'black';
  }
}

const Password = ({ password }) => {
  const [copied, setCopied] = useState(false);
  const passwordStrength = zxcvbn(password).score;

  return (
    <Card fluid>
      <Card.Content style={{ display: 'flex', alignItems: 'center' }}>
        {password.split('').map((char, index) => (
          <span
            style={{ color: charColor(char), fontFamily: 'monospace' }}
            key={index}
          >
            {char}
          </span>
        ))}
        <Popup
          inverted
          size="tiny"
          position="right center"
          content={copied ? 'Copied!' : 'Copy to clipboard'}
          trigger={
            <CopyToClipboard text={password} onCopy={() => setCopied(true)}>
              <Button
                basic
                icon="copy outline"
                style={{ marginLeft: 'auto' }}
              />
            </CopyToClipboard>
          }
          onClose={() => setCopied(false)}
        />
      </Card.Content>
      <Card.Content style={{ padding: 0 }}>
        <Progress
          percent={((passwordStrength + 1) / 5) * 100}
          size="tiny"
          style={{ margin: 0, borderRadius: 0 }}
          color={strengthColors[passwordStrength]}
        />
      </Card.Content>
    </Card>
  );
};

export default Password;
