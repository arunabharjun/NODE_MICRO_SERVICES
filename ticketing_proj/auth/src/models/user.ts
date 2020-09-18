import mongoose from 'mongoose';
import { Password } from '../services/password';

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

userSchema.pre('save', async function(done) {
	if (this.isModified('password')) {
		const hashed = await Password.toHash(this.get('password'));
		this.set('password', hashed);
	}
	done();
});

/**
 * This is how we get a User
 */

userSchema.statics.build = (attrs: UserAttrs) => {
	return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

/**
 * use can use the following build method to get a new user
 */

// const user = User.build({
// 	email: 'test@test.com',
// 	password: 'yayarya'
// });

export { User };
