import type { Operation, SerializedOperation } from "~/types/operations"

export const serializeOperations = (operations: Operation): SerializedOperation[] =>
{
	return Object.keys(operations).map((key) =>
		{
			return {
				code       : key,
				label      : operations[key]?.frontend.label || '',
			}
		}
	)
};