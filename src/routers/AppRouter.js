import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import * as pages from '../pages/index'
const AppRouter = () => {

return (
    <Router>
        <Switch>
       
        <Route path="/cart">
                <h1>Cart</h1>
        </Route>
       
       
        <Route exact path="/" component={pages.productListPage}>
                
        </Route>

        <Route path="*">
                <h1>Error 404, No encontrado</h1>
        </Route>
       
        </Switch>
 
    </Router>
)

}

export default AppRouter;