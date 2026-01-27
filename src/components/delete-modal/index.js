import React from "react";
import { Modal, View, Text, Pressable } from 'react-native'
import { styles } from "./styles";
import { useTranslation } from '../../hooks'


const ComponentModal = ({ modalVisible, setModalVisible, exclude }) => {
    const { translate } = useTranslation('profile')
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
                    <Text style={styles.modalText}>{translate('confirm')}</Text>
                    <Text style={styles.messageText}></Text>
                    <Pressable
                        style={[styles.button, styles.buttonExclude]}
                        onPress={() => exclude()}>
                        <Text style={styles.textStyle}>{translate('deleteAccount')}</Text>
                    </Pressable>
                    <View style={{height: 30}}/>
                    <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => setModalVisible(!modalVisible)}>
                        <Text style={styles.textStyle}>{translate('cancel')}</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    )
}

export default ComponentModal