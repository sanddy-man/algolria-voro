import React from 'react';
import { StyleSheet, View, SafeAreaView, StatusBar, Dimensions } from 'react-native';
import algoliasearch from 'algoliasearch/reactnative';
import { InstantSearch } from 'react-instantsearch-native';
import SearchBox from './src/components/SearchBox';
import InfiniteHits from './src/components/InfiniteHits';
import { TabView, SceneMap } from 'react-native-tab-view';
import Map from './src/components/Map';
import Colors from './src/constants/Colors';
import Config from './src/constants/Config';

const searchClient = algoliasearch(
  Config.ALGOLIA_APP_ID,
  Config.ALGOLIA_API_KEY
);

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.statusBar,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});

const ListRoute = () => (
  <InfiniteHits />
);

const MapRoute = () => (
  <Map />
);

class App extends React.Component {
  root = {
    Root: View,
    props: {
      style: {
        flex: 1,
      },
    },
  };

  state = {
    index: 0,
    routes: [
      { key: 'list', title: 'List' },
      { key: 'map', title: 'Map' },
    ],
  }

  render() {
    return (
      <SafeAreaView style={styles.safe}>
        <StatusBar barStyle="light-content" />
        <View style={styles.container}>
          <InstantSearch
            searchClient={searchClient}
            indexName={Config.INDEX_NAME}
            root={this.root}
          >
            <SearchBox />
            <TabView
              navigationState={this.state}
              renderScene={SceneMap({
                list: ListRoute,
                map: MapRoute,
              })}
              onIndexChange={index => this.setState({ index })}
              initialLayout={{ width: Dimensions.get('window').width }}
              swipeEnabled={false}
            />
          </InstantSearch>
        </View>
      </SafeAreaView>
    );
  }
}

export default App;
