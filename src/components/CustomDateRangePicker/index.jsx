import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import React, {useState} from 'react';
import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import FontAwesomeIcon5 from 'react-native-vector-icons/FontAwesome5';
import {Icons, colors} from '../../Themes';
// import {useSelector} from 'react-redux';

const CustomDateRangePciker = ({
  startDate = new Date(),
  endDate = new Date(),
  setStartDate = () => {},
  setEndDate = () => {},
}) => {
  // const userData = useSelector(state => state?.login?.userDetail);
  const [isPickerShow, setIsPickerShow] = useState(false);
  const [picker, setPicker] = useState('start');

  const onChange = (event, value) => {
    if (picker === 'start') {
      setStartDate(value);
    } else {
      setEndDate(value);
    }
    if (Platform.OS === 'android') {
      setIsPickerShow(false);
    }
  };

  const handleStartDate = () => {
    setPicker('start');
    setIsPickerShow(true);
  };
  const dayInMillis = 86400000;
  const handleEndDate = () => {
    setPicker('end');

    setIsPickerShow(true);
  };

  return (
    <>
      <View style={styles.Container}>
        <View style={[styles.DateRangeTextContainer]}>
          <TouchableOpacity style={styles.TextView} onPress={handleStartDate}>
            <Text style={{color: colors.gray}}>
              {moment(startDate).format('MM/DD/YYYY')}
            </Text>
            <FontAwesomeIcon5 name="calendar" color={colors.gray} />
          </TouchableOpacity>
          <Text style={styles.to}>To</Text>
          <TouchableOpacity style={styles.TextView} onPress={handleEndDate}>
            <Text style={{color: colors.gray}}>
              {moment(endDate).format('MM/DD/YYYY')}
            </Text>
            <FontAwesomeIcon5 name="calendar" color={colors.gray} />
          </TouchableOpacity>
        </View>
      </View>
      {isPickerShow && (
        <>
          {Platform.OS !== 'android' && (
            <TouchableOpacity
              onPress={() => setIsPickerShow(false)}
              style={{alignSelf: 'flex-end'}}>
              <Icons.MaterialIcons
                name="cancel"
                size={24}
                color={colors.gray}
              />
            </TouchableOpacity>
          )}

          {picker === 'start' ? (
            <DateTimePicker
              themeVariant="light"
              value={startDate}
              mode={'date'}
              onChange={onChange}
              maximumDate={
                new Date(
                  moment(
                    endDate > Date.now() - dayInMillis
                      ? Date.now() - dayInMillis
                      : endDate - dayInMillis,
                  ),
                )
              }
              // minimumDate={new Date(moment(userData?.createdAt))}
              display={'spinner'}
            />
          ) : (
            <DateTimePicker
              themeVariant="light"
              value={endDate}
              mode={'date'}
              onChange={onChange}
              // maximumDate={new Date()}
              minimumDate={new Date(moment(startDate).valueOf() + dayInMillis)}
              display={'spinner'}
            />
          )}
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  Container: {
    width: 250,
    flexDirection: 'row',
    alignSelf: 'center',
    gap: 10,
    marginBottom: 20,
  },
  to: {color: colors.primary, fontSize: 16, fontWeight: '700'},
  DateRangeTextContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 10,
  },
  TextView: {
    width: 110,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 5,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
  },
});
export default CustomDateRangePciker;
