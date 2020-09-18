import mongoose from 'mongoose';

/**
 * before defining a mongoose modal
 * we are going to define an interface in TS
 * that describes the properties that are 
 * required to create a new User
 */

interface UserAttrs {
	email: string;
	password: string;
}

/**
 * now we ill create another interface that 
 * describes the properties that a User model has
 */

interface UserModel extends mongoose.Model<UserDoc> {
	build(attrs: UserAttrs): UserDoc;
}

/**
 * we now create an interface that describes the properties
 * that a user document has
 */

interface UserDoc extends mongoose.Document {
	email: string;
	password: string;
}

/**
 * now we define our model using mongoose
 */
const userSchema = new mongoose.Schema({
	email:
		{
			type: String,
			required: true
		},
	password:
		{
			type: String,
			required: true
		}
});

/**
 * This is how we get a User
 */
const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

userSchema.statics.build = (attrs: UserAttrs) => {
	return new User(attrs);
};

/**
 * use can use the following build method to get a new user
 */

// const user = User.build({
// 	email: 'test@test.com',
// 	password: 'yayarya'
// });

export { User };
