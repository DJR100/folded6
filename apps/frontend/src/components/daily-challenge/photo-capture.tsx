import React, { useState } from "react";
import { TouchableOpacity, Alert } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import { PhotoCaptureProps, PhotoResult } from "@folded/types";
import { Text, View } from "@/components/ui";

export function PhotoCapture({ 
  onPhotoTaken, 
  onSkip, 
  isLoading = false 
}: PhotoCaptureProps) {
  const [isProcessing, setIsProcessing] = useState(false);

  // Request permissions (reuse from profile-edit-modal.tsx)
  const requestPermissions = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
    
    if (status !== 'granted' || cameraStatus.status !== 'granted') {
      Alert.alert(
        'Permissions needed',
        'Please grant camera and photo library permissions to complete the daily challenge.'
      );
      return false;
    }
    return true;
  };

  const handleCameraPress = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    try {
      setIsProcessing(true);
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ['images'],
        allowsEditing: false, // No editing needed for daily challenge
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        const photo: PhotoResult = {
          uri: result.assets[0].uri,
          type: 'camera'
        };
        onPhotoTaken(photo);
      }
    } catch (error) {
      console.error('Error taking photo:', error);
      Alert.alert('Error', 'Failed to take photo');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleGalleryPress = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    try {
      setIsProcessing(true);
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: false, // No editing needed for daily challenge
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        const photo: PhotoResult = {
          uri: result.assets[0].uri,
          type: 'gallery'
        };
        onPhotoTaken(photo);
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error', 'Failed to pick image');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSkipPress = () => {
    Alert.alert(
      "Skip Challenge",
      "Are you sure you want to skip today's challenge? Your streak will reset at midnight.",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Skip",
          style: "destructive",
          onPress: onSkip
        }
      ]
    );
  };

  const isButtonDisabled = isLoading || isProcessing;

  return (
    <View className="flex-1 bg-black">
      {/* Top Header with Logo and Share Icon */}
      <View className="flex-row items-center justify-between px-4 pt-12 pb-4">
        <Text className="text-lg font-medium text-white">candle.</Text>
        <TouchableOpacity>
          <MaterialIcons name="share" size={24} color="white" style={{ opacity: 0.6 }} />
        </TouchableOpacity>
      </View>

      {/* Progress Bar - could show partial progress */}
      <View className="mx-4 mb-8">
        <View 
          className="h-1 rounded-full"
          style={{ backgroundColor: '#4C4C4C' }}
        >
          <View 
            className="h-full rounded-full"
            style={{ 
              backgroundColor: '#00C399',
              width: '50%' // 50% since we're halfway through
            }}
          />
        </View>
      </View>

      {/* Main Content Card */}
      <View className="flex-1 px-6">
        <View 
          className="rounded-3xl p-8 items-center justify-center relative"
          style={{
            backgroundColor: '#2DD4BF', // Teal color from your screenshot
            minHeight: 500,
          }}
        >
          {/* Tier Header */}
          <View 
            className="absolute top-6 left-6 px-4 py-2 rounded-full"
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
          >
            <Text className="text-white text-sm font-medium">
              Tier 1: Daily Reflection
            </Text>
          </View>

          {/* Share Icon - Top Right */}
          <TouchableOpacity 
            className="absolute top-6 right-6"
            disabled={isButtonDisabled}
          >
            <MaterialIcons name="share" size={24} color="white" style={{ opacity: 0.8 }} />
          </TouchableOpacity>

          {/* Main Prompt Text */}
          <View className="flex-1 justify-center items-center px-8">
            <Text 
              className="text-white text-3xl font-bold text-center leading-tight"
              style={{ lineHeight: 40 }}
            >
              Snap a photo of what{'\n'}you're doing right{'\n'}now.
            </Text>
          </View>

          {/* Bottom Action Area */}
          <View className="items-center">
            {/* Skip Option */}
            <TouchableOpacity 
              onPress={handleSkipPress}
              disabled={isButtonDisabled}
              className="mb-8"
            >
              <Text 
                className="text-white text-base font-medium"
                style={{ opacity: isButtonDisabled ? 0.5 : 0.6 }}
              >
                Skip
              </Text>
            </TouchableOpacity>

            {/* Photo Action Buttons */}
            <View className="flex-row items-center justify-center space-x-16">
              {/* Gallery Button */}
              <TouchableOpacity
                onPress={handleGalleryPress}
                disabled={isButtonDisabled}
                className="w-18 h-18 rounded-full items-center justify-center border-2"
                style={{
                  borderColor: '#00C399',
                  backgroundColor: 'transparent',
                  opacity: isButtonDisabled ? 0.5 : 1,
                }}
              >
                <MaterialIcons name="photo-library" size={32} color="#00C399" />
              </TouchableOpacity>

              {/* Camera Button */}
              <TouchableOpacity
                onPress={handleCameraPress}
                disabled={isButtonDisabled}
                className="w-18 h-18 rounded-full items-center justify-center border-2"
                style={{
                  borderColor: '#00C399',
                  backgroundColor: 'transparent',
                  opacity: isButtonDisabled ? 0.5 : 1,
                }}
              >
                <MaterialIcons name="camera-alt" size={32} color="#00C399" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      {/* Bottom spacing */}
      <View className="h-20" />

      {/* Loading overlay */}
      {isProcessing && (
        <View 
          className="absolute inset-0 bg-black items-center justify-center"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}
        >
          <Text className="text-white text-lg">Processing photo...</Text>
        </View>
      )}
    </View>
  );
} 