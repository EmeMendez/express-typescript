import { Router } from 'express';
import UserController from '../controllers/user.controller';
import { getUsersValidation, getUserValidation ,createUserValidation, updateUserValidation, deleteUserValidation,createUserValidationFiles } from '../validations/user.validation';
import validatorJWT from '../middlewares/validator-auth';
import validatorRole from '../middlewares/validator-role';
import { Role } from '../enums/Role';

const userController = new UserController();

const router:Router = Router();

router.get('/', [validatorJWT, validatorRole(Role.ADMIN, Role.USER), ...getUsersValidation ],userController.getUsers);

router.get('/:id', [ validatorJWT, validatorRole(Role.ADMIN, Role.USER), ...getUserValidation ], userController.getUser);

router.post('/',[ validatorJWT, validatorRole(Role.ADMIN), createUserValidationFiles  ,...createUserValidation ], userController.createUser);

router.put('/:id',[ validatorJWT, validatorRole(Role.ADMIN), ...updateUserValidation ], userController.updateUser);

router.delete('/:id',[ validatorJWT, validatorRole(Role.ADMIN), ...deleteUserValidation ], userController.deleteUser);

export default router;