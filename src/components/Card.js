import React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, } from 'react-native';
import PropTypes from 'prop-types';
import { Feather } from '@expo/vector-icons';
import Colors from '../constants/Colors';

const Card = ({
  item,
  onBook,
}) => {
  const displayName = 'Dr. ' + item.first_name + ' ' + item.last_name
  const specialtiesStr = item.specialties && item.specialties.join(', ').toUpperCase()
  const reviewsStr = item.reviews.length > 1
    ? item.reviews.length + ' Reviews'
    : item.reviews.length + ' Review'
  const isShowReview = item.reviews.length > 0 && item.reviews[0].body.length > 0

  return (
    <View style={styles.item}>
      <Image style={styles.avatar} source={{uri: item.photo_url}} />
      <View style={styles.descriptionContainer}>
        <Text style={styles.name}>{displayName}</Text>
        <Text style={styles.specialties}>{specialtiesStr}</Text>
        <Text style={styles.review}>{reviewsStr}</Text>
        {isShowReview && <Text style={styles.reviewDetail}>{
          '"' + item.reviews[0].body + '"'
        }</Text>}
        <TouchableOpacity style={styles.bookBtn} onPress={onBook}>
          <Feather name="calendar" size={20} color='white' />
          <Text style={styles.bookBtnTxt}>Book Appointment</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    flex: 1,
    padding: 30,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 20,
  },
  descriptionContainer: {
    flex: 1,
    flexDirection: 'column'
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.lightBlue,
    padding: 0,
    marginBottom: 4,
  },
  specialties: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.lightBlack,
    letterSpacing: 1,
    lineHeight: 16,
    marginBottom: 4,
  },
  review: {
    fontSize: 14,
    color: Colors.lightGrey2,
    marginBottom: 15,
  },
  reviewDetail: {
    color: Colors.lightBlack,
    fontSize: 14,
  },
  bookBtn: {
    width: 200,
    flexDirection: 'row',
    borderRadius: 5,
    backgroundColor: Colors.green,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 15,
  },
  bookBtnTxt: {
    fontSize: 15,
    fontWeight: '400',
    color: Colors.white,
  }
});

Card.propTypes = {
  item: PropTypes.object.isRequired,
  onBook: PropTypes.func.isRequired,
};

export default Card;
