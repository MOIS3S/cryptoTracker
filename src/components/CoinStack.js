import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CoinsScreen from './CoinScreen';
import CoinDetailScreen from './CoinDetailScreen';
import Colors from '../resources/colors';

const Stack = createStackNavigator();

function CoinStack() {
	return (
			<Stack.Navigator
				screenOptions={{
					headerStyle: {
						backgroundColor: Colors.blackPearl,
						shadowColor: Colors.blackPearl
					},
					headerTintColor: Colors.white
				}}
			>
			<Stack.Screen name="Coins" component={ CoinsScreen } />
			<Stack.Screen name="CoinDetail" component={ CoinDetailScreen } />
		</Stack.Navigatortgt
	);
}

export default CoinStack;
