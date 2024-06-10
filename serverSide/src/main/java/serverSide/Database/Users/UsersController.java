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

    @GetMapping("/test")
    public String test() {
        return "hello world";
    }

    @PostMapping("/Register")
    public ResponseEntity<String> Register(@RequestBody Map<String, String> body) {
        System.out.println("hello");
        String username = body.get("username");
        try {
            if (usersService.checkUserExists(username)) {
                return new ResponseEntity<>("User with this username exists", HttpStatus.OK);
            }
            String name = body.get("name");
            String password = body.get("password");
            usersService.addUser(username, name, password);
            return new ResponseEntity<>("User created", HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

}
