import Joi from "joi";

export const validateParams = (schema, params) => {
    console.log("step19191");
	const { error, value } = schema.validate(params, { abortEarly: false })
	if (error) {
		const invalidParams = [];
		const err = error.details.map((value) => {
			invalidParams.push(value.path[0])
			return {
				path: value.path[0],
				message: value.message,
				context: value.context
			}
		})
		return { err, invalidParams }
	}
	return { ...value }
}

export const authSchema = Joi.object({
	token: Joi.string().regex(/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_.+/=]+$/).required().messages({
		"token.regex": "invalid token"
	})
})

export const refreshTokenSchema = Joi.object({
	refreshToken: Joi.string().regex(/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_.+/=]+$/).required().messages({
		"token.regex": "invalid token"
	})
})

export const objectIdSchema = Joi.object({
	id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
})

// user validate
/*
	03-12-2023
	- register user only phone number
	- edit subscriptSchema: email, ReferralCode are not required

*/

// export const registerSchema = Joi.object({

// 	phoneNumber: Joi.string().regex(/^[25789]\d{7}$/).required().messages({ "phoneNumber.regex": "phone number is not format" }),
// })

export const loginSchema = Joi.object({
	userCode: Joi.string().regex(/^HF\d{4}$/).required(),
	password: Joi.string().min(8).max(16).required()
})

export const registerSchema = Joi.object({
	userName: Joi.string().required(),
	phoneNumber: Joi.string().required(),
	email: Joi.date(),
	password: Joi.string().email(),
	profile: Joi.string(),
	district: Joi.string(),
	province: Joi.string(),
	village: Joi.string(),
    villageCode: Joi.string()
})

export const editPasswordSchema = Joi.object({
	oldPassword: Joi.string().min(8).max(16).required(),
	newPassword: Joi.string().min(8).max(16).required(),
	confirmNewPassword: Joi.string().valid(Joi.ref('newPassword')).required().label('Confirm Password')
}).with('newPassword', 'confirmNewPassword')

export const changePasswordSchema = Joi.object({
	phoneNumber: Joi.string().regex(/^[25789]\d{7}$/).required(),
	newPassword: Joi.string().min(8).max(16).required()
})

export const ownerSchema = Joi.object({
	firstName: Joi.string().required(),
	lastName: Joi.string().required(),
	phoneNumber: Joi.string().regex(/^[25789]\d{7}$/).required(),
	email: Joi.string().email().required(),
	password: Joi.string().min(8).max(16).required(),
})

export const adminSchema = Joi.object({
	firstName: Joi.string().required(),
	lastName: Joi.string().required(),
	phoneNumber: Joi.string().regex(/^[25789]\d{7}$/).required(),
	email: Joi.string().email().required(),
	password: Joi.string().min(8).max(16).required(),
})
export const managerSchema = Joi.object({
	firstName: Joi.string().required(),
	lastName: Joi.string().required(),
	phoneNumber: Joi.string().regex(/^[25789]\d{7}$/).required(),
	email: Joi.string().email().required(),
	password: Joi.string().min(8).max(16).required(),
})
export const staffSchema = Joi.object({
	firstName: Joi.string().required(),
	lastName: Joi.string().required(),
	phoneNumber: Joi.string().regex(/^[25789]\d{7}$/).required(),
	email: Joi.string().email().required()
})

export const loginAdminSchema = Joi.object({
	userCode: Joi.string().regex(/^[AOMS].*\d{4}$/).required(),
	password: Joi.string().min(8).max(16).required()
})


// ---------------------- validate in package

export const createPackageSchema = Joi.object({
	size: Joi.string().uppercase().required(),
	fixPv: Joi.number().required(),
	price: Joi.number().required()
})

// ---------------------- validate in trip

export const createTripSchema = Joi.object({
	name: Joi.string().required(),
	details: Joi.string().required(),
	limit: Joi.number().min(0),
})

export const addMemberTripSchema = Joi.object({
	trip_id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
	user_id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
})

export const updateTripSchema = Joi.object({
	name: Joi.string(),
	details: Joi.string(),
	limit: Joi.number().min(0),
})


// ---------------------- validate in category 

export const createCategorySchema = Joi.object({
	categoryName: Joi.string().required()
})

//--------------------validate product

export const createProductSchema = Joi.object({
	categoryId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
	productName: Joi.string().required(),
	detail: Joi.string(),
	price: Joi.number().min(0).required(),
	point: Joi.number().min(0).required(),
	crashBack: Joi.number().min(0).required(),
	amount: Joi.number().min(0).required(),
	images: Joi.array().items(Joi.string()).min(1)
  });
  
//--------------------validate orderItem

  export const createOrderItemSchema = Joi.object({
	productId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
	amount: Joi.number().min(0).required(),
  });

  export const deleteOrderItemSchema = Joi.object({
	orderId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
})