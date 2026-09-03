import { required, minLength, withMessage } from '@regle/rules';

export function useValidation() {
	const requiredField = (
		field           : string,
		requiredMessage : string = 'Поле обязательно',
		invalidMessage  : string = 'Поле должно содержать не менее 3 символов'
	) => {
		return {
			[field]:
			{
				required  : withMessage(required, requiredMessage),
				minLength : withMessage(minLength(3), invalidMessage)
			}
		};
	};

	const passwordField = (
		field           : string = 'password',
		requiredMessage : string = 'Пароль обязателен',
		invalidMessage  : string = 'Пароль должен содержать не менее 4 символов'
	) => {
		return {
			[field]: {
				required  : withMessage(required, requiredMessage),
				minLength : withMessage(minLength(4), invalidMessage)
			}
		}
	}

	return {
		passwordField,
		requiredField
	};
}
