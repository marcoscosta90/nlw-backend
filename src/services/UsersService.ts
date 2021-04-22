import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../repositories/UsersRepository";

class UsersService {
  async create(email: string) {
    const usersRepository = getCustomRepository(UsersRepository);
    //Verificar se usuario existe
    const userExists = await usersRepository.findOne({
      email,
    });

    //Se existir, retornar user
    if (userExists) {
      return userExists;
    }

    //Se nao existir, salvar no db
    const user = usersRepository.create({
      email,
    });

    await usersRepository.save(user);

    return user;
  }
}

export { UsersService };
