package serverSide.Database.Users;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/users")
@CrossOrigin
public class UsersController {

    @Autowired
    private UsersService usersService;

    @PostMapping("/Register")
    public ResponseEntity<String> Register(@RequestBody Map<String, String> body) {
        String username = body.get("username");
        try {
            if (usersService.checkUserExists(username)) {
                return new ResponseEntity<>("User with this username exists", HttpStatus.NOT_ACCEPTABLE);
            }
            String name = body.get("name");
            String password = body.get("password");
            usersService.addUser(username, name, password);
            return new ResponseEntity<>("User created", HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/Login")
    public ResponseEntity<Users> Login(@RequestBody Map<String, String> body) {
        String username = body.get("username");
        String password = body.get("password");
        try {
            Users response = usersService.loginUser(username, password);
            if (response == null) {
                return new ResponseEntity<>(null, HttpStatus.NOT_ACCEPTABLE);
            }
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/ChangeSettings")
    public ResponseEntity<String> ChangeSettings(@RequestBody Map<String, String> body) {
        String username = body.get("username");
        String password = body.get("password");
        String name = body.get("name");
        try {
            boolean response = usersService.ChangeProfile(username, name, password);
            if (response) {
                return new ResponseEntity<>("Profile updated", HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Profile not updated", HttpStatus.NOT_ACCEPTABLE);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/DeleteAccount")
    public ResponseEntity<String> DeleteAccount(@RequestBody Map<String, String> body) {
        String username = body.get("username");
        try {
            usersService.DeleteUser(username);
            return new ResponseEntity<>("User deleted", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}
