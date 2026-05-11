import { Stack } from "expo-router";
import React, { useState } from "react";
import {
  BackHandler,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const HamburgerMenu = () => {
  const [visible, setVisible] = useState(false);

  const handleExit = () => {
    BackHandler.exitApp();
  };

  return (
    <View>
      <TouchableOpacity
        onPress={() => setVisible(!visible)}
        style={styles.menuBtn}
      >
        <Text style={styles.menuIcon}>☰</Text>
      </TouchableOpacity>

      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={() => setVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setVisible(false)}>
          <View style={styles.overlay}>
            <TouchableWithoutFeedback>
              <View style={styles.dropdown}>
                <TouchableOpacity
                  style={styles.dropdownItem}
                  onPress={handleExit}
                >
                  <Text style={styles.dropdownText}>🚪 Exit</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

export default function TabLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "#0d538d" },
        headerTintColor: "#fff",
        headerTitleStyle: { fontWeight: "bold" },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Temperature Report",
          headerRight: () => <HamburgerMenu />,
        }}
      />
      <Stack.Screen
        name="detail"
        options={{
          title: "Detail",
        }}
      />
    </Stack>
  );
}

const styles = StyleSheet.create({
  menuBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  menuIcon: {
    color: "#fff",
    fontSize: 22,
  },
  overlay: {
    flex: 1,
    alignItems: "flex-end",
    backgroundColor: "transparent",
  },
  dropdown: {
    position: "fixed",
    right: 0,
    top: 60,
    backgroundColor: "#13436b",
    borderRadius: 8,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    minWidth: 160,
    zIndex: 1000000000,
  },
  dropdownItem: {
    padding: 14,
  },
  dropdownText: {
    fontSize: 15,
    color: "#ffffff",
  },
});
