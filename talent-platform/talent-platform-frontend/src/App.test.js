import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import TalentRegistration from './pages/TalentRegistration';
import TalentApproval from './pages/admin/TalentApproval';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/register" component={TalentRegistration} />
        <Route path="/admin/talents" component={TalentApproval} />
        {/* Add more routes as needed */}
      </Switch>
    </Router>
  );
}

export default App;