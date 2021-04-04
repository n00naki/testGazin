import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Developers from './pages/developers';
import DevelopersForm from './pages/developers/Form';
import DevelopersDetail from './pages/developers/Detail';
import HomePage from './pages/Home';


const Routes: React.FC = () => {
    return (
        <Switch>
            <Route path="/" exact component={HomePage}/>
            <Route path="/developers" exact component={Developers}/>
            <Route path="/developers/create" exact component={DevelopersForm}/>
            <Route path="/developers/create/:id" exact component={DevelopersForm}/>
            <Route path="/developers/detail/:id" exact component={DevelopersDetail}/>
        </Switch>
    );
}

export default Routes;