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

    public Users loginUser(String username, String password) {
        Users user = usersRepository.findByUsername(username);
        if (user == null) { return null; }
        if (!user.getPassword().equals(password)) { return null; }
        return user;
    }

    public boolean ChangeProfile(String username, String name, String password) {
        Users user = usersRepository.findByUsername(username);
        if (user == null) { return false; }
        user.setName(name);
        user.setPassword(password);
        usersRepository.save(user);
        return true;
    }

    public void DeleteUser(String username) {
        usersRepository.deleteByUsername(username);
    }

}
