import { Domain } from 'effector';

export const loadFromStorage = (domain: Domain, storage: Storage) => {
	return domain.onCreateStore((store) => {
		const key = `${domain.shortName}/${store.shortName}`;
		const raw = storage.getItem(key);
		if (!raw) return;
		const parsed = JSON.parse(raw);
		store.setState(parsed);
	});
};

export const saveToStorage = (domain: Domain, storage: Storage) => {
	return domain.onCreateStore((store) => {
		const key = `${domain.shortName}/${store.shortName}`;
		store.watch((value) => {
			storage.setItem(key, JSON.stringify(value));
		});
	});
};
