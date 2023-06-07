import { Schema, model } from 'mongoose';
import { Role } from '../enums/Role';
import { IUser } from '../Interfaces/IUser';

const userSchema = new Schema<IUser>(
{
        name: {
            type: String,
            required: [true, 'The field name is required'],
        },
        lastname: {
            type: String,
            required: [true, 'The field lastname is required'],
        },
        email:{
            type: String,
            required: [true, 'The field email is required'],
            unique: true
        },
        password: {
            type: String,
            required: [true, 'The field password is required'],

        },
        avatar:{
            type: String,
            required: [true, 'The field avatar is required'],
        },
        role:{
            type: String,
            enum: [Role.ADMIN, Role.USER],
            required: true,
        },
        is_active:{
            alias: 'isActive',
            type: Boolean,
            required: true,
            default: true
        },
        created_in_google:{
            alias: 'createdInGoogle',
            type: Boolean,
            default: false
        },
    },
    { 
        timestamps:  
        { 
            createdAt: 'created_at' ,
            updatedAt: 'updated_at',
        } 
    }
  );

userSchema.methods.toJSON = function() {
    const { __v, password, ...user } = this.toObject();
    return user;
}

const User = model<IUser>('User', userSchema);

export default User;