import React from 'react';
import { IonContent, IonPage, IonTitle, IonButton, IonGrid, IonLabel, IonRow, IonCol } from '@ionic/react';
import './LifeCounterSetup.css';
import FooterTabs from '../../../../components/FooterTabs/FooterTabs';
import Header from '../../../../components/Header/Header';
import { GameContextConsumer, Game, GameContextProvider } from '../../../../states/LifeCounterSetupState';
import { createPlayers, PlayersContextProvider } from '../../../../states/LifeCounterPlayerState';


const LifeCounterConfirm: React.FC = () => {
  return (

    <IonPage>
      <GameContextProvider><PlayersContextProvider>
      {/* Displays the Header */}
      <Header headerLabel="Life Counter - New Game"/>

      <IonContent>
      
      {/* Sub Header of setup pages */}
      <IonRow>
          <IonCol>
            <IonButton class="lifeNavigationButtons" color="light" expand="full" href="/life-counter/set-players">
              Number of<br/> Players
            </IonButton>
          </IonCol>
          <IonCol>
            <IonButton class="lifeNavigationButtons" color="light" expand="full" href="/life-counter/set-life">
              Life Totals
            </IonButton>
          </IonCol>
          <IonCol>
            <IonButton class="lifeNavigationButtons" color="secondary" expand="full">
              Confirm
            </IonButton>
          </IonCol>
        </IonRow>

        <IonTitle class="lifeTitle">
          Confirm Options
        </IonTitle>


        {/* Display of setup information */}
        <GameContextConsumer>
          {(context : Game) => (
        <IonGrid class="confirmGrid">
        <IonLabel class="lifeText">
          Number of players: {context.numberPlayers}<div/>
          Starting life: {context.lifeTotal}
        </IonLabel>
        <IonButton class="lifeStartButton" href="/life-counter/game" color="tertiary"
            onClick={e => {
              createPlayers(context);
            }}>
            Start <br/>Game
          </IonButton>
          </IonGrid>
        )}
        </GameContextConsumer>
        
      </IonContent>

      {/* Displays Tabs at the Bottom */}
      <FooterTabs/>
      </PlayersContextProvider></GameContextProvider>
    </IonPage>
  );
};

export default LifeCounterConfirm;
