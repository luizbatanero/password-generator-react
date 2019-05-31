import React, { useState } from 'react';
import { Button, Popup } from 'semantic-ui-react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import zxcvbn from 'zxcvbn';

const Password = ({ password }) => {
  const [copied, setCopied] = useState(false);
  return (
    <div style={{ display: 'block', margin: '5px 0', fontFamily: 'monospace' }}>
      {password.split('').map((char, index) => {
        if (char.match(/\d/)) {
          return (
            <span style={{ color: 'blue' }} key={index}>
              {char}
            </span>
          );
        } else if (char.match(/[^a-zA-Z0-9]/)) {
          return (
            <span style={{ color: 'red' }} key={index}>
              {char}
            </span>
          );
        }
        return (
          <span className={''} key={index}>
            {char}
          </span>
        );
      })}{' '}
      <small>
        [strength:{zxcvbn(password).score}]{' '}
        <Popup
          inverted
          size="tiny"
          content={copied ? 'Copied!' : 'Copy to clipboard'}
          trigger={
            <CopyToClipboard text={password} onCopy={() => setCopied(true)}>
              <Button icon="copy outline" color="teal" />
            </CopyToClipboard>
          }
          onClose={() => setCopied(false)}
        />
      </small>
    </div>
  );
};

export default Password;
