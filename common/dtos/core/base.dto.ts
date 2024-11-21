import { Allow } from 'class-validator';
import { ActiveStatus } from '../../enum/active.enum';

export abstract class BaseDto {
	@Allow()
	id: number;

	@Allow()
	version: number;

	@Allow()
	isActive: ActiveStatus;

	@Allow()
	createdBy: number | null;

	@Allow()
	updatedBy: number | null;

	@Allow()
	createdAt: Date | null;

	@Allow()
	updatedAt: Date | null;
}