import * as React from "react";
import { Text, View } from "react-native";
import { RippleEffect } from '../../../common/components/RippleEffect';
import { theme } from "../../../common/constants";
export default function MyTabBar({ state, descriptors, navigation, position }) {
    return (
      <View style={{ flexDirection: "row", paddingTop: 20 }}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;
  
          const isFocused = state.index === index;
  
          const onPress = () => {
            // alert(route.name)
            const event = navigation.emit({
              type: "tabPress",
              target: route.key
            });
  
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };
  
          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key
            });
          };
          // modify inputRange for custom behavior
          const inputRange = state.routes.map((_, i) => i);
          return (
            <RippleEffect
              accessibilityRole="button"
              accessibilityStates={isFocused ? ["selected"] : []}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              // onLongPress={onLongPress}
              style={{
                flex: 1,
                borderTopRightRadius: 10,
                borderTopLeftRadius: 10,
                // borderTopWidth: isFocused? 1:0,
                borderRightWidth:isFocused ?2:1,
                borderLeftWidth:isFocused ?2:1,
                borderColor:isFocused ? theme.colors.primary : "white",
                padding:10,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: !isFocused ? theme.colors.primary : "white"
              }}
            >
              <Text>{label}</Text>
            </RippleEffect>
          );
        })}
      </View>
    );
  }