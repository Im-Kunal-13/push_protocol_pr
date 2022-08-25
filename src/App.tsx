import { useState } from 'react';
import styled from 'styled-components';
import { Route, Routes, Link } from 'react-router-dom';
import { useWeb3React } from "@web3-react/core";
import Web3Context, { DevContext } from './context/web3Context';
import Logo from './assets/epnsLogo.png';
import ConnectButton from './components/connect';
import Checkbox from './components/checkbox';
import NotificationsPage from './pages/notifications';
import ChannelsPage from './pages/channels';
import EmbedPage from './pages/embed';

interface Web3ReactState {
  chainId?: number;
  account?: string | null | undefined;
  active: boolean;
  error?: Error;
  library?: unknown;
}


const StyledApp = styled.div`
  font-family: "Source Sans Pro",Arial,sans-serif;

  & .homeLink {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    text-decoration: none;
    &: hover {
      text-decoration: underline;
    }
  }

  & h1 {
    text-align: center;
    text-transform: uppercase;
    margin: 20px 0px;
    padding: 0px;
    letter-spacing: 0.1em;
    font-family: "Source Sans Pro", Helvetica, sans-serif;
    font-weight: 200;
    font-size: 2rem;
    line-height: 1.25em;
  }

  .nav-button {
    align-items: center;
    background-image: linear-gradient(132deg,#574762,#4a36c4 50%,#ee5555);
    border: 0;
    border-radius: 8px;
    box-shadow: rgba(151, 65, 252, 0.2) 0 15px 30px -5px;
    box-sizing: border-box;
    color: #FFFFFF;
    display: flex;
    font-family: Phantomsans, sans-serif;
    font-size: 20px;
    justify-content: center;
    line-height: 1em;
    max-width: 100%;
    min-width: 140px;
    padding: 19px 24px;
    text-decoration: none;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    white-space: nowrap;
    cursor: pointer;
  }

  .nav-button:hover {
    opacity: 0.8;
  }

  .nav-button:active,
  .nav-button:hover {
    outline: 0;
  }
`;

const LogoImg = styled.img`
  width: 40px;
  height: 40px;
`

const NavMenu = styled.div`
  display: flex;
  gap: 30px;
  justify-content: center;
`

const checkForWeb3Data = ({ library, active, account, chainId  } : Web3ReactState) => {
  return library && active && account && chainId;
}

export function App() {
  const web3Data : Web3ReactState = useWeb3React();

  const [isDevENV, setIsDevENV] = useState(false);
  const onChange = () => {
    setIsDevENV(!isDevENV);
  };

  return (
    <StyledApp>
      <Link to="/" className='homeLink'>
        <LogoImg src={Logo} />
        <h1>EPNS-SDK Starter Kit App</h1>
      </Link>

      <ConnectButton />

      <Checkbox id="devEnv" value={isDevENV} onChange={onChange} label="DEV ENV"/>

      <hr />
      <DevContext.Provider value={{ isDevENV }}>
      {checkForWeb3Data(web3Data) ? (
        <Web3Context.Provider value={web3Data}>
          <Routes>
            <Route
              path="/"
              element={
                <NavMenu>
                  <Link to="/notifications" className='nav-button'>NOTIFICATIONS</Link>
                  <Link to="/channels" className='nav-button'>CHANNELS</Link>
                  <Link to="/embed" className='nav-button'>EMBDED</Link>
                </NavMenu>
              }
            />
            <Route
              path="/notifications"
              element={<NotificationsPage />}
            />
          
        
            <Route
              path="/channels"
              element={<ChannelsPage />}
            />

            <Route
              path="/embed"
              element={<EmbedPage />}
            />
          </Routes>
        </Web3Context.Provider>
      ) : null}
      </DevContext.Provider>
    </StyledApp>
  );
}

export default App;