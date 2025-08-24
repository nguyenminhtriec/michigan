import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <>
      <Stack screenOptions={{headerShown: false}}>
        {/* <Stack.Screen name='(tabs)' options={{headerShown: false, title: 'Dashboard'}} /> */}
        {/* <Stack.Screen name='mars' options={{ headerShown: false, title: 'Mars'}} />  */}
        {/*<Stack.Screen name='books' options={{headerShown: false, title: 'Books'}} />        */}
      </Stack>
      <StatusBar style='light' />
    </>    
  );
}
