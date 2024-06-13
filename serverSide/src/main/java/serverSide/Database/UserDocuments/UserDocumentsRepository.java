package serverSide.Database.UserDocuments;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface UserDocumentsRepository extends MongoRepository<UserDocuments, ObjectId> {
    List<UserDocuments> findByUsernameAndAccessType(String username, AccessType accessType);
    void deleteByUsername(String username);
    void deleteByDocumentId(ObjectId documentId);
    List<UserDocuments> findByUsername(String username);
    UserDocuments findByDocumentIdAndUsername(ObjectId documentId, String username);
    void deleteByDocumentIdAndUsername(ObjectId documentId, String username);
}
