import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';

/**
 * turning a call based fubction to promise based 
 */
const scryptAsync = promisify(scrypt);

export class Password {
	/**
     * function to hash a password
     */
	static async toHash(password: string) {
		/**
         * creating a random salt to append at the end of hashed pw
         */
		const salt = randomBytes(8).toString('hex');

		/**
         * hashing the pw
         */
		const buf = (await scryptAsync(password, salt, 64)) as Buffer;

		/**
         * return the encrypted pw
         */
		return `${buf.toString('hex')}.${salt}`;
	}

	/**
     * function to compare hashed password with user provided pw
     */
	static async compare(storedPassword: string, suppliedPassword: string) {
		/**
         * separating the hashed pw from salt from stored pw
         */
		const [
			hashedPassword,
			salt
		] = storedPassword.split('.');

		/**
         * hashing the plain supplied pw to compare with stored hashwd pw
         */
		const buf = (await scryptAsync(suppliedPassword, salt, 64)) as Buffer;

		/**
         * return the result of comparison as true or false
         */
		return buf.toString('hex') === hashedPassword;
	}
}
