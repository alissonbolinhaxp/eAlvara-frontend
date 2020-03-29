import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Logon from './pages/Logon';
import Advogado from './pages/Advogado';
import Profile from './pages/Profile';
import Reclamacao from './pages/Reclamacao';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Logon} />
        <Route path="/register" component={Advogado} />
        <Route path="/profile" component={Profile} />
        <Route path="/reclamacao" component={Reclamacao} />
        <Route path="/alvara" component={Reclamacao} />
      </Switch>
    </BrowserRouter>
  );
}