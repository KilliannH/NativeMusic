import React, {useState, useEffect} from 'react';
import {View, Text, Image, Button, StyleSheet, ActivityIndicator} from 'react-native';
import * as dataService from '../services/DataService';
import utils from '../constants/utils';
import TrackPlayer from 'react-native-track-player';
import {useTrackPlayerProgress} from 'react-native-track-player/lib/hooks';
import Slider from '@react-native-community/slider';
import config from '../config';

const stream_url = `${config.API_PROTOCOL}://${config.API_HOST}/stream/`;

const PlayerScreen = ({route}) => {

  const [isTrackPlayerInit, setIsTrackPlayerInit] = useState(false);

  const [isPlaying, setIsPlaying] = useState(false);

  const [song, setSong] = useState({});

//the value of the slider should be between 0 and 1
  const [sliderValue, setSliderValue] = useState(0);

  //flag to check whether the use is sliding the seekbar or not
  const [isSeeking, setIsSeeking] = useState(false);

  //useTrackPlayerProgress is a hook which provides the current position and duration of the track player.
  //These values will update every 250ms
  const {position, duration} = useTrackPlayerProgress(250);

  const trackPlayerInit = async (mySong) => {
    await TrackPlayer.setupPlayer();
    await TrackPlayer.add({
          headers: {'Authorization': config.API_SECRET},
          id: mySong.id.toString(),
          url: stream_url + mySong.filename,
          type: 'default',
          title: mySong.title,
          album: mySong.albums[0].title,
          artist: utils.concatArtists(mySong),
          artwork: mySong.albums[0].imageUrl,
    });
    return true;
  };

  const afterInit = async () => {
    await TrackPlayer.play();
    setIsPlaying(true);
  };

  useEffect(() => {
    const startPlayer = async () => {
      const { itemId } = route.params;
      const s = await dataService.getSong(itemId);
      setSong(s);
      let isInit = await trackPlayerInit(song);
      setIsTrackPlayerInit(isInit);
      await afterInit();
    };
    startPlayer();
  }, []);

  //this hook updates the value of the slider whenever the current position of the song changes
  useEffect(() => {
    if (!isSeeking && position && duration) {
      setSliderValue(position / duration);
    }
  }, [position, duration]);

  //this function is called when the user starts to slide the seekbar
  const slidingStarted = () => {
    setIsSeeking(true);
  };

  //this function is called when the user stops sliding the seekbar
  const slidingCompleted = (value) => {
    TrackPlayer.seekTo(value * duration).then(() => {
      setSliderValue(value);
      setIsSeeking(false);
    });
  };

  const onButtonPressed = async () => {
    if (!isPlaying) {
      await TrackPlayer.play();
      setIsPlaying(true);
    } else {
      await TrackPlayer.pause();
      setIsPlaying(false);
    }
  };

  if (isTrackPlayerInit) {
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Text style={styles.songTitle}>{song.title}</Text>
        <Text style={styles.songArtists}>{utils.concatArtists(song)}</Text>
        <Image source={{uri: song.albums[0].imageUrl}} style={styles.albumImage} />
        <Text style={styles.position}>{Math.round(position).toString()}</Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={1}
          value={sliderValue}
          minimumTrackTintColor="#111000"
          maximumTrackTintColor="#000000"
          onSlidingStart={slidingStarted}
          onSlidingComplete={slidingCompleted}
        />
        <Button
          title={isPlaying ? 'Pause' : 'Play'}
          onPress={onButtonPressed}
        />
      </View>
    );
  } else {
    return <ActivityIndicator />;
  }
};

const styles = StyleSheet.create({
  songTitle: {
    fontSize: 28,
    fontWeight: 'normal',
  },
  songArtists: {
    marginBottom: 18,
    fontSize: 20,
    fontWeight: 'normal',
  },
  position: {
    fontSize: 14
  },
  slider: {
    width: 400,
    height: 60
  },
  itemHeader: {
    fontSize: 15,
  },
  albumImage: {
    backgroundColor: 'transparent',
    height: 300,
    width: 300
  }
});

export default PlayerScreen;
