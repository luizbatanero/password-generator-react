import React from 'react';
import Password from './Password';
import { Loader } from 'semantic-ui-react';

const PasswordList = ({ passwords, isLoading }) => {
  if (isLoading) {
    return (
      <Loader
        active
        size="medium"
        inline="centered"
        style={{ marginTop: 30 }}
      />
    );
  }
  return (
    <div>
      {passwords.map((password) => (
        <Password password={password} key={password} />
      ))}
    </div>
  );
};

export default PasswordList;
