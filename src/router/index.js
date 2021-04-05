import { Redirect, Switch, Route } from 'react-router-dom';
import { MainContextProvider } from '../context/mainContext';
import { OperationGrid } from '../pages/_home';
import { OperationQuest } from '../pages/_questions';

const Root = () => {
    return (
        <MainContextProvider>
            <Switch>
                <Route path="/home" component={OperationGrid} />
                <Route path="/question/:questionId" component={OperationQuest} />
                <Redirect from="/" to="/home" />
            </Switch>
        </MainContextProvider>
    )
}

export default Root;