package serverSide.Database.Users;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UsersService {

    @Autowired
    private UsersRepository usersRepository;

    public boolean checkUserExists(String username) {
        return usersRepository.existsByUsername(username);
    }

    public void addUser(String username, String name, String password) {
        Users user = new Users(username, name, password);
        usersRepository.save(user);
    }

}
