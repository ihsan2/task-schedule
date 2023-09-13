import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  FlatList,
} from 'react-native';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {deleteTask, fetchTask} from '../store/TasksActions';
import moment from 'moment';
import {useIsFocused} from '@react-navigation/native';
import { onCreateTriggerNotification } from '../services/notifee';

const Home = ({navigation}) => {
  const focus = useIsFocused();
  const data = useSelector(state => state.tasks.taskArray);
  const dispatch = useDispatch();

  // fetch task
  useEffect(() => {
    dispatch(fetchTask());
  }, [focus]);

  const handleDeleteTask = id => {
    dispatch(deleteTask(id));
  };

  const toEditForm = item => {
    onCreateTriggerNotification({})
    navigation.navigate('Form', {
      item,
      isEdit: 1,
    });
  };

  const _renderItem = ({item, index}) => {
    return (
      <View style={styles.card}>
        <View style={styles.leftCard}>
          <Text style={styles.textName}>{item?.name}</Text>
          <Text style={styles.textDate}>
            {moment(item?.date.toDate()).format('DD MMMM YYYY, HH:mm:ss')}
          </Text>
        </View>
        <View style={styles.rightCard}>
          <TouchableOpacity onPress={() => toEditForm(item)}>
            <Text style={styles.textEdit}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleDeleteTask(item?.id)}>
            <Text style={styles.textDelete}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const _renderEmpty = () => {
    return (
      <View style={styles.empty}>
        <Text style={styles.textEmpty}>
          There are no task yet, please add your task.
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.buttonAdd}
        onPress={() => navigation.navigate('Form')}>
        <Text style={styles.textAdd}>Add Task</Text>
      </TouchableOpacity>
      <View style={styles.gap} />
      <FlatList
        keyExtractor={item => item.id}
        data={data}
        renderItem={_renderItem}
        ListEmptyComponent={_renderEmpty}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  buttonAdd: {
    height: 48,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2ABFCC',
    margin: 20,
  },
  textAdd: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#FFF',
  },
  gap: {
    height: 1,
    width: '100%',
    backgroundColor: 'rgba(56, 56, 56, 0.1)',
    marginBottom: 20,
  },
  card: {
    marginHorizontal: 20,
    borderWidth: 1.5,
    borderColor: 'rgba(56, 56, 56, 0.1)',
    padding: 16,
    borderRadius: 8,
    marginBottom: 10,
  },
  leftCard: {
    flex: 1,
  },
  rightCard: {
    flexDirection: 'row',
    marginTop: 10,
  },
  textName: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 4,
  },
  textDate: {
    marginBottom: 4,
    color: 'rgba(56, 56, 56, 0.6)',
  },
  textEdit: {
    color: '#2ABFCC',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
  },
  textDelete: {
    color: '#EC088C',
    fontSize: 18,
    fontWeight: 'bold',
  },
  textEmpty: {
    color: 'rgba(56, 56, 56, 0.4)',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default Home;
