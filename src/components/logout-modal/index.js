import React from "react";
import { Modal, View, Text, Pressable } from 'react-native'
import { styles } from "./styles";
import { useTranslation } from '../../hooks'


const ComponentModal = ({ modalVisible, setModalVisible, Yes, No }) => {
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
                    <Text style={styles.modalText}>{translate('logout')}</Text>
                    <Text style={styles.messageText}>{translate('description')}</Text>
                    <Pressable
                        style={[styles.button, styles.buttonExclude]}
                        onPress={() => Yes()}>
                        <Text style={styles.textStyle}>{translate('yes')}</Text>
                    </Pressable>
                    <View style={{height: 30}}/>
                    <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => No()}>
                        <Text style={styles.textStyle}>{translate('no')}</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    )
}

export default ComponentModal