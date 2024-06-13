package serverSide.Database.UserDocuments;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "UserDocuments")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDocuments {

    @Id
    private ObjectId id;
    private ObjectId documentId;
    private String username;
    private AccessType accessType;

    public UserDocuments(ObjectId documentId, String username, AccessType accessType) {
        this.documentId = documentId;
        this.username = username;
        this.accessType = accessType;
    }

}
