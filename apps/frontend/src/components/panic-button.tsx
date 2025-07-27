import { FontAwesome } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import Octicons from "@expo/vector-icons/Octicons";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { Portal } from "@gorhom/portal";
import { BlurView } from "expo-blur";
import { doc, updateDoc } from "@react-native-firebase/firestore";
import React, { useRef } from "react";
import { Platform } from "react-native";
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
} from "react-native-vision-camera";

import { Button, Text, View } from "@/components/ui";
import { colors } from "@/constants/colors";
import { useAuthContext } from "@/hooks/use-auth-context";
import { db } from "@/lib/firebase";

export const PanicButton = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const { user } = useAuthContext();
  const { hasPermission, requestPermission } = useCameraPermission();
  const cameraDevice = useCameraDevice("front");

  const onClickPanicButton = async () => {
    await requestPermission();
    bottomSheetRef.current?.expand();
  };

  const onPressRelapse = async () => {
    if (!user) return;
    await updateDoc(doc(db, "users", user.uid), {
      "streak.start": Date.now(),
    });
    bottomSheetRef.current?.close();
  };
  return (
    <>
      <Button
        iconL={
          <FontAwesome
            name="exclamation-triangle"
            size={20}
            color="white"
            className="mt-1"
          />
        }
        text="Panic Button"
        variant="danger"
        onPress={onClickPanicButton}
      />
      <Portal name="bottom-sheet">
        <BottomSheet
          index={-1}
          ref={bottomSheetRef}
          //   onChange={handleSheetChanges}
          snapPoints={["90%"]}
          enablePanDownToClose
          enableHandlePanningGesture
          enableContentPanningGesture
          enableOverDrag
          backgroundStyle={{ backgroundColor: colors.dangerBackground }}
          handleIndicatorStyle={{ backgroundColor: colors.foreground }}
        >
          <BottomSheetView
            style={{
              height: "100%",
              paddingBottom: Platform.OS === "android" ? 50 : 0,
            }}
          >
            <View className="flex flex-col gap-4 p-4 pt-2 h-full justify-between overflow-hidden">
              <View className="flex flex-col gap-4 overflow-y-auto">
                <Text variant="h2" className="text-danger text-center">
                  Panic Button
                </Text>
                {hasPermission && cameraDevice !== undefined && (
                  <>
                    <View className="rounded-2xl overflow-hidden h-[500px]">
                      <Camera
                        style={{
                          width: "100%",
                          height: "100%",
                        }}
                        device={cameraDevice}
                        isActive={true}
                      />
                      <BlurView className="absolute bottom-0 left-0 right-0 p-4">
                        <Text variant="h1" className="text-center px-4">
                          Don't let this slip define you.
                        </Text>
                      </BlurView>
                    </View>
                  </>
                )}
              </View>
              <View className="flex flex-col gap-2">
                <Button
                  iconL={
                    <Octicons
                      name="thumbsdown"
                      size={18}
                      color={colors.danger}
                    />
                  }
                  text="I relapsed"
                  variant="dangerOutline"
                  onPress={onPressRelapse}
                />
                <Button
                  iconL={
                    <AntDesign
                      name="exclamationcircleo"
                      size={20}
                      color={colors.foreground}
                    />
                  }
                  text="I'm thinking of relapsing"
                  variant="danger"
                  onPress={() => {}}
                />
              </View>
            </View>
          </BottomSheetView>
        </BottomSheet>
      </Portal>
    </>
  );
};
