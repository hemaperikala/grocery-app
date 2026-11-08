@'
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Provider } from 'react-redux';
import { store } from './src/store/store';
import { useAppDispatch, useAppSelector } from './src/store/hooks';
import { addItem, decrementItem } from './src/store/cartSlice';

type Product = { id: number; title: string; price: number };

function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.cart.items);

  const totalCount = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <ActivityIndicator style={{ flex: 1 }} />;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Cart: {totalCount} items</Text>
        <Text style={styles.headerText}>Total: {totalPrice.toFixed(2)}</Text>
      </View>
      <FlatList
        contentContainerStyle={styles.list}
        data={products}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => {
          const inCart = items.find((i) => i.id === item.id);
          return (
            <View style={styles.card}>
              <Text style={styles.title}>{item.title}</Text>
              <Text>{item.price}</Text>
              <View style={styles.row}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => dispatch(decrementItem(item.id))}
                >
                  <Text style={styles.buttonText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.qty}>{inCart ? inCart.quantity : 0}</Text>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() =>
                    dispatch(
                      addItem({ id: item.id, title: item.title, price: item.price })
                    )
                  }
                >
                  <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <Products />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    paddingTop: 50,
    paddingBottom: 10,
    paddingHorizontal: 16,
    backgroundColor: '#fc8019',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerText: { color: 'white', fontWeight: '700' },
  list: { padding: 16 },
  card: { padding: 12, marginBottom: 10, borderWidth: 1, borderColor: '#ddd', borderRadius: 8 },
  title: { fontWeight: '600', marginBottom: 4 },
  row: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  button: { backgroundColor: '#fc8019', paddingHorizontal: 14, paddingVertical: 6, borderRadius: 6 },
  buttonText: { color: 'white', fontWeight: '700', fontSize: 16 },
  qty: { marginHorizontal: 14, fontWeight: '600' },
});
'@ | Out-File -Encoding utf8 App.tsx