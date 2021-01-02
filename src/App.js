import React, { Component } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';

//import Navbar from './component/Layouts/Navbar';
//import Head from './component/Layouts/Head';
import Foot from './component/Layouts/Foot';
import About from './component/About';
import Home from './component/Home';
import Show from './component/Show';
import Page from './component/Page';
/*cms*/
import CmsPostsIndex from './component/Cms/Posts/Index';
import CmsPostsCreate from './component/Cms/Posts/Create';
import CmsPostsShow from './component/Cms/Posts/Show';
import CmsPostsEdit from './component/Cms/Posts/Edit';

/*cms_pages */
import CmsHome from './component/Cms/Home';
import CmsPagesIndex from './component/Cms/Pages/Index';
import CmsPagesCreate from './component/Cms/Pages/Create';
import CmsPagesShow from './component/Cms/Pages/Show';
import CmsPagesEdit from './component/Cms/Pages/Edit';

/*cms_category */
import CmsCategoryIndex from './component/Cms/Category/Index';
import CmsCategoryCreate from './component/Cms/Category/Create';
import CmsCategoryEdit from './component/Cms/Category/Edit';

import './css/main.css';
import './css/theme.css';
import './css/type5.css';
//
class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Route exact path='/' component={Home}/>
            <Route path="/show/:id" component={Show} />
            <Route path="/pages/:id" component={Page} />            
            <Route path='/about' component={About}/>
            <Route path='/cms' component={CmsHome}/>
            <Route path='/cms_posts' component={CmsPostsIndex}/>
            <Route path='/cms_posts_create' component={CmsPostsCreate}/>
            <Route path='/cms_posts_show/:id' component={CmsPostsShow}/>
            <Route path='/cms_posts_edit/:id' component={CmsPostsEdit}/>
            <Route path='/cms_pages' component={CmsPagesIndex}/>
            <Route path='/cms_pages_create' component={CmsPagesCreate}/>
            <Route path='/cms_pages_show/:id' component={CmsPagesShow}/>
            <Route path='/cms_pages_edit/:id' component={CmsPagesEdit}/>
            <Route path='/cms_category' component={CmsCategoryIndex}/>
            <Route path='/cms_category_create' component={CmsCategoryCreate}/>
            <Route path='/cms_category_edit/:id' component={CmsCategoryEdit}/>            
            <Foot />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
