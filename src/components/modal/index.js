import React from "react";
import { Modal, View, Text, Pressable } from 'react-native'
import { styles } from "./styles";


const ComponentModal = ({ modalVisible, setModalVisible, message={message: '', title: ''}, textButton='Ok' }) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>{message.title}</Text>
                    <Text style={styles.messageText}>{message.message}</Text>
                    <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => setModalVisible(!modalVisible)}>
                        <Text style={styles.textStyle}>{textButton}</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    )
}

export default ComponentModal