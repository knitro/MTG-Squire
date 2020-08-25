import React, { useState } from 'react';
import { IonLoading, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonText, IonAlert, IonImg } from '@ionic/react';
import uuid from 'uuid';
import { SearchState } from '../../../states/SearchState';
import App from '../../../App';
import { useHistory } from 'react-router';

interface SingleSearchResult {
  currentSearchState : SearchState
}

const SingleSearchResult = (props : SingleSearchResult) => {

  /*Variable Initialisation*/
  let search : SearchState = props.currentSearchState;
  const history = useHistory();

  /*Hook Initialisation*/
  const [showLoading, setShowLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  /*Return*/
  return (
    
    <>
      {/*IonLoading Initialisation*/}
      <IonLoading
        cssClass=''
        isOpen={showLoading}
        onDidDismiss={() => setShowLoading(false)}
        message={'Getting Card Information'}
        duration={10000}
      />
      
      <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          cssClass='failed'
          header={'Error'}
          subHeader={'Failed to Get Card Information'}
          message={'Please check your internet connection and re-perform the search.'}
          buttons={['Dismiss']}
        />

      {/*IonCard Initialisation*/}
      <IonCard button={true} key={uuid.v4()}
        onClick={e => {
          setShowLoading(true)
          App.databases[0].database.performSearchURL(search.api_uri, true).then(async (didPerform) => {
            if (didPerform) {
              setShowLoading(false);
              history.push("/results-display");
            } else {
              setShowLoading(false);
              setShowAlert(true);
            }    
          });
        }}
      >
        <IonCardHeader>
          <IonCardSubtitle> {search.fullType}</IonCardSubtitle>
          <IonCardTitle>{search.cardName}</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          <IonImg src={search.imageLink} class="cardImage" data-src={search.imageLink}/>
          <IonText>{"Release Date: "}{search.misc.released}</IonText>
        </IonCardContent>
      </IonCard>

    
    </>
  );
}

export default SingleSearchResult;

