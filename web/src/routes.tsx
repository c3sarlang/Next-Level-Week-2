import React from 'react'
import {BrowserRouter, Route} from 'react-router-dom';
import Landing from './pages/Landing';
import TeacherList from './pages/TeacherList';
import TeacherForm from './pages/TeacherForm/indes';

function Routes(){
    return(
        <BrowserRouter>
             <Route path="/" exact component={Landing}/> {/*passando o endereço para navegaçao */}
            <Route path="/study" component={TeacherList}/>
            <Route path="/give-classes" component={TeacherForm}/>
        </BrowserRouter>
    )
}

export default Routes;