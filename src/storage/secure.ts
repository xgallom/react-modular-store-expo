import {applyStorageMixins, BaseStorage, CachedStorageMixin, Storage} from 'react-modular-store';
import * as SecureStore from 'expo-secure-store';

class SecureStorageImpl<T extends {} = Record<string, any>> implements BaseStorage<T> {
    async getItem<K extends keyof T>(key: K): Promise<T[K] | null> {
        const item = await SecureStore.getItemAsync(key.toString());
        return item ? JSON.parse(item) : null;
    }

    async setItem<K extends keyof T>(key: K, item: T[K]): Promise<void> {
        return SecureStore.setItemAsync(key.toString(), JSON.stringify(item));
    }

    async removeItem(key: keyof T): Promise<void> {
        return SecureStore.deleteItemAsync(key.toString());
    }
}

export const createSecureStorage = <T extends {} = Record<string, any>>(): Storage<T> =>
    applyStorageMixins([
            CachedStorageMixin(),
        ],
        new SecureStorageImpl(),
    );

