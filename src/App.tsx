import React, { Component } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, IonSplitPane, IonPage } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

/*Non-Default Imports*/
import LifeCounterNewGame from './pages/LifeCounter/DisplayComponent/SetupPages/LifeCounterNewGame';
import LifeCounterPlayerNumber from './pages/LifeCounter/DisplayComponent/SetupPages/LifeCounterSetPlayers';
import LifeCounterSetLife from './pages/LifeCounter/DisplayComponent/SetupPages/LifeCounterSetLife';
import LifeCounterConfirm from './pages/LifeCounter/DisplayComponent/SetupPages/LifeCounterConfirm';
import LifeCounter from './pages/LifeCounter/DisplayComponent/LifeCounter';
import SideBar from './components/SideBar/SideBar'; 
import DataManager, { DatabaseLoad } from './dataManagers/DataManager'; 
import ScryFall from './dataManagers/ScryFall/ScryFall';
import ResultsDisplay from './pages/ResultsDisplay/DisplayStateManager/ResultsDisplay';
import SearchResults from './pages/SearchResults/SearchResults';
import Dice from './pages/Dice/DisplayStateManager/Dice';
import SetEVs from './pages/SetEVs/SetEVs';
import Rules from './pages/Rules/Rules';
import TradeCards from './pages/TradeCards/TradeCards';
import Settings from './pages/Settings/DisplayStateManager/Settings';
import Help from './pages/Help/DisplayComponent/Help';
import AdvancedSearch from './pages/AdvancedSearch/DisplayComponent/AdvancedSearch';
import SearchHistory from './pages/SearchHistory/DisplayStateManager/SearchHistory';
import QuickSearchRequireDownload from './pages/QuickSearch/DisplayComponent/QuickSearchRequireDownload';
import QuickSearchDownloaded from './pages/QuickSearch/DisplayComponent/QuickSearchDownloaded';

export interface DatabaseState {
  database : DataManager;
  loaded : DatabaseLoad; 
}

class App extends Component {

  ////////////////////////
  /*Fields*/
  ////////////////////////

  static dataManager : DataManager;
  
  ////////////////////////
  /*Constructor*/
  ////////////////////////

  constructor(props : any) {
    super(props);

    App.dataManager = new ScryFall(null); //null param is for "props" requirement
  }

  ////////////////////////
  /*Render*/
  ////////////////////////
  
  render() {

    return (
      <IonReactRouter>
        <IonApp>
          <IonSplitPane contentId="main"> {/* Adds/Allows the SideBar Functionality */}
            <SideBar/>  {/* The Acutal Sidebar */}
            <IonPage id="main"> {/* ID reference allowing for Sidebar Functionality */}         
                <IonRouterOutlet>

                  {/*Calvin's Pages*/}
                  <Route path="/quick-search" component={
                    (App.dataManager.loaded === DatabaseLoad.NOT_LOADED) 
                    ? QuickSearchRequireDownload 
                    : QuickSearchDownloaded} 
                    exact={true} />
                  <Route path="/advanced-search" component={AdvancedSearch} exact={true}/>
                  <Route path="/search-results" component={SearchResults} exact={true}/>
                  <Route path="/results-display" component={ResultsDisplay} exact={true}/>
                  <Route path="/search-history" component={SearchHistory} exact={true}/>

                  {/*Matt's Pages*/}
                  <Route path="/life-counter/new-game" component={LifeCounterNewGame} exact={true} />
                  <Route path="/life-counter/set-players" component={LifeCounterPlayerNumber} exact={true}/>
                  <Route path="/life-counter/set-life" component={LifeCounterSetLife} exact={true}/>
                  <Route path="/life-counter/confirm" component={LifeCounterConfirm} exact={true}/>
                  <Route path="/life-counter/game" component={LifeCounter} exact={true}/>
                  <Route path="/settings" component={Settings} exact={true}/>
                  <Route path="/help" component={Help} exact={true}/>

                  {/*Both of Our Pages*/}
                  <Route path="/dice" component={Dice} exact={true}/>

                  {/*Filler Pages*/}
                  <Route path="/trade-cards" component={TradeCards} exact={true}/>
                  <Route path="/rules/overview" component={Rules} exact={true}/>
                  <Route path="/set-ev/overview" component={SetEVs} exact={true}/>
                  
                  {/*Blank Reroute*/}
                  <Route path="/" render={() => <Redirect to="/quick-search" />} exact={true} />                           
                
                </IonRouterOutlet>
            </IonPage>
          </IonSplitPane>
        </IonApp>
      </IonReactRouter>
    );
  }
}

export default App;
