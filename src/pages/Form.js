import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
import DatePicker from 'react-native-date-picker';
import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';
import {addTasks, updateTask} from '../store/TasksActions';

const Form = ({navigation, route}) => {
  const isEdit = route.params?.isEdit;
  const item = route.params?.item;
  const data = useSelector(state => state.tasks.taskArray);
  const dispatch = useDispatch();

  const [date, setDate] = useState(
    isEdit ? moment(item?.date.toDate()).format('YYYY-MM-DDTHH:mm:ss') : '',
  );
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(isEdit ? item?.name : '');

  useEffect(() => {
    navigation.setOptions({title: !isEdit ? 'Add Task' : 'Edit Task'});
  }, [navigation]);

  const handleSave = () => {
    let id = uuid.v4();
    let obj = {
      id: isEdit ? item?.id : id,
      name,
      date: firestore.Timestamp.fromDate(new Date(date)),
    };
    if (isEdit) dispatch(updateTask(obj));
    else dispatch(addTasks(obj));
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Task Name</Text>
        <TextInput
          placeholder="Input Task Name"
          style={styles.input}
          value={name}
          onChangeText={x => setName(x)}
        />
      </View>
      <View>
        <Text style={styles.label}>Select Date & Time</Text>
        <TouchableOpacity style={styles.input} onPress={() => setOpen(true)}>
          <Text>
            {date
              ? moment(date).format('DD MMMM YYYY, HH:mm:ss')
              : 'Select Date & Time'}{' '}
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        disabled={!name || !date}
        style={!name || !date ? styles.buttonSaveDisabled : styles.buttonSave}
        onPress={handleSave}>
        <Text style={styles.textSave}>Save</Text>
      </TouchableOpacity>

      <DatePicker
        minimumDate={new Date(moment().add(10, 'minutes'))}
        modal
        open={open}
        date={date ? new Date(date) : new Date()}
        onConfirm={date => {
          setOpen(false);
          setDate(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 20,
  },
  label: {
    color: 'rgba(56, 56, 56, 0.6)',
    marginBottom: 8,
  },
  input: {
    height: 48,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(56, 56, 56, 0.4)',
    padding: 16,
  },
  inputContainer: {
    marginBottom: 20,
  },
  buttonSave: {
    height: 48,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2ABFCC',
    marginTop: 20,
  },
  buttonSaveDisabled: {
    height: 48,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#AAA',
    marginTop: 20,
  },
  textSave: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#FFF',
  },
});

export default Form;
