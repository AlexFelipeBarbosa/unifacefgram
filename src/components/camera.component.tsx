import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {RNCamera, TakePictureOptions} from 'react-native-camera';

interface Props {
  onTakeCamera: (uri: string) => void;
  status: boolean;
}

export class Camera extends Component<Props> {
  render() {
    const PendingView = () => (
      <View>
        <Text>Carregando..</Text>
      </View>
    );

    const {status} = this.props;

    return (
      <View>
        {status && (
          <View>
            <RNCamera
              captureAudio={false}
              type={RNCamera.Constants.Type.back}
              androidCameraPermissionOptions={{
                title: 'Permissão para usar camera',
                message: 'Precisamos da sua persmissão para fotografar',
                buttonPositive: 'OK!',
                buttonNegative: 'Cancel',
              }}>
              {({camera, status, recordAudioPermissionStatus}) => {
                if (status !== 'READY') return <PendingView />;
                return (
                  <View>
                    <TouchableOpacity>
                      <Text>Fotografar</Text>
                    </TouchableOpacity>
                  </View>
                );
              }}
            </RNCamera>
          </View>
        )}
      </View>
    );
  }

  takePicture = async (camera: RNCamera) => {
    const {onTakeCamera} = this.props;

    const options: TakePictureOptions = {
      quality: 0.5,
      base64: true,
    };
    try {
      const data = await camera.takePictureAsync(options);
      onTakeCamera(data.uri);
    } catch (error) {
      console.error(error);
    }
  };
}

const styles = StyleSheet.create({
  card: {
    padding: 1,
    margin: 4,
    backgroundColor: 'black',
  },
});
