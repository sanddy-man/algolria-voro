import React from 'react';
import PropTypes from 'prop-types';
import MapView, { Marker } from 'react-native-maps';
import { connectInfiniteHits } from 'react-instantsearch-native';

const Map = ({
  hits,
}) => (
  <MapView
    style={{flex: 1}}
    region={hits[0] && {
      ...hits[0].location,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }}
  >
    {hits.map(item => <Marker
      key={item.objectID}
      coordinate={item.location}
    />)}
  </MapView>
);

Map.propTypes = {
  hits: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connectInfiniteHits(Map);
