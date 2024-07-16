import React, { useState } from 'react';
import { ActivityIndicator, Button, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CustomHeading from '../CustomHeading';
import { colors } from '../../Themes';

const CustomModal = ({ title, setModalVisible, modalVisible, handleClick, loader = true }) => {
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
                    <CustomHeading
                        text={title}
                        headingStyle={styles.heading}
                    />
                    <View style={styles.btnContainer}>

                        {/* {loader ? <ActivityIndicator size={25} style={{ alignSelf: "center", alignSelf: "center" }} /> :
                            <TouchableOpacity style={{ ...styles.btnContainer, backgroundColor: loader ? colors.gray_font : colors.primary, justifyContent: "center" }} onPress={loader ? () => { } : handleClick}>
                                <Text style={{ ...styles.btnStyle, backgroundColor: loader ? colors.gray_font : colors.primary }}>
                                    Yes
                                </Text>
                            </TouchableOpacity>
                        } */}
                        {/* <ActivityIndicator size={25} style={{ alignSelf: "center", alignSelf: "center" }} /> */}

                        <TouchableOpacity style={styles.btnContainer} onPress={loader ? () => { } : handleClick}>
                            {loader ? <ActivityIndicator size={25} style={{ alignSelf: "center", alignSelf: "center" }} /> :
                                <Text style={{ ...styles.btnStyle, backgroundColor: loader ? colors.gray_font : colors.primary }}>
                                    Yes
                                </Text>}
                        </TouchableOpacity>
                        {/* {loader ? <TouchableOpacity style={styles.btnContainer} onPress={loader ? () => { } : handleClick}>
                            <Text style={{ ...styles.btnStyle, backgroundColor: loader ? colors.gray_font : colors.primary }}>
                                Yes
                            </Text>
                        </TouchableOpacity> :
                            <TouchableOpacity style={styles.btnContainer} onPress={loader ? () => { } : handleClick}>
                                <Text style={{ ...styles.btnStyle, backgroundColor: loader ? colors.gray_font : colors.primary }}>
                                    Yes
                                </Text>
                            </TouchableOpacity>} */}
                        <TouchableOpacity style={styles.btnContainer} onPress={loader ? () => { } : () => setModalVisible(false)}>
                            <Text style={{ ...styles.btnStyle, backgroundColor: loader ? colors.gray_font : colors.primary }}>
                                No
                            </Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </View>
        </Modal >
    );
};
export default CustomModal;
const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        gap: 20,
        position: 'relative',
    },
    heading: { fontSize: 20, textAlign: 'center' },
    btnContainer: {
        flexDirection: 'row',
        gap: 10,
        // minWidth: 80,
        width: "50%"
    },
    btnStyle: {
        padding: 10, width: "80%",
        backgroundColor: colors.primary,
        color: "white", borderRadius: 5,
        textAlign: "center", fontSize: 17,
    },
});