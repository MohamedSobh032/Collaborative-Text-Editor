package serverSide.Database.UserDocuments;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserDocumentsRepository extends MongoRepository<UserDocuments, ObjectId> {

}
