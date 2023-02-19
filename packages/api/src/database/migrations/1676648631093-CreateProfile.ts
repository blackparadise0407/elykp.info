import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

export class CreateProfile1676648631093 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'profile_entity',
				columns: [
					{
						name: 'user_id',
						type: 'varchar',
						isPrimary: true,
						isUnique: true,
					},
					{
						name: 'dob',
						type: 'varchar(20)',
						default: '',
					},
					{
						name: 'phone_number',
						type: 'varchar(20)',
						default: '',
					},
					{
						name: 'country',
						type: 'varchar(50)',
						default: '',
					},
					{
						name: 'job_title',
						type: 'varchar(100)',
						default: '',
					},
				],
			}),
		);

		await queryRunner.createIndex(
			'profile_entity',
			new TableIndex({
				name: 'IDX_PROFILE_USER_ID',
				columnNames: ['user_id'],
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropIndex('profile_entity', 'IDX_PROFILE_USER_ID');
		await queryRunner.dropTable('profile_entity');
	}
}
