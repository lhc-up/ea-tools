import { isObjectLike } from 'lodash';

class StorageService {
    private storage: Storage;
    
    constructor(storage: Storage) {
        this.storage = storage;
    }

    get(itemName: string = '') {
        let item;
        try {
            item = this.storage.getItem(itemName);
        } catch(error) {
            console.log(`getItem from storage error: ${error}`);
        }
        if (item) {
            try {
                return JSON.parse(item);
            } catch(e) {
                return item;
            }
        }
        return null;
    }

    getAll() {
        return this.storage;
    }

    set(itemName: string = '', item: any) {
        try {
            if (isObjectLike(item)) {
                this.storage.setItem(itemName, JSON.stringify(item));
            } else {
                this.storage.setItem(itemName, item);
            }
        } catch(error) {
            console.error(`setItem to storage error: ${error}`);
        }
    }

    remove(itemName: string = '') {
        this.storage.removeItem(itemName);
    }
}

export const localStorageService = new StorageService(localStorage);
export const sessionStorageService = new StorageService(sessionStorage);

export default StorageService;