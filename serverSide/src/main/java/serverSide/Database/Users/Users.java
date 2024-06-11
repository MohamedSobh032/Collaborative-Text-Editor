package serverSide.Database.Users;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Users")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Users {

    @Id
    private ObjectId id;
    private String username;
    private String name;
    private String password;

    public Users(String username, String name, String password) {
        this.username = username;
        this.name = name;
        this.password = password;
    }
}
