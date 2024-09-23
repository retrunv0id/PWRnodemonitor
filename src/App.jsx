import React, { useState } from 'react';
import axios from 'axios';
import '@fortawesome/fontawesome-free/css/all.min.css';


const baseUrl = 'https://pwrrpc.pwrlabs.io'; // API for node status

function App() {
  const [validatorAddress, setValidatorAddress] = useState('');
  const [nodeStatus, setNodeStatus] = useState(null);
  const [error, setError] = useState('');

  const fetchNodeStatus = async () => {
    if (!validatorAddress) {
      setError('Validator address is required');
      return;
    }

    try {
      setError('');
      setNodeStatus(null);

      const statusResponse = await axios.get(`${baseUrl}/validator/`, {
        params: { validatorAddress }
      });
      console.log('Node Status Response:', statusResponse.data);
      setNodeStatus(statusResponse.data.validator);
    } catch (err) {
      if (err.response) {
        console.error('API Error:', err.response.data);
        setError(`Failed to fetch data. Status: ${err.response.status}, Message: ${err.response.data}`);
      } else {
        console.error('Other Error:', err.message);
        setError(`Failed to fetch data. Message: ${err.message}`);
      }
    }
  };

  return (
    <div className="App">
      <h1>PWR Node Status Monitor</h1>

      <div className="input-container">
        <input
          type="text"
          placeholder="Enter validator address"
          value={validatorAddress}
          onChange={(e) => setValidatorAddress(e.target.value)}
        />
        <button onClick={fetchNodeStatus}>Check Node Status</button>
      </div>

      {error && <div className="error">{error}</div>}

      {nodeStatus ? (
        <div className="node-status">
          <div className="status-card">
            <div className="but">
              <div className="close"></div>
              <div className="min"></div>
              <div className="max"></div>
            </div>
            <div className="title"></div>
            <p><strong>Validator Address:</strong> {nodeStatus.address || 'N/A'}</p>
            <p><strong>IP Address:</strong> {nodeStatus.ip || 'N/A'}</p>
            <p><strong>Status:</strong> {nodeStatus.status || 'N/A'}</p>
            <p><strong>Voting Power:</strong> {nodeStatus.votingPower ? nodeStatus.votingPower.toLocaleString() : 'N/A'}</p>
            <p><strong>Number of Delegators:</strong> {nodeStatus.delegatorsCount || 'N/A'}</p>
            <p><strong>Total Shares:</strong> {nodeStatus.totalShares ? nodeStatus.totalShares.toLocaleString() : 'N/A'}</p>
          </div>
        </div>
      ) : (
        <div className="node-status">
          <h2>Status of Node for Validator Address</h2>
          <p>Data not available</p>
        </div>
      )}
      <div >
       <div className="footer">
              <img src="/src/PWR.jpg" alt="Logo" className="logo" />
            </div>
            <div className="social-links">
              <a href="https://twitter.com/retrunvold" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-twitter social-icon"></i> 
              </a>
              <a href="https://github.com/retrunv0id" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-github social-icon"></i> 
              </a>
              <p>Creator : retrunvoid</p>
            </div>
            </div>
    </div>
  );
}

export default App;
