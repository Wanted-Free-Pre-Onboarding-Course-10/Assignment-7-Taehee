import { EntityRepository, Repository } from 'typeorm';
import { User } from './users.entity';
import { SignUpDto } from '../auth/dto/sign.up.dto';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async signUp(signUpDto: SignUpDto) {
    const createdUser = this.create(signUpDto);
    try {
      const savedUser = await this.save(createdUser);
      return {
        userId: savedUser.userId,
      };
    } catch (err) {
      throw err;
    }
  }

  signIn(id: string) {
    try {
      return this.findOne({ id: id });
    } catch (err) {
      throw err;
    }
  }
}
