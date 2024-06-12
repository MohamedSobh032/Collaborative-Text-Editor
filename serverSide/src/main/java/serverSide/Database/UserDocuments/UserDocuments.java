package serverSide.Database.UserDocuments;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.AccessType;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "UserDocuments")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDocuments {

    @Id
    private ObjectId id;
    private String DocumentId;
    private String DocumentName;
    private String DocumentDescription;
    private AccessType AccessType;

    public UserDocuments(String documentId, String documentName,
                         String documentDescription, AccessType accessType) {
        DocumentId = documentId;
        DocumentName = documentName;
        DocumentDescription = documentDescription;
        AccessType = accessType;
    }
}
