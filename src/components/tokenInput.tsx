import React, { useState, useEffect } from 'react';
import storageService, { StorageKey } from '../utils/storageService';
import httpService from '../utils/httpService';

const TokenInputComponent: React.FC = () => {
  const [tokenInput, setTokenInput] = useState<string | null>(null);
  const [isValid, setIsValid] = useState<boolean>(false);
  const storage = storageService;
  useEffect(() => {
    const token = storage.getItem(StorageKey.TOKEN);
    setTokenInput(token);
    setIsValid(!!token);
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setTokenInput(value);
    setIsValid(!!value);
  };

  const setToken = () => {
    if (tokenInput) {
      httpService.setToken(tokenInput);
      storage.setItem(StorageKey.TOKEN, tokenInput);
    }
  };

  return (
    <div className="flex flex-row p-2 gap-2 w-full">
      <input
        className="input input-accent w-full"
        type="text"
        placeholder="Enter your token here"
        value={tokenInput || ''}
        onChange={handleInputChange}
      />
      <button
        className="btn btn-accent"
        onClick={setToken}
        disabled={!isValid}
      >
        Set
      </button>
    </div>
  );
};

export default TokenInputComponent;