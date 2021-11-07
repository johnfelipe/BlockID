import React, { Component } from 'react';
import { Signin } from './Signin';
import { Header } from './Header';
import { ThemeProvider, theme, CSSReset, ToastProvider } from '@blockstack/ui';
import { DocumentList } from './DocumentList';
import { userSession } from '../auth';

export default class App extends Component {
  state = {
    userData: null,
  };

  handleSignOut(e) {
    e.preventDefault();
    this.setState({ userData: null });
    userSession.signUserOut(window.location.origin);
  }


  render() {
	{console.log(userSession)}
    return (
      <ThemeProvider theme={theme}>
        <ToastProvider>
          <div className="site-wrapper">
            <div className="site-wrapper-inner">
              <Header />
				{!userSession.isUserSignedIn() ? <Signin /> : <DocumentList />}
            </div>
          </div>
        </ToastProvider>
        <CSSReset />
      </ThemeProvider>
    );
  }

  componentDidMount() {
	console.log(userSession.isUserSignedIn())
    if (userSession.isSignInPending()) {
      userSession.handlePendingSignIn().then(userData => {
        window.history.replaceState({}, document.title, '/');
        this.setState({ userData: userData });
      });
    } else if (userSession.isUserSignedIn()) {
      this.setState({ userData: userSession.loadUserData() });
    }
  }
}
