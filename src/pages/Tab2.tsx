import { useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonFab,
  IonFabButton,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
  IonImg,
  IonActionSheet
} from '@ionic/react';
import { camera, trash, close } from 'ionicons/icons';

import './Tab2.css';
import { usePhotoGallery } from '../hooks/usePhotoGallery';
import { UserPhoto } from '../interfaces/UserPhoto.interface';

const Tab2: React.FC = () => {
  const [photoToDelete, setPhotoToDelete] = useState<UserPhoto>();
  const { takePhoto, photos, deletePhoto } = usePhotoGallery();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Photo Gallery</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>

        <IonGrid>
          <IonRow>
            {
              photos.map((photo, index) => (
                <IonCol size='6' key={index}>
                  <IonImg onClick={() => setPhotoToDelete(photo)} src={photo.webviewPath} />
                </IonCol>
              ))
            }
          </IonRow>
        </IonGrid>


        <IonFab vertical='bottom' horizontal='center' slot='fixed'>
          <IonFabButton onClick={takePhoto}>
            <IonIcon icon={camera}></IonIcon>
          </IonFabButton>
        </IonFab>

        <IonActionSheet
          isOpen={!!photoToDelete}
          buttons={[
            {
              text: 'Delete',
              role: 'destructive',
              icon: trash,
              handler: () => {
                if (photoToDelete) {
                  deletePhoto(photoToDelete);
                  setPhotoToDelete(undefined);
                }
              }
            },
            {
              text: 'cancel',
              icon: close,
              role: 'cancel'
            }
          ]}
          onDidDismiss={() => setPhotoToDelete(undefined)}
        />

      </IonContent>
    </IonPage>
  );
};

export default Tab2;
