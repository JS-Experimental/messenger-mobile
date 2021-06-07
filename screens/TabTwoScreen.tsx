import * as React from 'react';
import { FlatList, Image, ScrollView, StyleSheet, TextInput } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { ChatService } from '@metall/common1';

export default function TabTwoScreen() {
  const sendMessage = ChatService().useSendMessage();

  let messageText = '';

  const onChangeNumber = (text: string) => {
    console.log(text);
    messageText = text;
  }

  const {data, status, error} = ChatService().useMessages('2');

  console.log(data, error);

  if(status === 'loading') {
    return <Text>Loading...</Text>
  }

  const renderItem = ({ item }: any) => (
      <View style={[styles.item, item.sender  === 'me' ? styles.itemRowRevers : styles.itemRow]}>
          <View style={[styles.imageBox, item.sender === 'me' ? styles.imgLeftMargin : styles.imgRightMargin]}>
              <Image source={{uri: item.senderImage}} style={styles.messageImage}/>
          </View>
        <View style={styles.textBox}>
            <View style={styles.textBoxIn}>
                <Text style={styles.messageText}>{item.messageText}</Text>
            </View>
        </View>
      </View>
  );

  return (
    <>
      <FlatList style={styles.messageList} data={data.messages} renderItem={renderItem} keyExtractor={item => item.id}/>
      <TextInput
          style={styles.input}
          onChangeText={onChangeNumber}
          placeholder="useless placeholder"
          onSubmitEditing={() => {
            console.log({messageText});
            sendMessage.mutate(messageText)
          }}
      />
    </>
  );
}

const styles = StyleSheet.create({
    messageList: {
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: "#ffffff"
    },
  container: {},
    itemRow: {
      flexDirection: 'row'
    },
    itemRowRevers: {
      flexDirection: 'row-reverse'
    },
  item: {
      flex: 1,
      padding: 5,
  },
    imgRightMargin: {
        marginRight: 16,
    },
    imgLeftMargin: {
      marginLeft: 16
    },
    textBox: {
        // paddingTop: 8,
        // paddingBottom: 8,
        // paddingLeft: 24,
        // paddingRight: 24,
      // flex: 1
    },
    textBoxIn: {
        backgroundColor: "#f5f5f5",
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 4,
        shadowColor: "#00000033",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
    },
    imageBox: {
      width: 70,
        height: 70,
      // flex: 1,
      //   right: 0
    },
  messageText: {
      color: "#000000de"
  },
  messageImage: {
      width: "100%",
      height: "100%",
      right: 0,
      borderRadius: 100
  },
  input: {
        borderWidth: 1,
      borderStyle: 'solid',
      borderColor: '#0000003b',
      borderRadius: 5,
      marginTop: 10,
      marginRight: 10,
      marginLeft: 10,
      marginBottom: 10,
      padding: 10,
      paddingLeft: 20,
      paddingRight: 20
  }
});

