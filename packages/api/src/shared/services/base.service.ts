import { BaseEntity, FindManyOptions, FindOneOptions, Repository } from 'typeorm';

export class BaseService<T, E extends T & BaseEntity> {
	public repository: Repository<E>;

	constructor(name: string, repository: Repository<E>) {
		this.repository = repository;
	}

	async get(opts?: FindManyOptions<E>) {
		return this.repository.find(opts);
	}

	async getOne(opts: FindOneOptions<E> = {}) {
		return this.repository.findOne(opts);
	}
}
